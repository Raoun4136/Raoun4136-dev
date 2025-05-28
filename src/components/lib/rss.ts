import RSS from 'rss';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const generateRSS = () => {
  const feed = new RSS({
    title: `Raoun.me`,
    description: '대체할 수 없는 개발자가 되어보자',
    site_url: 'https://www.raoun.me',
    feed_url: 'https://www.raoun.me/feed.xml',
    pubDate: new Date(),
  });

  const posts = fs.readdirSync(path.join('src/mdx/posts'));
  const notes = fs.readdirSync(path.join('src/mdx/notes'));

  posts.map((post) => {
    const { data: frontMatter } = matter(fs.readFileSync(path.join('src/mdx/posts', post), 'utf-8'));
    feed.item({
      title: frontMatter.title,
      description: frontMatter.description,
      url: `https://www.raoun.me/posts/${post.replace('.mdx', '')}`,
      date: new Date(frontMatter.date),
    });
  });

  notes.map((note) => {
    const { data: frontMatter } = matter(fs.readFileSync(path.join('src/mdx/notes', note), 'utf-8'));
    feed.item({
      title: frontMatter.title,
      description: frontMatter.description,
      url: `https://www.raoun.me/notes/${note.replace('.mdx', '')}`,
      date: new Date(frontMatter.date),
    });
  });

  return feed.xml();
};
