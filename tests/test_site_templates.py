import unittest
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]
STYLE_PATH = ROOT_DIR / "assets/themes/custom-twitter/css/style.css"


class SiteTemplateTests(unittest.TestCase):
    def test_blog_template_excludes_paper_posts(self):
        text = ROOT_DIR.joinpath("blog.html").read_text(encoding="utf-8")
        self.assertIn("category != 'papers'", text)

    def test_papers_template_includes_only_paper_posts(self):
        text = ROOT_DIR.joinpath("papers.html").read_text(encoding="utf-8")
        self.assertIn("category == 'papers'", text)

    def test_blog_template_renders_numeric_date_inline_with_title(self):
        text = ROOT_DIR.joinpath("blog.html").read_text(encoding="utf-8")
        self.assertIn('{{ post.date | date: "%Y-%m-%d" }} {{ post.title }}', text)
        self.assertNotIn('</br>', text)

    def test_papers_template_renders_numeric_date_inline_with_title(self):
        text = ROOT_DIR.joinpath("papers.html").read_text(encoding="utf-8")
        self.assertIn('{{ post.date | date: "%Y-%m-%d" }} {{ post.title }}', text)
        self.assertNotIn('</br>', text)

    def test_blog_list_spacing_is_compact(self):
        text = STYLE_PATH.read_text(encoding="utf-8")
        self.assertIn("margin-bottom: 12px;", text)


if __name__ == "__main__":
    unittest.main()
