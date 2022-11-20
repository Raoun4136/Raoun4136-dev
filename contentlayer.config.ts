import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { DocumentGen } from 'contentlayer/core';

export const urlFromFilePath = (doc: DocumentGen): string => {
  return doc._raw.flattenedPath.replace(/pages\/?/, '');
};

const Daily = defineDocumentType(() => ({
  name: 'Daily',
  filePathPattern: `daily/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    description: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', ''),
    },
  },
}));

const Dev = defineDocumentType(() => ({
  name: 'Dev',
  filePathPattern: `dev/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    description: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      //resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
      //resolve: urlFromFilePath,
      //resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
    pathSegments: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1),
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Daily, Dev],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
