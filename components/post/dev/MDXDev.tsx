import {
  MDXDevContainer,
  MDXDevHead,
  MDXDevSection,
  MDXDevDate,
  MDXDevTitle,
  MDXDevContent,
  MDXTags,
  MDXTag,
} from './MDXDev.style';
import { MDXDevProps } from 'lib/types';
import type { PropsWithChildren } from 'react';
import convertDateUs from 'lib/convertDateUs';
const MDXDev = ({
  title,
  date,
  children,
  tags,
}: PropsWithChildren<MDXDevProps>) => {
  return (
    <MDXDevContainer>
      <MDXDevHead>
        {date && <MDXDevDate>{convertDateUs(date)}</MDXDevDate>}
        <MDXDevTitle>{title}</MDXDevTitle>
        {tags && (
          <MDXTags>
            {tags.map((tag) => (
              <MDXTag>{tag}</MDXTag>
            ))}
          </MDXTags>
        )}
      </MDXDevHead>
      <MDXDevSection>
        <MDXDevContent>{children}</MDXDevContent>
      </MDXDevSection>
    </MDXDevContainer>
  );
};

export default MDXDev;
