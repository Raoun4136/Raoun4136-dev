# [Raoun.me](https://www.raoun.me)

My Personal Blog with Next14 app router

## Features

- **MDX**
  - next-mdx-remote-client
  - gray-matter
  - rehype
  - remark
- **Next14**
  - App Router
- **UI**
  - shadcn ui
  - TailwindCSS
- **Dark Mode**
  - Next Theme
- **Comments**
  - Giscus

## Database (Neon + Drizzle)

- `DATABASE_URL` 환경변수를 설정하세요.
- 스키마 생성 SQL 만들기: `pnpm db:generate`
- DB에 마이그레이션 적용: `pnpm db:migrate`
- 기존 MDX를 DB로 시드: `pnpm db:seed:mdx`

## Production-only tracking

- Analytics 스크립트와 조회수 집계 API는 `VERCEL_ENV=production`에서만 동작합니다.
- 로컬 개발(`next dev`)이나 Vercel Preview 배포에서는 조회수가 증가하지 않습니다.

## Studio

- 경로: `/studio`
- 기본적으로 로컬/개발 환경에서만 열립니다.
- 프로덕션에서 사용하려면 `STUDIO_ENABLED=true`를 설정하세요.
- `STUDIO_ENABLED=true`일 때 `/studio`에 Basic Auth가 적용됩니다. (환경 무관)
