import {
  MDXContainer,
  MDXHead,
  MDXSection,
  MDXDate,
  MDXTitle,
  MDXContent,
  MDXTags,
  MDXTag,
} from '../MDX.style';
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
    <MDXContainer>
      <MDXHead>
        {date && <MDXDate>{convertDateUs(date)}</MDXDate>}
        <MDXTitle>{title}</MDXTitle>
        {tags && (
          <MDXTags>
            {tags.map((tag) => (
              <MDXTag>{tag}</MDXTag>
            ))}
          </MDXTags>
        )}
      </MDXHead>
      <MDXSection>
        <MDXContent>{children}</MDXContent>
      </MDXSection>
    </MDXContainer>
  );
};

export default MDXDev;
