export type BlogType = {
  title: string;
  description: string;
  date: string;
  draft?: boolean;
};

export type PostType = BlogType & {
  showFull?: boolean;
  outlink?: string;
};

export type NoteType = BlogType;
