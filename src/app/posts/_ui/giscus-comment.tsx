'use client';

import Giscus from '@giscus/react';

const GiscusComment = () => {
  return (
    <Giscus
      repo="Raoun4136/Raoun4136-dev"
      repoId={'R_kgDOIVQq2Q'}
      mapping={'pathname'}
      reactionsEnabled="1"
      emitMetadata="1"
      loading="lazy"
      theme="preferred_color_scheme"
    />
  );
};

export default GiscusComment;
