import { generateRSS } from '../components/lib/rss';
import fs from 'fs';
import path from 'path';

const green = (msg: string) => `\x1b[32m${msg}\x1b[0m`;
const cyan = (msg: string) => `\x1b[36m${msg}\x1b[0m`;
const bold = (msg: string) => `\x1b[1m${msg}\x1b[0m`;

async function main() {
  console.log(bold('\n=============================='));
  console.log(cyan('📝  Generating RSS feeds...'), new Date().toLocaleString());
  console.log('\n');

  const rss = generateRSS();
  const outputFeedPath = path.join(__dirname, '../../public/feed.xml');
  const outputRssPath = path.join(__dirname, '../../public/rss.xml');

  fs.mkdirSync(path.dirname(outputFeedPath), { recursive: true });

  fs.writeFileSync(outputFeedPath, rss);
  console.log(green('✅  RSS feed generated:'), outputFeedPath);

  fs.writeFileSync(outputRssPath, rss);
  console.log(green('✅  RSS feed generated:'), outputRssPath);

  console.log(bold('==============================\n'));
}

main();
