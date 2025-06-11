'use client';

import { useEffect } from 'react';
import mediumZoom from 'medium-zoom';

const ImageZoomer = () => {
  useEffect(() => {
    const zoom = mediumZoom('.mdx img', {
      background: 'hsl(var(--background))',
    });

    return () => {
      zoom.detach();
    };
  }, []);

  return null;
};

export default ImageZoomer;
