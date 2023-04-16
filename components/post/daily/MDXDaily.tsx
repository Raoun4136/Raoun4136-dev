import {
  MDXDailyContainer,
  MDXDailyHead,
  MDXDailySection,
  MDXDailyDate,
  MDXDailyTitle,
  MDXDailyContent,
  MDXTags,
  MDXTag,
} from './MDXDaily.style';
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
    <MDXDailyContainer>
      <MDXDailyHead>
        {date && <MDXDailyDate>{convertDateUs(date)}</MDXDailyDate>}
        <MDXDailyTitle>{title}</MDXDailyTitle>
        {tags && (
          <MDXTags>
            {tags.map((tag) => (
              <MDXTag>{tag}</MDXTag>
            ))}
          </MDXTags>
        )}
      </MDXDailyHead>
      <MDXDailySection>
        <MDXDailyContent>{children}</MDXDailyContent>
      </MDXDailySection>
    </MDXDailyContainer>
  );
};

export default MDXDaily;
