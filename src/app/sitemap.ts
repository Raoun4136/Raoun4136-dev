import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const defaultSiteMap: MetadataRoute.Sitemap = [
  {
    url: 'https://www.raoun.me',
    lastModified: new Date(),
    changeFrequency: 'daily',
  },
  {
    url: 'https://www.raoun.me/about',
    lastModified: new Date(),
    changeFrequency: 'daily',
  },
  {
    url: 'https://www.raoun.me/posts',
    lastModified: new Date(),
    changeFrequency: 'daily',
  },
  {
    url: 'https://www.raoun.me/notes',
    lastModified: new Date(),
    changeFrequency: 'daily',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = fs.readdirSync(path.join('src/mdx/posts'));
  const notes = fs.readdirSync(path.join('src/mdx/notes'));

  const sitemapFromPosts: MetadataRoute.Sitemap = posts.map((post) => {
    const { data: frontMatter } = matter(fs.readFileSync(path.join('src/mdx/posts', post), 'utf-8'));
    return {
      url: 'https://www.raoun.me/posts/' + post?.replace('.mdx', ''),
      lastModified: new Date(frontMatter.update ?? frontMatter.date),
      changeFrequency: 'daily',
    };
  });

  const sitemapFromNotes: MetadataRoute.Sitemap = notes.map((note) => {
    const { data: frontMatter } = matter(fs.readFileSync(path.join('src/mdx/notes', note), 'utf-8'));
    return {
      url: 'https://www.raoun.me/notes/' + note?.replace('.mdx', ''),
      lastModified: new Date(frontMatter.update ?? frontMatter.date),
      changeFrequency: 'daily',
    };
  });
  return [...defaultSiteMap, ...sitemapFromPosts, ...sitemapFromNotes];
}
