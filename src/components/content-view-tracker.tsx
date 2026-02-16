'use client';

import { useEffect } from 'react';

type ContentViewTrackerProps = {
  type: 'post' | 'note';
  slug: string;
  enabled?: boolean;
};

export default function ContentViewTracker({ type, slug, enabled = true }: ContentViewTrackerProps) {
  useEffect(() => {
    if (!enabled) return;

    void fetch(`/api/contents/${type}/${encodeURIComponent(slug)}/view`, {
      method: 'POST',
      keepalive: true,
    });
  }, [enabled, slug, type]);

  return null;
}
