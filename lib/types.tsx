/* Post */
export type posts = {
  title: string;
  description: string;
  url: string;
  image: string;
};

export type MDXDevProps = {
  title: string;
  date?: string;
  url?: string;
  path?: string;
  tags?: string[];
};

export type MDXDailyProps = {
  title: string;
  date?: string;
  url?: string;
  path?: string;
  tags?: string[];
};
