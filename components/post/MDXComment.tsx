import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const MDXComment = () => {
  const router = useRouter();

  return (
    <Comment
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://utteranc.es/client.js';
        scriptElem.async = true;
        scriptElem.setAttribute('repo', 'Raoun4136/Raoun4136-dev');
        scriptElem.setAttribute('issue-term', 'pathname');
        scriptElem.setAttribute(
          'theme',
          document.body.dataset.theme === 'light'
            ? 'github-light'
            : 'github-dark'
        );
        scriptElem.setAttribute('label', 'blog-comment');
        scriptElem.crossOrigin = 'anonymous';
        elem.appendChild(scriptElem);
      }}
    />
  );
};

const Comment = styled.section`
  padding: 2rem 0;
  border-top: 1px solid var(--mdx-border);
  margin-bottom: 1rem;
`;

export default MDXComment;
