import RSS from 'rss';
import { CommonMetaData } from './constant';
import { getAllPublishedEntries } from '@/db/queries/contents';

export const generateRSS = async () => {
  const feed = new RSS({
    title: CommonMetaData.title.default,
    description: CommonMetaData.description,
    site_url: CommonMetaData.metadataBase.toString(),
    feed_url: CommonMetaData.metadataBase.toString() + 'feed.xml',
    pubDate: new Date(),
  });

  const { posts, notes } = await getAllPublishedEntries();

  posts.forEach((post) => {
    feed.item({
      title: post.meta.title,
      description: post.meta.description,
      url: CommonMetaData.metadataBase.toString() + `posts/${post.slug}`,
      date: new Date(post.meta.date),
    });
  });

  notes.forEach((note) => {
    feed.item({
      title: note.meta.title,
      description: note.meta.description,
      url: CommonMetaData.metadataBase.toString() + `notes/${note.slug}`,
      date: new Date(note.meta.date),
    });
  });

  return feed.xml();
};
