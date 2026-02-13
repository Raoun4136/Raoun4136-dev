'use client';

import { useEffect } from 'react';

export function MdxEntranceMotion() {
  useEffect(() => {
    const roots = document.querySelectorAll<HTMLElement>('.mdx');

    roots.forEach((root) => {
      if (root.dataset.motionReady === 'true') return;
      root.dataset.motionReady = 'true';

      let order = 0;
      const blocks = Array.from(root.children) as HTMLElement[];
      blocks.forEach((block) => {
        if (block.classList.contains('toc')) return;
        block.classList.add('mdx-reveal-item');
        block.style.setProperty('--mdx-reveal-delay', `${Math.min(order, 24) * 80}ms`);
        order += 1;
      });

      const toc = root.querySelector<HTMLElement>('.toc');
      if (!toc) return;

      toc.classList.add('toc-reveal');
      const links = Array.from(toc.querySelectorAll<HTMLElement>('a'));
      links.forEach((link, index) => {
        link.classList.add('toc-reveal-link');
        link.style.setProperty('--toc-reveal-delay', `${160 + index * 55}ms`);
      });
    });
  }, []);

  return null;
}

