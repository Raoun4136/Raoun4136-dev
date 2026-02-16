export type BlogType = {
  title: string;
  description: string;
  date: string;
  update?: string;
  draft?: boolean;
  viewCount?: number;
  readTimeMin?: number;
  wordCount?: number;
};

export type PostType = BlogType & {
  showFull?: boolean;
  outlink?: string;
};

export type NoteType = BlogType;
