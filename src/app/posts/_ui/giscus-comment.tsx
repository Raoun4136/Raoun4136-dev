'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

const GiscusComment = () => {
  const theme = useTheme();

  return (
    <Giscus
      repo="Raoun4136/Raoun4136-dev"
      repoId={'R_kgDOIVQq2Q'}
      mapping={'pathname'}
      reactionsEnabled="1"
      emitMetadata="1"
      loading="lazy"
      theme={theme.resolvedTheme}
    />
  );
};

export default GiscusComment;
