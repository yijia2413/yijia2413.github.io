# Daily Papers Design

Date: 2026-03-27
Project: `yijia2413.github.io`
Related script: `/config/workspace/code/code_snippets/daily_papers/paper_bot_feishu.py`

## Goal

Add a dedicated `papers.html` page to the site and extend the daily paper push script so that each run also updates the GitHub Pages repository with one daily paper post. The paper post should contain the 10 papers already selected and translated by the script for that day.

The new paper content must not appear in `blog.html`. `blog.html` remains the general blog index, while `papers.html` becomes the archive for daily paper posts.

## Current State

- `blog.html` is a Jekyll page that renders all `site.posts` without filtering.
- The site navigation is built from Jekyll pages sorted by `order`.
- `paper_bot_feishu.py` currently:
  - crawls Hugging Face daily papers
  - deduplicates papers
  - translates paper abstracts
  - saves a JSON artifact
  - sends the paper summary to Feishu
  - pushes the content to Notion
- The site repository at `/config/workspace/code/yijia2413.github.io` is a git repository with `origin` configured and current branch `master`.

## Design Summary

Use the existing Jekyll post system for daily paper publishing.

- Generate one Jekyll post per day under `_posts/`.
- Tag that post as a paper post.
- Change `blog.html` to exclude paper posts.
- Add `papers.html` to list only paper posts.
- Extend the daily paper script to write the daily paper post into the site repository and push it to GitHub.

This keeps the content model simple and reuses the existing Jekyll rendering flow.

## Content Model

### Daily Paper Post

Each daily run creates or updates one file:

- `_posts/YYYY-MM-DD-daily-papers.md`

Front matter:

```yaml
---
layout: post
title: "Daily Papers - YYYY-MM-DD"
category: papers
tags: [papers, ai]
paper_source: huggingface
---
```

Body structure:

1. short intro line describing the date and source
2. optional link back to the Hugging Face daily paper page
3. 10 sections, one per paper
4. each section contains:
   - paper title
   - source link
   - translated Chinese summary / abstract

Repeated runs on the same day overwrite the same markdown file instead of creating duplicate posts.

### Blog Index Behavior

`blog.html` should render only non-paper posts.

Filtering rule:

- exclude posts whose `category` is `papers`

### Papers Index Behavior

`papers.html` should render only paper posts.

Filtering rule:

- include only posts whose `category` is `papers`

The page should use the same general page structure as `blog.html` so the site remains visually consistent.

## Site Changes

### 1. Update `blog.html`

Replace the current unfiltered `site.posts` loop with a filtered loop that excludes paper posts.

Expected result:

- existing blog posts continue to appear
- generated daily paper posts do not appear

### 2. Add `papers.html`

Create a new Jekyll page with:

- `layout: page`
- `title: Papers`
- `header: Daily Papers`
- `group: navigation`
- `order` between Blog and Project so it appears in the top navigation

Page content:

- heading for the papers archive
- optional short description
- post list showing only `category: papers` posts

## Script Changes

### 1. New Publishing Configuration

Add configurable repository settings near the top of the script:

- `SITE_REPO_DIR`, default `/config/workspace/code/yijia2413.github.io`
- `SITE_POSTS_DIR`, derived from `SITE_REPO_DIR/_posts`
- `SITE_REMOTE`, default `origin`
- `SITE_BRANCH`, default `master`

This keeps the publishing logic reusable and avoids scattering hard-coded paths.

### 2. Render Markdown for the Daily Post

Add helper functions to:

- sanitize markdown text
- build front matter
- build one markdown section per paper
- write the final markdown to `_posts/YYYY-MM-DD-daily-papers.md`

The generated markdown should be deterministic so reruns on the same day produce stable output.

### 3. Publish to GitHub Pages Repository

Add a publishing function that:

1. verifies the site repo exists
2. checks git status in the site repo
3. refuses to continue if the repo contains unrelated uncommitted changes
4. writes or updates the daily post file
5. stages only the generated post file
6. creates a commit only when there is an actual diff
7. pushes to `origin master`

Commit message format:

- `Add daily papers for YYYY-MM-DD`

If the post was updated after a previous run the same day, use:

- `Update daily papers for YYYY-MM-DD`

Either message is acceptable as long as it reflects whether the file already existed.

### 4. Failure Handling

Publishing failure must not block Feishu and Notion behavior retroactively, but once site publishing is attempted the script should log failures clearly.

Rules:

- If no papers are found, skip site publishing.
- If the site repo has unrelated dirty changes, skip git commit and push.
- If writing the markdown file fails, log an error and continue the rest of the script flow.
- If `git commit` finds no changes, treat it as success.
- If `git push` fails, keep the file on disk and send a Feishu text alert in addition to logging.

## Execution Order

Recommended `main()` flow after implementation:

1. fetch papers
2. translate abstracts
3. save JSON artifact
4. write or update the site post
5. commit and push the site repo if safe
6. send Feishu card
7. push to Notion
8. if site push failed, send a short Feishu text alert

This preserves the existing data flow while inserting site publishing before downstream notifications finish.

## Git Safety Rules

The site publishing logic must not accidentally publish unrelated changes.

Allowed behavior:

- stage only the generated post file
- commit only when that file changed
- push only the current intended branch

Disallowed behavior:

- `git add .`
- committing unrelated local edits
- resetting or discarding user changes

## Testing Strategy

### Script-level checks

- generate a post from a fixed paper list and verify the markdown path and content shape
- rerun generation for the same date and verify overwrite behavior
- verify dirty-repo detection blocks commit and push
- verify no-change rerun does not fail

### Site-level checks

- confirm `blog.html` excludes posts with `category: papers`
- confirm `papers.html` lists only posts with `category: papers`
- build the site locally if the Jekyll toolchain is available

## Open Assumptions

- `category: papers` is sufficient for filtering in this Jekyll setup.
- One daily post containing 10 papers matches the intended user experience better than one post per paper.
- The site should publish to the existing `origin/master` branch.

## Implementation Scope

In scope:

- add `papers.html`
- filter `blog.html`
- generate daily markdown posts from the paper script
- commit and push the generated daily post

Out of scope:

- redesigning the site theme
- changing Feishu card layout
- changing Notion page structure beyond existing behavior
- backfilling historical paper posts
