import unittest
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]


class SiteTemplateTests(unittest.TestCase):
    def test_blog_template_excludes_paper_posts(self):
        text = ROOT_DIR.joinpath("blog.html").read_text(encoding="utf-8")
        self.assertIn("category != 'papers'", text)

    def test_papers_template_includes_only_paper_posts(self):
        text = ROOT_DIR.joinpath("papers.html").read_text(encoding="utf-8")
        self.assertIn("category == 'papers'", text)


if __name__ == "__main__":
    unittest.main()
