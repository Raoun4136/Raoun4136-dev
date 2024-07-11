import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allDailies, allDevs } from 'contentlayer/generated';

const feed = new RSS({
  title: 'RaounDev',
  feed_url: 'https://raoun.me/rss.xml',
  site_url: 'https://raoun.me/',
});

allDailies
  .map((daily) => ({
    title: daily.title,
    description: daily.description,
    url: `https://raoun.me/daily/${daily._raw.flattenedPath}`,
    date: daily.date,
  }))
  .forEach((item) => {
    feed.item(item);
  });

allDevs
  .map((dev) => ({
    title: dev.title,
    description: dev.description,
    url: `https://raoun.me/daily/${dev.slug}`,
    date: dev.date,
  }))
  .forEach((item) => {
    feed.item(item);
  });

writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
