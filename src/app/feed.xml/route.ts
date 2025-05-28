import { generateRSS } from '@/components/lib/rss';

export async function GET() {
  const rss = generateRSS();
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
