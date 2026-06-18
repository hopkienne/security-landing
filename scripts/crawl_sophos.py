from __future__ import annotations

import csv
import json
import re
import shutil
import subprocess
import time
from collections import defaultdict, deque
from dataclasses import dataclass
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Callable, Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urldefrag, urljoin, urlparse
from urllib.request import Request, urlopen
from xml.etree import ElementTree


BASE = "https://www.sophos.com"
LOCALE = "en-gb"
USER_AGENT = "Mozilla/5.0 Codex crawler for research (+https://openai.com)"
OUT_DIR = Path("data/sophos_crawl")
MAX_SECTION_ITEMS = 16
MAX_TEXT_ITEM_CHARS = 360
MAX_RELATED_LINKS = 80
MAX_DISCOVERY_URLS = 600
REQUEST_DELAY_SECONDS = 0.2
CURL_META_MARKER = "__CURL_META__"
CURL_EXECUTABLE = shutil.which("curl.exe") or shutil.which("curl")

SEED_URLS = [
    f"{BASE}/{LOCALE}",
    f"{BASE}/{LOCALE}/products",
    f"{BASE}/{LOCALE}/services",
    f"{BASE}/{LOCALE}/solutions",
    f"{BASE}/{LOCALE}/sitemap.xml",
    f"{BASE}/sitemap.xml",
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
    "/contact-us",
    "/free-trial",
    "/demo",
    "/online-demo",
    "/get-pricing",
    "/how-to-buy",
    "-contact",
    "/partners/",
)

PRODUCT_CATEGORY_PATHS = {
    f"/{LOCALE}/products/advisory-services",
    f"/{LOCALE}/products/cloud-native-security",
    f"/{LOCALE}/products/endpoint",
    f"/{LOCALE}/products/managed-security-services",
    f"/{LOCALE}/products/network",
    f"/{LOCALE}/products/workspace-protection",
}

SOLUTION_GROUP_KINDS = {
    "use-cases": "solution_use_case",
    "industries": "solution_industry",
    "compliance": "solution_compliance",
}

SKIP_TEXT_PARENTS = {"nav", "header", "footer", "script", "style", "noscript", "svg"}
TEXT_TAGS = {"h1", "h2", "h3", "h4", "p", "li"}


@dataclass(frozen=True)
class LinkRecord:
    url: str
    text: str
    source_url: str


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value).strip()


def short_text(value: str | None, max_chars: int = MAX_TEXT_ITEM_CHARS) -> str:
    text = clean_text(value)
    if len(text) <= max_chars:
        return text
    return text[: max_chars - 1].rstrip() + "..."


def normalize_url(raw_url: str, source_url: str = BASE) -> str:
    absolute = urljoin(source_url, raw_url)
    absolute, _fragment = urldefrag(absolute)
    parsed = urlparse(absolute)
    if parsed.scheme not in {"http", "https"}:
        return ""
    if parsed.netloc != "www.sophos.com":
        return ""

    path = parsed.path.rstrip("/") or "/"
    if path.startswith("/en-us/"):
        path = f"/{LOCALE}/" + path[len("/en-us/") :]
    elif path == "/en-us":
        path = f"/{LOCALE}"

    return parsed._replace(path=path, query="").geturl()


def is_relevant_url(url: str) -> bool:
    path = urlparse(url).path
    if not path.startswith(ALLOWED_PATH_PREFIXES):
        return False
    if any(part in path for part in EXCLUDED_PATH_PARTS):
        return False
    return True


def describe_url(url: str) -> dict[str, object]:
    path = urlparse(url).path.rstrip("/") or "/"
    parts = [part for part in path.split("/") if part]
    kind = "other"
    crawl_role = "other"
    path_group = ""
    leaf_slug = parts[-1] if parts else ""

    if parts == [LOCALE]:
        kind = "site_overview"
        crawl_role = "overview"
        path_group = "site"
    elif len(parts) >= 2 and parts[0] == LOCALE:
        area = parts[1]
        rest = parts[2:]

        if area == "products":
            path_group = "products" if not rest else f"products/{rest[0]}"
            if not rest:
                kind = "products_overview"
                crawl_role = "overview"
            elif path in PRODUCT_CATEGORY_PATHS:
                kind = "product_category"
                crawl_role = "group"
            else:
                kind = "product"
                crawl_role = "detail"

        elif area == "services":
            path_group = "services"
            if not rest:
                kind = "services_overview"
                crawl_role = "overview"
            else:
                kind = "service"
                crawl_role = "detail"

        elif area == "solutions":
            if not rest:
                kind = "solutions_overview"
                crawl_role = "overview"
                path_group = "solutions"
            elif rest[0] in SOLUTION_GROUP_KINDS:
                path_group = f"solutions/{rest[0]}"
                if len(rest) == 1:
                    kind = "solution_group"
                    crawl_role = "group"
                else:
                    kind = SOLUTION_GROUP_KINDS[rest[0]]
                    crawl_role = "detail"
            else:
                kind = "solution"
                crawl_role = "detail"
                path_group = "solutions"

    if path == f"/{LOCALE}/public-cloud":
        kind = "solution"
        crawl_role = "detail"
        path_group = "solutions"
        leaf_slug = "public-cloud"

    return {
        "kind": kind,
        "crawl_role": crawl_role,
        "path_group": path_group,
        "path_depth": max(len(parts) - 1, 0),
        "leaf_slug": leaf_slug,
    }


def classify_url(url: str) -> str:
    return str(describe_url(url)["kind"])


def parse_curl_output(stdout: bytes) -> tuple[int, str, str]:
    decoded = stdout.decode("utf-8", errors="replace")
    if CURL_META_MARKER not in decoded:
        raise RuntimeError("curl response did not include metadata marker")
    body, meta = decoded.rsplit(CURL_META_MARKER, 1)
    meta = meta.strip()
    status_text, content_type = (meta.split("\t", 1) + [""])[:2]
    return int(status_text), clean_text(content_type), body.rstrip("\r\n")


def fetch_with_curl(url: str) -> tuple[int, str, str]:
    if not CURL_EXECUTABLE:
        raise RuntimeError("curl executable is not available")
    command = [
        CURL_EXECUTABLE,
        "-L",
        "-sS",
        "--max-time",
        "35",
        "-A",
        USER_AGENT,
        "-H",
        "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7",
        "-H",
        "Accept-Language: en-GB,en;q=0.9",
        "-w",
        f"\n{CURL_META_MARKER}%{{http_code}}\t%{{content_type}}",
        url,
    ]
    result = subprocess.run(command, capture_output=True, check=False)
    if result.returncode != 0:
        message = result.stderr.decode("utf-8", errors="replace").strip()
        raise RuntimeError(f"curl failed for {url}: {message or result.returncode}")
    status_code, content_type, text = parse_curl_output(result.stdout)
    if status_code >= 400:
        raise HTTPError(url, status_code, f"HTTP {status_code}", hdrs=None, fp=None)
    return status_code, content_type, text


def fetch_with_urllib(url: str) -> tuple[int, str, str]:
    request = Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7",
            "Accept-Language": "en-GB,en;q=0.9",
        },
    )
    with urlopen(request, timeout=35) as response:
        content_type = response.headers.get("content-type", "")
        charset = response.headers.get_content_charset() or "utf-8"
        raw = response.read()
        return response.status, content_type, raw.decode(charset, errors="replace")


def fetch(url: str) -> tuple[int, str, str]:
    if CURL_EXECUTABLE:
        return fetch_with_curl(url)
    return fetch_with_urllib(url)


def fetch_text(url: str) -> str:
    _status, _content_type, text = fetch(url)
    return text


class SophosHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tag_stack: list[str] = []
        self.text_stack: list[dict[str, object]] = []
        self.anchor_stack: list[dict[str, object]] = []
        self.title_buffer: list[str] = []
        self.in_title = False
        self.anchors: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.meta: dict[str, str] = {}
        self.canonical = ""
        self.content_nodes: list[dict[str, str]] = []

    def handle_starttag(self, tag: str, attrs_list: list[tuple[str, str | None]]) -> None:
        attrs = {key.lower(): value or "" for key, value in attrs_list}
        tag = tag.lower()
        self.tag_stack.append(tag)

        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            key = attrs.get("name") or attrs.get("property")
            content = clean_text(attrs.get("content"))
            if key and content:
                self.meta[key.lower()] = content
        elif tag == "link":
            rel = attrs.get("rel", "").lower()
            if "canonical" in rel and attrs.get("href"):
                self.canonical = attrs["href"]
        elif tag == "img" and attrs.get("src"):
            self.images.append({"alt": clean_text(attrs.get("alt")), "src": attrs["src"]})
        elif tag == "a" and attrs.get("href"):
            self.anchor_stack.append({"href": attrs["href"], "buffer": []})

        if tag in TEXT_TAGS and not self._inside_skip_parent():
            self.text_stack.append({"tag": tag, "buffer": []})

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()

        if tag == "title":
            self.in_title = False

        if tag == "a" and self.anchor_stack:
            anchor = self.anchor_stack.pop()
            text = clean_text(" ".join(anchor["buffer"]))  # type: ignore[arg-type]
            self.anchors.append({"href": str(anchor["href"]), "text": text})

        if self.text_stack and self.text_stack[-1]["tag"] == tag:
            node = self.text_stack.pop()
            text = short_text(" ".join(node["buffer"]))  # type: ignore[arg-type]
            if text and len(text) >= 3:
                self.content_nodes.append({"tag": str(node["tag"]), "text": text})

        for index in range(len(self.tag_stack) - 1, -1, -1):
            if self.tag_stack[index] == tag:
                del self.tag_stack[index:]
                break

    def handle_data(self, data: str) -> None:
        if not data or self._inside_skip_parent():
            return
        text = clean_text(data)
        if not text:
            return

        if self.in_title:
            self.title_buffer.append(text)

        for anchor in self.anchor_stack:
            anchor["buffer"].append(text)  # type: ignore[union-attr]

        if self.text_stack:
            self.text_stack[-1]["buffer"].append(text)  # type: ignore[union-attr]

    def _inside_skip_parent(self) -> bool:
        return any(tag in SKIP_TEXT_PARENTS for tag in self.tag_stack)

    @property
    def title(self) -> str:
        return clean_text(" ".join(self.title_buffer))


def parse_html(html: str) -> SophosHTMLParser:
    parser = SophosHTMLParser()
    parser.feed(html)
    parser.close()
    return parser


def discover_from_html(html: str, source_url: str) -> list[LinkRecord]:
    parser = parse_html(html)
    records: list[LinkRecord] = []
    for anchor in parser.anchors:
        url = normalize_url(anchor["href"], source_url)
        if not url or not is_relevant_url(url):
            continue
        records.append(LinkRecord(url=url, text=clean_text(anchor["text"]), source_url=source_url))
    return records


def _xml_children(root: ElementTree.Element, name: str) -> list[ElementTree.Element]:
    return [node for node in root.iter() if node.tag.split("}")[-1] == name]


def discover_from_sitemap(
    xml_text: str,
    source_url: str,
    fetch_sitemap: Callable[[str], str] | None = None,
    seen_sitemaps: set[str] | None = None,
) -> list[LinkRecord]:
    records: list[LinkRecord] = []
    seen_sitemaps = seen_sitemaps or set()
    if source_url in seen_sitemaps:
        return records
    seen_sitemaps.add(source_url)

    root = ElementTree.fromstring(xml_text)
    root_name = root.tag.split("}")[-1]

    if root_name == "sitemapindex":
        if not fetch_sitemap:
            return records
        for loc in _xml_children(root, "loc"):
            if not loc.text:
                continue
            sitemap_url = normalize_url(loc.text, source_url)
            if not sitemap_url or sitemap_url in seen_sitemaps:
                continue
            try:
                child_text = fetch_sitemap(sitemap_url)
            except (HTTPError, URLError, TimeoutError, OSError, ElementTree.ParseError):
                continue
            records.extend(discover_from_sitemap(child_text, sitemap_url, fetch_sitemap, seen_sitemaps))
        return unique_links(records)

    for loc in _xml_children(root, "loc"):
        if not loc.text:
            continue
        url = normalize_url(loc.text, source_url)
        if url and is_relevant_url(url):
            records.append(LinkRecord(url=url, text="", source_url=source_url))
    return unique_links(records)


def discover_from_llms(text: str, source_url: str) -> list[LinkRecord]:
    records: list[LinkRecord] = []
    for label, href in re.findall(r"\[([^\]]+)\]\((https://www\.sophos\.com/[^)]+)\)", text):
        url = normalize_url(href, source_url)
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


def extract_meta(parser: SophosHTMLParser, name: str) -> str:
    return parser.meta.get(name.lower(), "")


def extract_sections(parser: SophosHTMLParser) -> list[dict[str, object]]:
    sections: list[dict[str, object]] = []
    current: dict[str, object] | None = None

    for node in parser.content_nodes:
        tag = node["tag"]
        text = short_text(node["text"])
        if not text:
            continue
        if tag in {"h1", "h2", "h3", "h4"}:
            current = {"level": tag, "heading": text, "items": []}
            sections.append(current)
        elif current and len(current["items"]) < MAX_SECTION_ITEMS:
            items = current["items"]
            if text not in items:
                items.append(text)

    return [section for section in sections if section["heading"] or section["items"]]


def extract_page(html: str, url: str, status_code: int) -> dict[str, object]:
    parser = parse_html(html)
    canonical = normalize_url(parser.canonical, url) if parser.canonical else ""

    headings = [
        {"level": node["tag"], "text": node["text"]}
        for node in parser.content_nodes
        if node["tag"] in {"h1", "h2", "h3", "h4"}
    ]

    ctas = []
    for anchor in parser.anchors:
        text = clean_text(anchor["text"])
        if not text:
            continue
        href = normalize_url(anchor["href"], url) or urljoin(url, anchor["href"])
        lowered = text.lower()
        if lowered in {
            "learn more",
            "get started",
            "contact us",
            "start demo",
            "speak with an expert",
            "get pricing",
            "free trial",
            "try for free",
            "download",
        } or any(word in lowered for word in ("download", "demo", "pricing", "contact", "trial", "expert")):
            ctas.append({"text": short_text(text, 140), "url": href})

    related_links = []
    for record in unique_links(discover_from_html(html, url)):
        if record.url == url:
            continue
        description = describe_url(record.url)
        related_links.append(
            {
                "text": short_text(record.text, 160),
                "url": record.url,
                "kind": description["kind"],
                "crawl_role": description["crawl_role"],
                "path_group": description["path_group"],
            }
        )

    images = []
    for image in parser.images:
        src = image.get("src")
        if not src:
            continue
        images.append({"alt": short_text(image.get("alt"), 160), "src": urljoin(url, src)})

    sections = extract_sections(parser)
    body_points = []
    for section in sections:
        for item in section.get("items", []):
            if isinstance(item, str):
                body_points.append(item)
            if len(body_points) >= 30:
                break
        if len(body_points) >= 30:
            break

    description = describe_url(url)
    canonical_duplicate_of = canonical if canonical and canonical != url and is_relevant_url(canonical) else ""
    return {
        "url": url,
        **description,
        "status_code": status_code,
        "canonical": canonical,
        "canonical_duplicate_of": canonical_duplicate_of,
        "is_canonical_url": not canonical_duplicate_of,
        "title": parser.title,
        "meta_description": extract_meta(parser, "description") or extract_meta(parser, "og:description"),
        "keywords": extract_meta(parser, "keywords"),
        "h1": next((item["text"] for item in headings if item["level"] == "h1"), ""),
        "headings": headings[:80],
        "sections": sections[:35],
        "body_points": body_points[:30],
        "ctas": ctas[:30],
        "related_links": related_links[:MAX_RELATED_LINKS],
        "images": images[:25],
    }


def page_name(page: dict[str, object]) -> str:
    return str(page.get("h1") or page.get("title") or page.get("url") or "").strip()


def compact_page(page: dict[str, object]) -> dict[str, object]:
    return {
        "name": page_name(page),
        "url": page.get("url", ""),
        "canonical": page.get("canonical", ""),
        "kind": page.get("kind", ""),
        "crawl_role": page.get("crawl_role", ""),
        "path_group": page.get("path_group", ""),
        "description": page.get("meta_description", ""),
        "keywords": page.get("keywords", ""),
        "key_points": page.get("body_points", [])[:14],
        "sections": page.get("sections", [])[:18],
        "ctas": page.get("ctas", [])[:12],
        "related_links": page.get("related_links", [])[:28],
    }


def canonical_record_from_page(page: dict[str, object]) -> LinkRecord | None:
    url = str(page.get("url") or "")
    canonical = str(page.get("canonical") or "")
    if not url or not canonical or canonical == url or not is_relevant_url(canonical):
        return None
    return LinkRecord(url=canonical, text="canonical", source_url=url)


def build_catalog(pages: list[dict[str, object]], fetched_at: str) -> dict[str, object]:
    products = []
    product_categories = []
    services = []
    solution_groups = []
    solutions = []

    page_urls = {str(page.get("url") or "") for page in pages}
    for page in pages:
        duplicate_of = str(page.get("canonical_duplicate_of") or "")
        if duplicate_of and duplicate_of in page_urls:
            continue
        kind = page.get("kind")
        if page.get("crawl_role") == "other":
            continue
        if kind == "product":
            products.append(compact_page(page))
        elif kind == "product_category":
            product_categories.append(compact_page(page))
        elif kind == "service":
            services.append(compact_page(page))
        elif kind == "solution_group":
            solution_groups.append(compact_page(page))
        elif kind in {"solution", "solution_use_case", "solution_industry", "solution_compliance"}:
            solution = compact_page(page)
            solution["solution_type"] = str(kind).replace("solution_", "") if kind != "solution" else "general"
            solutions.append(solution)

    return {
        "source": "https://www.sophos.com/en-gb",
        "fetched_at": fetched_at,
        "description": (
            "Structured Sophos product, service, and solution research catalog extracted from public en-gb pages. "
            "Use as source research only; write original public copy."
        ),
        "counts": {
            "product_categories": len(product_categories),
            "products": len(products),
            "services": len(services),
            "solution_groups": len(solution_groups),
            "solutions": len(solutions),
            "total_items": len(product_categories) + len(products) + len(services) + len(solution_groups) + len(solutions),
        },
        "product_categories": sorted(product_categories, key=lambda item: str(item["name"])),
        "products": sorted(products, key=lambda item: str(item["name"])),
        "services": sorted(services, key=lambda item: str(item["name"])),
        "solution_groups": sorted(solution_groups, key=lambda item: str(item["path_group"])),
        "solutions": sorted(solutions, key=lambda item: (str(item["solution_type"]), str(item["name"]))),
    }


def service_solution_pages(pages: Iterable[dict[str, object]]) -> list[dict[str, object]]:
    return [
        page
        for page in pages
        if str(page.get("path_group", "")).startswith("services")
        or str(page.get("path_group", "")).startswith("solutions")
    ]


def build_path_map(pages: list[dict[str, object]]) -> dict[str, object]:
    groups: dict[str, list[dict[str, object]]] = defaultdict(list)
    for page in service_solution_pages(pages):
        groups[str(page.get("path_group") or "ungrouped")].append(page)

    output = []
    for group, group_pages in sorted(groups.items()):
        details = [page for page in group_pages if page.get("crawl_role") == "detail"]
        output.append(
            {
                "path_group": group,
                "total_pages": len(group_pages),
                "detail_pages": len(details),
                "pages": [
                    {
                        "role": page.get("crawl_role", ""),
                        "kind": page.get("kind", ""),
                        "name": page_name(page),
                        "url": page.get("url", ""),
                        "canonical_duplicate_of": page.get("canonical_duplicate_of", ""),
                    }
                    for page in sorted(group_pages, key=lambda item: (str(item.get("crawl_role")), str(item.get("url"))))
                ],
            }
        )

    return {
        "description": "Path groups under /services and /solutions. Detail pages are the preferred pages for content research.",
        "groups": output,
    }


def write_path_map_csv(path_map: dict[str, object]) -> None:
    with (OUT_DIR / "sophos_path_map.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["path_group", "role", "kind", "name", "url", "canonical_duplicate_of"],
        )
        writer.writeheader()
        for group in path_map["groups"]:  # type: ignore[index]
            for page in group["pages"]:  # type: ignore[index]
                writer.writerow(
                    {
                        "path_group": group["path_group"],
                        "role": page["role"],
                        "kind": page["kind"],
                        "name": page["name"],
                        "url": page["url"],
                        "canonical_duplicate_of": page.get("canonical_duplicate_of", ""),
                    }
                )


def write_path_map_markdown(path_map: dict[str, object]) -> None:
    markdown = [
        "# Sophos services and solutions path map",
        "",
        "Detail pages are the main crawl targets. Group pages are taxonomy or overview pages.",
        "",
    ]
    for group in path_map["groups"]:  # type: ignore[index]
        markdown.append(f"## {group['path_group']} ({group['detail_pages']} detail pages)")
        markdown.append("")
        for page in group["pages"]:  # type: ignore[index]
            duplicate_note = f" (duplicate of {page['canonical_duplicate_of']})" if page.get("canonical_duplicate_of") else ""
            markdown.append(f"- `{page['role']}` `{page['kind']}` - {page['name']}: {page['url']}{duplicate_note}")
        markdown.append("")
    (OUT_DIR / "sophos_path_map.md").write_text("\n".join(markdown), encoding="utf-8")


def write_outputs(pages: list[dict[str, object]], discovered: list[LinkRecord]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    fetched_at = datetime.now(timezone.utc).isoformat()
    payload = {
        "source": "https://www.sophos.com/en-gb",
        "fetched_at": fetched_at,
        "crawl_scope": (
            "Public Sophos en-gb product, service, and solution pages discovered from homepage, services, "
            "solutions, sitemap indexes, llms.txt, and recursive in-scope page links."
        ),
        "copyright_note": "Use this crawl as research/reference only. Public SecureOps copy should be original and not verbatim Sophos text.",
        "page_count": len(pages),
        "discovered_urls": [
            {"url": item.url, "text": item.text, "source_url": item.source_url, **describe_url(item.url)}
            for item in discovered
        ],
        "pages": pages,
    }
    (OUT_DIR / "sophos_crawl.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT_DIR / "sophos_catalog.json").write_text(
        json.dumps(build_catalog(pages, fetched_at), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    path_map = build_path_map(pages)
    (OUT_DIR / "sophos_path_map.json").write_text(json.dumps(path_map, ensure_ascii=False, indent=2), encoding="utf-8")
    write_path_map_csv(path_map)
    write_path_map_markdown(path_map)

    with (OUT_DIR / "sophos_index.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "kind",
                "crawl_role",
                "path_group",
                "title",
                "h1",
                "meta_description",
                "url",
                "canonical",
                "status_code",
            ],
        )
        writer.writeheader()
        for page in pages:
            writer.writerow({field: page.get(field, "") for field in writer.fieldnames})

    groups: dict[str, list[dict[str, object]]] = defaultdict(list)
    for page in pages:
        groups[str(page["kind"])].append(page)

    markdown: list[str] = [
        "# Sophos product, service, and solution crawl",
        "",
        f"- Source: https://www.sophos.com/en-gb",
        f"- Fetched at: {fetched_at}",
        f"- Pages crawled: {len(pages)}",
        "- Note: use this as research; write original public copy.",
        "",
    ]
    group_order = [
        "site_overview",
        "products_overview",
        "services_overview",
        "solutions_overview",
        "product_category",
        "product",
        "service",
        "solution_group",
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
            markdown.append(f"- Role: {page.get('crawl_role')} | Path group: {page.get('path_group')}")
            if page.get("meta_description"):
                markdown.append(f"- Description: {page['meta_description']}")
            if page.get("keywords"):
                markdown.append(f"- Keywords: {page['keywords']}")
            points = [point for point in page.get("body_points", []) if isinstance(point, str) and len(point) > 20][:8]
            if points:
                markdown.append("- Research notes:")
                for point in points:
                    markdown.append(f"  - {point}")
            ctas = page.get("ctas", [])[:6]
            if ctas:
                markdown.append("- CTAs:")
                for cta in ctas:
                    markdown.append(f"  - {cta['text']}: {cta['url']}")
            markdown.append("")

    (OUT_DIR / "sophos_summary.md").write_text("\n".join(markdown), encoding="utf-8")


def add_records(
    records: Iterable[LinkRecord],
    discovered_by_url: dict[str, LinkRecord],
    queue: deque[LinkRecord],
) -> None:
    for record in records:
        if len(discovered_by_url) >= MAX_DISCOVERY_URLS:
            return
        if record.url in discovered_by_url:
            existing = discovered_by_url[record.url]
            if not existing.text and record.text:
                discovered_by_url[record.url] = record
            continue
        discovered_by_url[record.url] = record
        queue.append(record)


def discover_seed(seed_url: str) -> list[LinkRecord]:
    status_code, content_type, text = fetch(seed_url)
    normalized_seed = normalize_url(seed_url)
    records: list[LinkRecord] = []

    if seed_url.endswith(".xml") or "xml" in content_type:
        records.extend(discover_from_sitemap(text, seed_url, fetch_text))
    elif seed_url.endswith(".txt") or "text/plain" in content_type:
        records.extend(discover_from_llms(text, seed_url))
    else:
        if normalized_seed and is_relevant_url(normalized_seed):
            records.append(LinkRecord(url=normalized_seed, text="", source_url=seed_url))
        records.extend(discover_from_html(text, seed_url))

    print(f"discovered from {seed_url}: status={status_code} content_type={content_type} records={len(records)}")
    return records


def crawl() -> tuple[list[dict[str, object]], list[LinkRecord]]:
    discovered_by_url: dict[str, LinkRecord] = {}
    queue: deque[LinkRecord] = deque()

    for seed_url in SEED_URLS:
        try:
            add_records(discover_seed(seed_url), discovered_by_url, queue)
        except (HTTPError, URLError, TimeoutError, OSError, ElementTree.ParseError) as exc:
            print(f"seed error {seed_url}: {exc}")
        time.sleep(REQUEST_DELAY_SECONDS)

    pages_by_url: dict[str, dict[str, object]] = {}
    processed: set[str] = set()
    while queue:
        record = queue.popleft()
        if record.url in processed:
            continue
        processed.add(record.url)

        try:
            status_code, content_type, html = fetch(record.url)
            if "text/html" not in content_type:
                print(f"skip non-html {record.url} ({content_type})")
                continue
            page = extract_page(html, record.url, status_code)
            pages_by_url[record.url] = page
            print(f"[{len(processed):03d}/{len(discovered_by_url):03d}] {status_code} {page['kind']} {page['crawl_role']}: {record.url}")
            add_records(discover_from_html(html, record.url), discovered_by_url, queue)
            canonical_record = canonical_record_from_page(page)
            if canonical_record:
                add_records([canonical_record], discovered_by_url, queue)
        except Exception as exc:
            pages_by_url[record.url] = {
                "url": record.url,
                **describe_url(record.url),
                "status_code": 0,
                "error": str(exc),
            }
            print(f"[{len(processed):03d}/{len(discovered_by_url):03d}] ERROR {record.url}: {exc}")
        time.sleep(REQUEST_DELAY_SECONDS)

    pages = sorted(pages_by_url.values(), key=lambda item: (str(item.get("kind", "")), str(item.get("url", ""))))
    return pages, unique_links(discovered_by_url.values())


def main() -> None:
    pages, discovered = crawl()
    write_outputs(pages, discovered)
    print(f"wrote {len(pages)} pages to {OUT_DIR}")


if __name__ == "__main__":
    main()
