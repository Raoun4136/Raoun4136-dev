import {
  MDXDevContainer,
  MDXDevHead,
  MDXDevSection,
  MDXDevDate,
  MDXDevTitle,
  MDXDevContent,
} from './MDXDev.style';
import { MDXDevProps } from 'lib/types';
import type { PropsWithChildren } from 'react';
import convertDateUs from 'lib/convertDateUs';
const MDXDev = ({ title, date, children }: PropsWithChildren<MDXDevProps>) => {
  return (
    <MDXDevContainer>
      <MDXDevHead>
        {date && <MDXDevDate>{convertDateUs(date)}</MDXDevDate>}
        <MDXDevTitle>{title}</MDXDevTitle>
      </MDXDevHead>
      <MDXDevSection>
        <MDXDevContent>{children}</MDXDevContent>
      </MDXDevSection>
    </MDXDevContainer>
  );
};

export default MDXDev;
