import HomeNeuralMap, { NeuralNode } from '@/components/home-neural-map';
import usePost from '@/app/posts/_hook/usePost';
import useNote from '@/app/notes/_hook/useNote';
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
    <div className="h-full w-full overflow-hidden">
      <HomeNeuralMap nodes={neuralNodes} fullBleed />
    </div>
  );
}
