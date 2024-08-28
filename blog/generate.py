import argparse
import os
from datetime import datetime

# Function to create a new blog post
def create_blog_post(title, draft=True):
    # Generate filename based on title and current date
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"{date_str}-{title.lower().replace(' ', '-')}.md"

    # Write content to file
    with open(os.path.join("./src/blog", filename), "w") as f:
        f.write(f"""---
date: {date_str}
draft: {draft}
title: {title}
premise: No summary written.
url: /blog/{filename.replace('.md', '')}
---

[comment]: <> (THIS FILE WAS AUTO-GENERATED)
        """
            )

        print(f"Blog post created: {filename}")

def main():
    parser = argparse.ArgumentParser(description="11ty Blog Content Generator")
    parser.add_argument("title", help="Title of the blog post")
    parser.add_argument("draft", help="Post should be draft?")

    args = parser.parse_args()

    create_blog_post(args.title, args.draft)

if __name__ == "__main__":
    main()