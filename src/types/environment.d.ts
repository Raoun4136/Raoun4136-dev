export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_NAVER_WA_ID?: string;
      NEXT_PUBLIC_UMAMI_ID?: string;
      DATABASE_URL?: string;
      VERCEL_ENV?: 'production' | 'preview' | 'development';
      STUDIO_ENABLED?: 'true' | 'false';
      STUDIO_AUTH_USER?: string;
      STUDIO_AUTH_PASSWORD?: string;
      BLOB_READ_WRITE_TOKEN?: string;
    }
  }
}
