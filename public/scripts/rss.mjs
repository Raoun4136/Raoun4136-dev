import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allDailies, allDevs } from 'contentlayer/generated';

const feed = new RSS({
  title: 'RaounDev',
  feed_url: 'https://raoun4136-dev.vercel.app/rss.xml',
  site_url: 'https://raoun4136-dev.vercel.app/',
});

allDailies
  .map((daily) => ({
    title: daily.title,
    description: daily.description,
    url: `https://raoun4136-dev.vercel.app/daily/${daily._raw.flattenedPath}`,
    date: daily.date,
  }))
  .forEach((item) => {
    feed.item(item);
  });

allDevs
  .map((dev) => ({
    title: dev.title,
    description: dev.description,
    url: `https://raoun4136-dev.vercel.app/daily/${dev.slug}`,
    date: dev.date,
  }))
  .forEach((item) => {
    feed.item(item);
  });

writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
