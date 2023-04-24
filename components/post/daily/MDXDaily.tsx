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
import { MDXDailyProps } from 'lib/types';
import type { PropsWithChildren } from 'react';
import convertDateUs from 'lib/convertDateUs';
const MDXDaily = ({
  title,
  date,
  children,
  tags,
}: PropsWithChildren<MDXDailyProps>) => {
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

export default MDXDaily;
