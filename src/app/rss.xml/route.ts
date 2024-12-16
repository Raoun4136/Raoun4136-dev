import { generateRSS } from '@/lib/rss';

export async function GET() {
  const rss = generateRSS();
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
