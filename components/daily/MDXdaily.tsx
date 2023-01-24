import React from 'react';

import { ParentContainer, Main } from './MDXdaily.style';

const MDXdaily = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ParentContainer>
      <Main>
        <div>{children}</div>
      </Main>
    </ParentContainer>
  );
};

export default MDXdaily;
