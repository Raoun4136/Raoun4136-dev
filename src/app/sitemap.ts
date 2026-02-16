import { MetadataRoute } from 'next';
import { getAllPublishedEntries } from '@/db/queries/contents';

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, notes } = await getAllPublishedEntries();

  const sitemapFromPosts: MetadataRoute.Sitemap = posts.map((post) => {
    return {
      url: 'https://www.raoun.me/posts/' + post.slug,
      lastModified: new Date(post.meta.update ?? post.meta.date),
      changeFrequency: 'daily',
    };
  });

  const sitemapFromNotes: MetadataRoute.Sitemap = notes.map((note) => {
    return {
      url: 'https://www.raoun.me/notes/' + note.slug,
      lastModified: new Date(note.meta.update ?? note.meta.date),
      changeFrequency: 'daily',
    };
  });
  return [...defaultSiteMap, ...sitemapFromPosts, ...sitemapFromNotes];
}
