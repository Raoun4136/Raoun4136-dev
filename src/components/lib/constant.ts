export const RouterPath = {
  HOME: '/',
  POSTS: '/posts',
  NOTES: '/notes',
  ABOUT: '/about',
  GUESTBOOK: '/guestbook',
};

export const CommonMetaData = {
  metadataBase: new URL('https://www.raoun.me'),
  title: {
    template: '%s | Raoun.me',
    default: 'Raoun.me',
  },
  description: '대체할 수 없는 개발자가 되어보자',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: new URL('https://www.raoun.me'),
    images: '/images/og-image.png',
    type: 'website',
  },
  verification: {
    other: {
      'naver-site-verification': 'a86b2f1dbcae85a65adac50bd181de3cb7d853d0',
    },
  },
};
