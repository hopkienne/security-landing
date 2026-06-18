from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).with_name("crawl_sophos.py")


def load_crawler():
    spec = importlib.util.spec_from_file_location("crawl_sophos", SCRIPT_PATH)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class SophosCrawlerTests(unittest.TestCase):
    def test_module_imports_without_third_party_dependencies(self) -> None:
        module = load_crawler()

        self.assertEqual(module.BASE, "https://www.sophos.com")

    def test_solution_path_roles_distinguish_group_from_detail(self) -> None:
        module = load_crawler()

        use_cases = module.describe_url("https://www.sophos.com/en-gb/solutions/use-cases")
        ransomware = module.describe_url(
            "https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection"
        )
        ai = module.describe_url("https://www.sophos.com/en-gb/solutions/ai-cybersecurity")

        self.assertEqual(use_cases["kind"], "solution_group")
        self.assertEqual(use_cases["crawl_role"], "group")
        self.assertEqual(use_cases["path_group"], "solutions/use-cases")
        self.assertEqual(ransomware["kind"], "solution_use_case")
        self.assertEqual(ransomware["crawl_role"], "detail")
        self.assertEqual(ransomware["path_group"], "solutions/use-cases")
        self.assertEqual(ai["kind"], "solution")
        self.assertEqual(ai["crawl_role"], "detail")

    def test_sitemap_index_expands_nested_sitemaps(self) -> None:
        module = load_crawler()
        sitemap_index = """<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <sitemap><loc>https://www.sophos.com/en-gb/sitemap-solutions.xml</loc></sitemap>
        </sitemapindex>
        """
        urlset = """<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url><loc>https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection</loc></url>
          <url><loc>https://www.sophos.com/en-gb/blog/not-in-scope</loc></url>
        </urlset>
        """

        def fetch_text(url: str) -> str:
            self.assertEqual(url, "https://www.sophos.com/en-gb/sitemap-solutions.xml")
            return urlset

        records = module.discover_from_sitemap(sitemap_index, "https://www.sophos.com/en-gb/sitemap.xml", fetch_text)

        self.assertEqual([record.url for record in records], [
            "https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection"
        ])

    def test_parse_curl_output_keeps_body_and_metadata_separate(self) -> None:
        module = load_crawler()

        status, content_type, body = module.parse_curl_output(
            b"<html>body</html>\n__CURL_META__200\ttext/html; charset=utf-8"
        )

        self.assertEqual(status, 200)
        self.assertEqual(content_type, "text/html; charset=utf-8")
        self.assertEqual(body, "<html>body</html>")

    def test_catalog_excludes_canonical_duplicate_pages(self) -> None:
        module = load_crawler()
        pages = [
            {
                "url": "https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection",
                "canonical": "https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection",
                "kind": "solution_use_case",
                "crawl_role": "detail",
                "h1": "Strengthen your ransomware defenses",
                "body_points": [],
                "sections": [],
                "ctas": [],
                "related_links": [],
            },
            {
                "url": "https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection-1",
                "canonical": "https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection",
                "canonical_duplicate_of": "https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection",
                "kind": "solution_use_case",
                "crawl_role": "detail",
                "h1": "Strengthen your ransomware defenses",
                "body_points": [],
                "sections": [],
                "ctas": [],
                "related_links": [],
            },
        ]

        catalog = module.build_catalog(pages, "2026-06-18T00:00:00+00:00")

        self.assertEqual(catalog["counts"]["solutions"], 1)
        self.assertEqual(
            catalog["solutions"][0]["url"],
            "https://www.sophos.com/en-gb/solutions/use-cases/ransomware-protection",
        )

    def test_canonical_record_from_page_adds_in_scope_canonical(self) -> None:
        module = load_crawler()
        page = {
            "url": "https://www.sophos.com/en-gb/solutions/neutralize-threats",
            "canonical": "https://www.sophos.com/en-gb/solutions/mdr-security-solutions",
        }

        record = module.canonical_record_from_page(page)

        self.assertIsNotNone(record)
        self.assertEqual(record.url, "https://www.sophos.com/en-gb/solutions/mdr-security-solutions")
        self.assertEqual(record.source_url, "https://www.sophos.com/en-gb/solutions/neutralize-threats")


if __name__ == "__main__":
    unittest.main()
