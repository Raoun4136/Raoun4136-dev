import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import PostLi from './_ui/post-li';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'My Posts',
  alternates: {
    canonical: '/posts',
  },
};

export default function Posts() {
  // 1) Set blogs directory
  const blogDir = 'src/mdx/posts';

  // 2) Find all files in the blog directory
  const files = fs.readdirSync(path.join(blogDir));

  // 3) For each blog found
  const blogs = files.map((filename) => {
    // 4) Read the content of that blog
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');

    // 5) Extract the metadata from the blog's content
    const { data: frontMatter } = matter(fileContent);

    // 6) Return the metadata and page slug
    return {
      meta: frontMatter,
      slug: filename.replace('.mdx', ''),
    };
  });

  return (
    <div className="mb-16 mt-8 w-full max-w-2xl text-left">
      <ul className="flex flex-col gap-8">
        {blogs
          ?.sort((a, b) => b.meta.date - a.meta.date)
          .map((blog) => (
            <li key={blog.slug}>
              <PostLi
                title={blog.meta.title}
                description={blog.meta.description}
                date={blog.meta.date}
                slug={blog.slug}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
