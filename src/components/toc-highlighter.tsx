'use client';
import { useEffect } from 'react';

/**
 * @description
 * TOC를 따라가며 현재 헤딩을 활성화하는 컴포넌트
 */
export function TocHighlighter() {
  useEffect(() => {
    function onScroll() {
      const headings = Array.from(document.querySelectorAll('.mdx [id]')).filter((el) =>
        /^h[1-6]$/.test(el.tagName.toLowerCase()),
      );
      const tocLinks = Array.from(document.querySelectorAll('.mdx .toc-link'));

      let currentId = '';
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 160) {
          currentId = heading.id;
        }
      }

      let activeLink: Element | null = null;
      tocLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
          activeLink = link;
        } else {
          link.classList.remove('active');
        }
      });

      // Scroll the active TOC link into view if needed
      if (activeLink && (activeLink as HTMLElement).closest('.toc')) {
        (activeLink as HTMLElement).scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
