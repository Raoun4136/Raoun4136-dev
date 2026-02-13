import HomeNeuralMap, { NeuralNode } from '@/components/home-neural-map';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import usePost from '@/app/posts/_hook/usePost';
import useNote from '@/app/notes/_hook/useNote';
import { Header, HeaderSearch, HeaderTitle } from '@/components/common-header';
import { RouterPath } from '@/components/lib/constant';

const SOCIAL_NODES: NeuralNode[] = [
  {
    category: 'social',
    description: '메일로 연락하기',
    href: 'mailto:qkrtjddh1212@naver.com',
    id: 'social-email',
    isExternal: true,
    title: 'Email',
    type: 'note',
  },
  {
    category: 'social',
    description: 'GitHub 프로필',
    href: 'https://github.com/Raoun4136',
    id: 'social-github',
    isExternal: true,
    title: 'GitHub',
    type: 'note',
  },
  {
    category: 'social',
    description: 'Instagram 프로필',
    href: 'https://www.instagram.com/park__55555/',
    id: 'social-instagram',
    isExternal: true,
    title: 'Instagram',
    type: 'note',
  },
  {
    category: 'social',
    description: 'LinkedIn 프로필',
    href: 'https://www.linkedin.com/in/raoun4136/',
    id: 'social-linkedin',
    isExternal: true,
    title: 'LinkedIn',
    type: 'note',
  },
];

const combineNeuralNodes = (posts: ReturnType<typeof usePost>, notes: ReturnType<typeof useNote>): NeuralNode[] => {
  const postNodes = posts.map((post) => ({
    category: 'content' as const,
    description: post.meta.description,
    href: post.meta.outlink && !post.meta.showFull ? post.meta.outlink : `${RouterPath.POSTS}/${post.slug}`,
    id: `post-${post.slug}`,
    isExternal: Boolean(post.meta.outlink && !post.meta.showFull),
    title: post.meta.title,
    type: 'post' as const,
  }));

  const noteNodes = notes.map((note) => ({
    category: 'content' as const,
    description: note.meta.description,
    href: `${RouterPath.NOTES}/${note.slug}`,
    id: `note-${note.slug}`,
    title: note.meta.title,
    type: 'note' as const,
  }));

  const mixedNodes: NeuralNode[] = [];
  const maxLength = Math.max(postNodes.length, noteNodes.length);

  for (let index = 0; index < maxLength; index++) {
    if (postNodes[index]) mixedNodes.push(postNodes[index]);
    if (noteNodes[index]) mixedNodes.push(noteNodes[index]);
  }

  return [...mixedNodes, ...SOCIAL_NODES];
};

export default function Home() {
  const posts = usePost();
  const notes = useNote();
  const neuralNodes = combineNeuralNodes(posts, notes);

  return (
    <>
      <Header>
        <HeaderTitle>
          <h1 className="font-serif font-semibold">박성오 · Raoun</h1>
          <div className="flex items-center gap-2">
            <Link
              href={RouterPath.ABOUT}
              className="inline-flex h-9 items-center rounded-full border border-border/70 bg-background/80 px-3 text-sm text-foreground/80 transition-colors hover:bg-accent"
            >
              About
            </Link>
            <HeaderSearch posts={posts} notes={notes} />
          </div>
        </HeaderTitle>
      </Header>

      <div className="mt-5 overflow-x-clip">
        <div className="relative">
          <HomeNeuralMap nodes={neuralNodes} />

          <details className="group absolute bottom-10 left-1/2 z-30 w-[calc(100%-2rem)] max-w-[22rem] -translate-x-1/2 rounded-2xl border border-border/70 bg-background/80 shadow-lg backdrop-blur-xl md:bottom-4 md:left-auto md:right-4 md:w-[min(88vw,22rem)] md:translate-x-0">
            <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-medium text-foreground/85">
              <span>Recent</span>
              <ChevronDown className="h-4 w-4 text-foreground/65 transition-transform group-open:rotate-180" />
            </summary>

            <div className="grid gap-3 border-t border-border/60 px-3 pb-3 pt-2 sm:grid-cols-2">
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground/60">Posts</h2>
                <ul className="mt-1.5 space-y-1.5">
                  {posts.slice(0, 3).map((post) => {
                    if (post.meta.outlink && !post.meta.showFull) {
                      return (
                        <li key={post.slug}>
                          <Link
                            className="line-clamp-1 text-sm text-foreground/82 hover:underline"
                            href={post.meta.outlink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {post.meta.title}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={post.slug}>
                        <Link className="line-clamp-1 text-sm text-foreground/82 hover:underline" href={`${RouterPath.POSTS}/${post.slug}`}>
                          {post.meta.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground/60">Notes</h2>
                <ul className="mt-1.5 space-y-1.5">
                  {notes.slice(0, 3).map((note) => (
                    <li key={note.slug}>
                      <Link className="line-clamp-1 text-sm text-foreground/82 hover:underline" href={`${RouterPath.NOTES}/${note.slug}`}>
                        {note.meta.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
