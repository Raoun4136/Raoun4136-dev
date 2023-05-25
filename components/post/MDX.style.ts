import styled from '@emotion/styled';

export const MDXContainer = styled.div`
  position: relative;
  width: 100%;
  font-size: 1rem;
  line-height: 1.75;
  font-weight: 400;

  * {
    color: var(--text-base);
    font-size: 16px;
    line-height: 1.7;

    &::selection {
      background-color: #98b48d63;
    }
  }

  sub,
  sup {
    font-size: 12px;
  }

  a {
    color: var(--accent);
    transition: color 0.2s ease;
    &:hover {
      color: var(--accent);
      text-decoration: underline;
    }
  }

  h1 {
    font-size: 28px;
    font-weight: 800;
    margin: 32px 0 0;
    line-height: 1.57em;
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    margin: 32px 0 8px;
    line-height: 1.57em;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    margin: 20px 0 8px;
    line-height: 1.57em;
  }

  h4 {
    font-size: 18px;
    font-weight: 500;
    margin: 28px 0 0;
    line-height: 1.57em;
  }

  h5 {
    font-size: 17px;
    font-weight: 500;
    margin: 28px 0 0;
    line-height: 1.57em;
  }

  h6 {
    font-size: 16px;
    font-weight: 500;
    margin: 28px 0 0;
    line-height: 1.57em;
  }

  strong {
    font-weight: 700;
  }

  code {
    font-family: 'FiraMono';
  }

  p {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    code {
      color: #109a79;
      color: var(--text-base-90);
      padding: 3px 6px;
      font-size: 14px;
      margin: 0 2px;
      font-weight: 400;
      background-color: var(--code-block);
      border-radius: 3px;
    }
  }

  hr {
    height: 1px;
    border: 0;
    background-color: #d0d7de;
  }

  pre {
    position: relative;
    font-size: 15px;
    font-weight: 500;
    padding: 12px 14px;
    border-radius: 8px;
    background-color: var(--code-block);
    margin: 0.85em 0;

    * {
      line-height: 1.57em;
    }

    > code {
      width: 100%;
      display: block;
      line-height: 1.5em;
      overflow-x: auto;
      font-family: 'FiraMono';
      font-weight: 400;
      font-size: 14px;

      * {
        font-size: 14px;
        line-height: 1.25em;
      }
    }
  }

  blockquote {
    margin: 0.25rem 0;
    padding: 0 1rem;
    position: relative;
    border-left: 3px solid var(--accent);
    background-color: var(--bg);
    & p {
      font-size: 16px;
      display: inline;
      color: var(--text-base-90);
      line-height: 1;

      * {
        font-size: 16px;
        color: var(--text-base-70);
      }

      a {
        color: var(--accent);
        opacity: 0.6;
      }

      strong {
        font-weight: 600;
      }

      em {
        font-style: italic;
      }
    }

    code {
      color: var(--text-base-90);
      font-weight: 400;
      padding: 0.2rem 0.3rem;
      font-size: 14px;
      margin: 0 2px;
      background-color: var(--code-block);
      border-radius: 3px;
    }
  }

  ul {
    margin: 1rem 0;
    padding-left: 24px;

    ul,
    ol {
      margin: 0;
    }
    > li {
      list-style: disc;

      > ul > li {
        list-style: circle;

        > ul > li {
          list-style: square;
        }
      }
    }
  }

  ol {
    padding-left: 24px;
    margin: 1rem 0;

    ul,
    ol {
      margin: 0;
    }

    > li {
      list-style: decimal;
      > ol > li {
        list-style: lower-alpha;
        > ol > li {
          list-style: lower-roman;
        }
      }
    }
  }

  li {
    code {
      margin: 0 2px;
      padding: 0.2rem 0.3rem;
      font-size: 14px;
      font-weight: 400;
      font-family: 'FiraMono';
      color: var(--text-base-90);
      border-radius: 3px;
      background-color: var(--code-block);
    }
  }

  table {
    margin: 1em 0;
    border-collapse: collapse;
    width: auto;
  }

  thead th {
    background: #c2e7c64d;
  }

  td {
    font-size: 14px;
    padding: 2px 15px;
    border: 1px solid var(--mdx-border);
  }

  th {
    font-size: 14px;
    padding: 2px 15px;
    font-weight: 500;
    border: 1px solid var(--mdx-border);
  }

  sup a {
    font-size: 12px;
  }

  img {
    max-width: 100%;
    display: block;
    margin: 0.5rem 0;
  }

  /* mdx code block styles */
  pre > code[class*='language-'] {
    position: relative;
    .hljs-title {
      &.class_,
      &.function_ {
        color: #109a79;
      }
    }
    .hljs-number {
      color: orange;
    }
    .hljs-doctag {
      color: #449bb4;
    }

    .hljs-type {
      color: var(--text-base-70);
    }

    .hljs-variable {
      &.language_ {
        color: #109a79;
      }
      color: var(--text-base-70);
      &.constant_ {
        color: #3c8f99;
      }
    }

    .hljs-built_in,
    .hljs-function,
    .hljs-selector-class {
      color: #e06c75;
    }

    .hljs-string {
      color: #e1954d;
      color: #e7aa70;
    }

    .hljs-comment {
      color: var(--text-base-70);
      font-weight: 500;
    }
    .hljs-name,
    .hljs-keyword,
    .hljs-selector-tag {
      color: #e06c75;
    }

    &.language-csharp {
      * {
        color: var(--text-base);
      }
    }
  }

  .rehype-code-title {
    display: block;
    padding: 2px 12px;
    margin-top: 4px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-base-90);
    font-family: 'FiraMono';
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: var(--code-block);

    & + pre {
      margin-top: 2px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

export const MDXSection = styled.section``;

export const MDXHead = styled.div`
  margin-top: 3rem;
  position: relative;

  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;
export const MDXInnerHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MDXTitle = styled.h1`
  margin: 0 !important;
  font-size: 2rem !important;
  word-break: break-all;
  text-align: center;
`;

export const MDXDate = styled.div`
  font-size: 0.8rem;
  text-align: center;
  word-break: keep-all;
  color: var(--text-base-70);
`;

export const MDXContent = styled.div`
  margin-top: 3rem;
`;

export const MDXTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 8px;
`;

export const MDXTag = styled.span`
  color: var(--text-base-90);
  font-weight: 400;
`;
