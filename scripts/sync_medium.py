import feedparser
from datetime import datetime
import os
import re

# Customize these
FEED_URL = 'https://medium.com/feed/@odajxx'
POSTS_DIR = 'content/blog/posts'

feed = feedparser.parse(FEED_URL)
latest_post = feed.entries[0]

title = latest_post.title
link = latest_post.link
summary = re.sub('<[^<]+?>', '', latest_post.summary)[:250].strip() + "..."
pub_date = datetime(*latest_post.published_parsed[:6]).strftime('%Y-%m-%d')
slug = re.sub(r'\W+', '-', title.lower()).strip('-')
filename = f"{POSTS_DIR}/{slug}.md"

if not os.path.exists(filename):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(f"""---
title: "{title}"
date: {pub_date}
summary: "{summary}"
external_link: "{link}"
tags: ["medium"]
---

Read the full article on [Medium]({link}).
""")
    print(f"✅ New post saved as {filename}")
else:
    print("⏭️ Already exists, skipping.")
