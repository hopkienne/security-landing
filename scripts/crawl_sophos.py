from __future__ import annotations

import csv
import json
import re
import time
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from urllib.parse import urldefrag, urljoin, urlparse
from xml.etree import ElementTree

import requests
from bs4 import BeautifulSoup


BASE = "https://www.sophos.com"
LOCALE = "en-gb"
USER_AGENT = "Mozilla/5.0 Codex crawler for research (+https://openai.com)"
OUT_DIR = Path("data/sophos_crawl")
MAX_SECTION_ITEMS = 12
REQUEST_DELAY_SECONDS = 0.25

SEED_URLS = [
    f"{BASE}/{LOCALE}",
    f"{BASE}/{LOCALE}/products",
    f"{BASE}/{LOCALE}/solutions",
    f"{BASE}/{LOCALE}/sitemap.xml",
    f"{BASE}/llms.txt",
]

ALLOWED_PATH_PREFIXES = (
    f"/{LOCALE}/products",
    f"/{LOCALE}/services",
    f"/{LOCALE}/solutions",
    f"/{LOCALE}/public-cloud",
)

EXCLUDED_PATH_PARTS = (
    "/contact-request",
    "/free-trial",
    "/demo",
    "/get-pricing",
)

PRODUCT_CATEGORY_PATHS = {
    f"/{LOCALE}/products/advisory-services",
    f"/{LOCALE}/products/cloud-native-security",
    f"/{LOCALE}/products/endpoint",
    f"/{LOCALE}/products/managed-security-services",
    f"/{LOCALE}/products/network",
    f"/{LOCALE}/products/workspace-protection",
}


@dataclass(frozen=True)
class LinkRecord:
    url: str
    text: str
    source_url: str


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value).strip()


def normalize_url(raw_url: str, source_url: str = BASE) -> str:
    absolute = urljoin(source_url, raw_url)
    absolute, _fragment = urldefrag(absolute)
    parsed = urlparse(absolute)
    if parsed.scheme not in {"http", "https"}:
        return ""
    if parsed.netloc != "www.sophos.com":
        return ""
    path = parsed.path.rstrip("/") or "/"
    return parsed._replace(path=path, query="").geturl()


def is_relevant_url(url: str) -> bool:
    path = urlparse(url).path
    if not path.startswith(ALLOWED_PATH_PREFIXES):
        return False
    if any(part in path for part in EXCLUDED_PATH_PARTS):
        return False
    return True


def classify_url(url: str) -> str:
    path = urlparse(url).path.rstrip("/")
    if path == f"/{LOCALE}":
        return "site_overview"
    if path == f"/{LOCALE}/products":
        return "products_overview"
    if path == f"/{LOCALE}/solutions":
        return "solutions_overview"
    if path == f"/{LOCALE}/public-cloud":
        return "solution"
    if path.startswith(f"/{LOCALE}/solutions/"):
        if "/industries/" in path:
            return "solution_industry"
        if "/compliance/" in path:
            return "solution_compliance"
        if "/use-cases/" in path:
            return "solution_use_case"
        return "solution"
    if path.startswith(f"/{LOCALE}/services/"):
        return "service"
    if path.startswith(f"/{LOCALE}/products/"):
        if path in PRODUCT_CATEGORY_PATHS:
            return "product_category"
        return "product"
    return "other"


def get_session() -> requests.Session:
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7",
            "Accept-Language": "en-GB,en;q=0.9",
        }
    )
    return session


def fetch(session: requests.Session, url: str) -> tuple[int, str, str]:
    response = session.get(url, timeout=30)
    response.raise_for_status()
    content_type = response.headers.get("content-type", "")
    return response.status_code, content_type, response.text


def discover_from_html(html: str, source_url: str) -> list[LinkRecord]:
    soup = BeautifulSoup(html, "html.parser")
    records: list[LinkRecord] = []
    for anchor in soup.find_all("a", href=True):
        url = normalize_url(anchor["href"], source_url)
        if not url or not is_relevant_url(url):
            continue
        records.append(LinkRecord(url=url, text=clean_text(anchor.get_text(" ", strip=True)), source_url=source_url))
    return records


def discover_from_sitemap(xml_text: str, source_url: str) -> list[LinkRecord]:
    records: list[LinkRecord] = []
    root = ElementTree.fromstring(xml_text)
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for loc in root.findall("s:url/s:loc", namespace):
        if loc.text:
            url = normalize_url(loc.text, source_url)
            if url and is_relevant_url(url):
                records.append(LinkRecord(url=url, text="", source_url=source_url))
    return records


def discover_from_llms(text: str, source_url: str) -> list[LinkRecord]:
    records: list[LinkRecord] = []
    for label, href in re.findall(r"\[([^\]]+)\]\((https://www\.sophos\.com/[^)]+)\)", text):
        url = normalize_url(href.replace("/en-us/", f"/{LOCALE}/"), source_url)
        if url and is_relevant_url(url):
            records.append(LinkRecord(url=url, text=clean_text(label), source_url=source_url))
    return records


def unique_links(records: Iterable[LinkRecord]) -> list[LinkRecord]:
    by_url: dict[str, LinkRecord] = {}
    for record in records:
        if record.url not in by_url:
            by_url[record.url] = record
        elif not by_url[record.url].text and record.text:
            by_url[record.url] = record
    return sorted(by_url.values(), key=lambda item: item.url)


def extract_meta(soup: BeautifulSoup, name: str) -> str:
    node = soup.find("meta", attrs={"name": name}) or soup.find("meta", attrs={"property": name})
    return clean_text(node.get("content")) if node else ""


def extract_sections(soup: BeautifulSoup) -> list[dict[str, object]]:
    main = soup.find("main") or soup.body or soup
    sections: list[dict[str, object]] = []
    current: dict[str, object] | None = None

    for node in main.find_all(["h1", "h2", "h3", "p", "li"], recursive=True):
        if node.find_parent(["nav", "header", "footer", "script", "style"]):
            continue
        text = clean_text(node.get_text(" ", strip=True))
        if not text or len(text) < 3:
            continue
        if node.name in {"h1", "h2", "h3"}:
            current = {"level": node.name, "heading": text, "items": []}
            sections.append(current)
        elif current and len(current["items"]) < MAX_SECTION_ITEMS:
            items = current["items"]
            if text not in items:
                items.append(text)

    return [section for section in sections if section["heading"] or section["items"]]


def extract_page(html: str, url: str, status_code: int) -> dict[str, object]:
    soup = BeautifulSoup(html, "html.parser")
    canonical = ""
    canonical_node = soup.find("link", rel="canonical")
    if canonical_node and canonical_node.get("href"):
        canonical = normalize_url(canonical_node["href"], url) or clean_text(canonical_node["href"])

    headings = []
    for level in ["h1", "h2", "h3"]:
        for node in soup.find_all(level):
            text = clean_text(node.get_text(" ", strip=True))
            if text:
                headings.append({"level": level, "text": text})

    ctas = []
    for anchor in soup.find_all("a", href=True):
        if anchor.find_parent(["nav", "header", "footer"]):
            continue
        text = clean_text(anchor.get_text(" ", strip=True))
        if not text:
            continue
        cls = " ".join(anchor.get("class", []))
        parent_cls = " ".join(anchor.parent.get("class", [])) if anchor.parent else ""
        href = normalize_url(anchor["href"], url) or urljoin(url, anchor["href"])
        if "btn" in cls or "btn" in parent_cls or text.lower() in {"learn more", "get started", "contact us", "start demo"}:
            ctas.append({"text": text, "url": href})

    related_links = []
    for record in unique_links(discover_from_html(html, url)):
        if record.url != url:
            related_links.append({"text": record.text, "url": record.url, "kind": classify_url(record.url)})

    images = []
    for image in soup.find_all("img"):
        src = image.get("src")
        if not src:
            continue
        images.append({"alt": clean_text(image.get("alt")), "src": urljoin(url, src)})

    sections = extract_sections(soup)
    body_points = []
    for section in sections:
        if section["items"]:
            body_points.extend(section["items"])
        if len(body_points) >= 20:
            break

    return {
        "url": url,
        "kind": classify_url(url),
        "status_code": status_code,
        "canonical": canonical,
        "title": clean_text(soup.title.get_text(" ", strip=True)) if soup.title else "",
        "meta_description": extract_meta(soup, "description") or extract_meta(soup, "og:description"),
        "keywords": extract_meta(soup, "keywords"),
        "h1": next((item["text"] for item in headings if item["level"] == "h1"), ""),
        "headings": headings,
        "sections": sections[:25],
        "body_points": body_points[:20],
        "ctas": ctas[:20],
        "related_links": related_links[:40],
        "images": images[:20],
    }


def page_name(page: dict[str, object]) -> str:
    return str(page.get("h1") or page.get("title") or page.get("url") or "").strip()


def compact_page(page: dict[str, object]) -> dict[str, object]:
    return {
        "name": page_name(page),
        "url": page.get("url", ""),
        "canonical": page.get("canonical", ""),
        "description": page.get("meta_description", ""),
        "keywords": page.get("keywords", ""),
        "key_points": page.get("body_points", [])[:10],
        "sections": page.get("sections", [])[:12],
        "ctas": page.get("ctas", [])[:10],
        "related_links": page.get("related_links", [])[:20],
    }


def build_catalog(pages: list[dict[str, object]], fetched_at: str) -> dict[str, object]:
    products = []
    product_categories = []
    services = []
    solutions = []

    for page in pages:
        kind = page.get("kind")
        if kind == "product":
            products.append(compact_page(page))
        elif kind == "product_category":
            product_categories.append(compact_page(page))
        elif kind == "service":
            services.append(compact_page(page))
        elif kind in {"solution", "solution_use_case", "solution_industry", "solution_compliance"}:
            solution = compact_page(page)
            solution["solution_type"] = str(kind).replace("solution_", "")
            solutions.append(solution)

    return {
        "source": "https://www.sophos.com/en-gb",
        "fetched_at": fetched_at,
        "description": "Structured Sophos product, service, and solution catalog extracted from public en-gb pages.",
        "counts": {
            "product_categories": len(product_categories),
            "products": len(products),
            "services": len(services),
            "solutions": len(solutions),
            "total_items": len(product_categories) + len(products) + len(services) + len(solutions),
        },
        "product_categories": sorted(product_categories, key=lambda item: str(item["name"])),
        "products": sorted(products, key=lambda item: str(item["name"])),
        "services": sorted(services, key=lambda item: str(item["name"])),
        "solutions": sorted(solutions, key=lambda item: (str(item["solution_type"]), str(item["name"]))),
    }


def write_outputs(pages: list[dict[str, object]], discovered: list[LinkRecord]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    fetched_at = datetime.now(timezone.utc).isoformat()
    payload = {
        "source": "https://www.sophos.com/en-gb",
        "fetched_at": fetched_at,
        "crawl_scope": "Public Sophos en-gb product, service, and solution pages discovered from homepage, products, solutions, sitemap, and llms.txt.",
        "page_count": len(pages),
        "discovered_urls": [
            {"url": item.url, "text": item.text, "source_url": item.source_url, "kind": classify_url(item.url)}
            for item in discovered
        ],
        "pages": pages,
    }
    (OUT_DIR / "sophos_crawl.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT_DIR / "sophos_catalog.json").write_text(
        json.dumps(build_catalog(pages, fetched_at), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    with (OUT_DIR / "sophos_index.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["kind", "title", "h1", "meta_description", "url", "canonical", "status_code"],
        )
        writer.writeheader()
        for page in pages:
            writer.writerow({field: page.get(field, "") for field in writer.fieldnames})

    groups: dict[str, list[dict[str, object]]] = defaultdict(list)
    for page in pages:
        groups[str(page["kind"])].append(page)

    markdown: list[str] = [
        "# Sophos product and solution crawl",
        "",
        f"- Source: https://www.sophos.com/en-gb",
        f"- Fetched at: {fetched_at}",
        f"- Pages crawled: {len(pages)}",
        "",
    ]
    group_order = [
        "site_overview",
        "products_overview",
        "product_category",
        "product",
        "service",
        "solutions_overview",
        "solution",
        "solution_use_case",
        "solution_industry",
        "solution_compliance",
        "other",
    ]
    for group in group_order:
        if group not in groups:
            continue
        markdown.extend([f"## {group.replace('_', ' ').title()}", ""])
        for page in sorted(groups[group], key=lambda item: str(item.get("h1") or item.get("title") or item.get("url"))):
            title = page.get("h1") or page.get("title") or page["url"]
            markdown.append(f"### {title}")
            markdown.append(f"- URL: {page['url']}")
            if page.get("meta_description"):
                markdown.append(f"- Description: {page['meta_description']}")
            if page.get("keywords"):
                markdown.append(f"- Keywords: {page['keywords']}")
            points = [point for point in page.get("body_points", []) if len(point) > 20][:6]
            if points:
                markdown.append("- Key points:")
                for point in points:
                    markdown.append(f"  - {point}")
            ctas = page.get("ctas", [])[:5]
            if ctas:
                markdown.append("- CTAs:")
                for cta in ctas:
                    markdown.append(f"  - {cta['text']}: {cta['url']}")
            markdown.append("")

    (OUT_DIR / "sophos_summary.md").write_text("\n".join(markdown), encoding="utf-8")


def main() -> None:
    session = get_session()
    discovered: list[LinkRecord] = []

    for seed_url in SEED_URLS:
        status_code, content_type, text = fetch(session, seed_url)
        if seed_url.endswith(".xml"):
            discovered.extend(discover_from_sitemap(text, seed_url))
        elif seed_url.endswith(".txt"):
            discovered.extend(discover_from_llms(text, seed_url))
        else:
            discovered.append(LinkRecord(url=normalize_url(seed_url), text="", source_url=seed_url))
            discovered.extend(discover_from_html(text, seed_url))
        print(f"discovered from {seed_url}: status={status_code} content_type={content_type}")
        time.sleep(REQUEST_DELAY_SECONDS)

    discovered = unique_links(discovered)
    pages: list[dict[str, object]] = []
    for index, record in enumerate(discovered, start=1):
        try:
            status_code, content_type, html = fetch(session, record.url)
            if "text/html" not in content_type:
                print(f"skip non-html {record.url} ({content_type})")
                continue
            page = extract_page(html, record.url, status_code)
            pages.append(page)
            print(f"[{index:03d}/{len(discovered):03d}] {status_code} {page['kind']}: {record.url}")
        except Exception as exc:
            pages.append(
                {
                    "url": record.url,
                    "kind": classify_url(record.url),
                    "status_code": 0,
                    "error": str(exc),
                }
            )
            print(f"[{index:03d}/{len(discovered):03d}] ERROR {record.url}: {exc}")
        time.sleep(REQUEST_DELAY_SECONDS)

    pages = sorted(pages, key=lambda item: (str(item.get("kind", "")), str(item.get("url", ""))))
    write_outputs(pages, discovered)
    print(f"wrote {len(pages)} pages to {OUT_DIR}")


if __name__ == "__main__":
    main()
