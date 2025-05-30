import RSS from 'rss';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CommonMetaData } from './constant';

export const generateRSS = () => {
  const feed = new RSS({
    title: CommonMetaData.title.default,
    description: CommonMetaData.description,
    site_url: CommonMetaData.metadataBase.toString(),
    feed_url: CommonMetaData.metadataBase.toString() + 'feed.xml',
    pubDate: new Date(),
  });

  const posts = fs.readdirSync(path.join('src/mdx/posts'));
  const notes = fs.readdirSync(path.join('src/mdx/notes'));

  posts.map((post) => {
    const { data: frontMatter } = matter(fs.readFileSync(path.join('src/mdx/posts', post), 'utf-8'));
    feed.item({
      title: frontMatter.title,
      description: frontMatter.description,
      url: CommonMetaData.metadataBase.toString() + `posts/${post.replace('.mdx', '')}`,
      date: new Date(frontMatter.date),
    });
  });

  notes.map((note) => {
    const { data: frontMatter } = matter(fs.readFileSync(path.join('src/mdx/notes', note), 'utf-8'));
    feed.item({
      title: frontMatter.title,
      description: frontMatter.description,
      url: CommonMetaData.metadataBase.toString() + `notes/${note.replace('.mdx', '')}`,
      date: new Date(frontMatter.date),
    });
  });

  return feed.xml();
};
