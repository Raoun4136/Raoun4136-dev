'use client';

import { useEffect, useState } from 'react';
import HomeNeuralMap, { NeuralNode } from '@/components/home-neural-map';

type HomeNeuralMapShellProps = {
  nodes: NeuralNode[];
  fullBleed?: boolean;
};

export default function HomeNeuralMapShell({ nodes, fullBleed = false }: HomeNeuralMapShellProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full" aria-hidden />;
  }

  return <HomeNeuralMap nodes={nodes} fullBleed={fullBleed} />;
}
