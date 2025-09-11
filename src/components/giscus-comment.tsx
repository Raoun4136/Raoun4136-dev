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
      lang={'ko'}
      reactionsEnabled="1"
      strict="1"
      emitMetadata="0"
      category="Comments"
      categoryId="DIC_kwDOIVQq2c4ClQN4"
      loading="lazy"
      theme={theme.resolvedTheme}
    />
  );
};

export default GiscusComment;
