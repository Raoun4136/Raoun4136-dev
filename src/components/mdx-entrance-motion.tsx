'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export function MdxEntranceMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const roots = document.querySelectorAll<HTMLElement>('.mdx');

    roots.forEach((root) => {
      if (root.dataset.motionState !== 'pending') return;
      root.dataset.motionState = 'running';

      const blocks = Array.from(root.children) as HTMLElement[];
      const toc = root.querySelector<HTMLElement>('.toc');
      const links = toc ? Array.from(toc.querySelectorAll<HTMLElement>('a')) : [];

      blocks.forEach((block) => {
        if (block.classList.contains('toc')) return;
        block.classList.remove('mdx-reveal-item');
        block.style.removeProperty('--mdx-reveal-delay');
      });

      toc?.classList.remove('toc-reveal');
      links.forEach((link) => {
        link.classList.remove('toc-reveal-link');
        link.style.removeProperty('--toc-reveal-delay');
      });

      // Reflow로 애니메이션 시작 지점을 초기화한다.
      void root.offsetWidth;

      let order = 0;
      blocks.forEach((block) => {
        if (block.classList.contains('toc')) return;
        block.classList.add('mdx-reveal-item');
        block.style.setProperty('--mdx-reveal-delay', `${Math.min(order, 24) * 80}ms`);
        order += 1;
      });

      if (!toc) return;

      toc.classList.add('toc-reveal');
      links.forEach((link, index) => {
        link.classList.add('toc-reveal-link');
        link.style.setProperty('--toc-reveal-delay', `${160 + index * 55}ms`);
      });

      root.dataset.motionState = 'done';
    });
  }, [pathname]);

  return null;
}
