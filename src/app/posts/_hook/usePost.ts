import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostType } from '@/components/lib/type';

const usePost = () => {
  // 1) Set blogs directory
  const blogDir = 'src/mdx/posts';

  // 2) Find all files in the blog directory
  const files = fs.readdirSync(path.join(blogDir));

  // 3) For each blog found
  const blogs = files
    .map((filename) => {
      // 4) Read the content of that blog
      const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');

      // 5) Extract the metadata from the blog's content
      const { data: frontMatter } = matter(fileContent);

      // 6) Return the metadata and page slug
      return {
        meta: frontMatter as PostType,
        slug: filename.replace('.mdx', ''),
      };
    })
    .filter((blog) => !blog.meta.draft)
    ?.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

  return blogs;
};

export default usePost;
