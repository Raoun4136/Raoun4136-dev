import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/*.js',
    'pages/*.tsx',
    'posts/**/*.mdx',
    '!pages/_*.tsx',
    '!pages/_*.js',
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .filter((page) => !page.includes('pages/404.tsx'))
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('posts', '/posts')
              .replace('.tsx', '')
              .replace('.js', '')
              .replace('.mdx', '')
              .replace('/index', '');
            return `
              <url>
                  <loc>${`https://raoun.me${path}`}</loc>
              </url>
            `;
          })
          .join('')}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted);
}

generate();
