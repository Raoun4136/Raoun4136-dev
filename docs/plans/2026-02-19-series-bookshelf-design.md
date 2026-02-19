# Series Bookshelf Design

Date: 2026-02-19  
Author: Codex + User  
Status: Approved for implementation planning

## 1) Goal

`/series` 페이지에서 시리즈(피처링, 회고, 텔링미)를 "책"처럼 탐색하고, 책을 펼쳐 목차에서 글을 선택해 이동하는 경험을 제공한다.

핵심 사용자 경험:

- 휠/스와이프로 3D 원형 책등 캐러셀 탐색
- 책 선택 시 카메라 전진 + 책 펼침
- 펼쳐진 상태에서 목차(페이지 리스트) 탐색
- 챕터 선택 후 `열기`로 글 이동

## 2) Scope

In scope:

- 신규 라우트: `/series`, `/series/[seriesKey]`
- 대상 시리즈: `featuring`, `retrospective`, `tellingme`
- WebGL 기반 3D 씬(react-three-fiber 계열)
- 다크/라이트 모드 동시 지원
- WebGL 미지원/저사양 환경 폴백 UI

Out of scope (초기 버전):

- 관리자 UI에서 시리즈/톤 편집
- 포스트별 임의 색상 커스터마이징
- 다중 책장(2단 이상) 레이아웃

## 3) Information Architecture

라우팅 전략:

- `/series`: 책장(원형 캐러셀) 진입 화면
- `/series/[seriesKey]`: 해당 시리즈 책이 열린 상태(목차)
- `/posts/[slug]`: 실제 글 상세

`/series/[seriesKey]` 딥링크 진입 시 동작:

- 전체 책장 회전 연출은 생략
- 선택된 책 강조 후 짧은 전진/펼침 인트로
- 완료 즉시 목차 상태 표시

## 4) Data Model

포스트 frontmatter/메타에 필드 추가:

- `series`: `'featuring' | 'retrospective' | 'tellingme'`
- `seriesOrder?`: `number` (시리즈 내 정렬 우선순위)

정렬 규칙:

1. `seriesOrder`가 있으면 오름차순
2. 없으면 `publishedAt` 오름차순

색상 정책:

- 색상은 frontmatter에 넣지 않고 코드 공통 설정으로 관리
- 시리즈별 라이트/다크 팔레트를 각각 정의
- 모든 포스트는 `series`로만 톤을 상속

## 5) Visual & Motion Design

### 5.1 Bookshelf layout

- 책은 세워진 책등(spine) 기준으로 렌더링
- 3권이 3D 원형(캐러셀) 상에서 배치되고 스냅 단위 회전
- 활성 책은 정면에 오고 약간 전진/강조

### 5.2 Book open interaction

책 클릭 시:

1. 카메라 전진
2. 선택 책 확대/회전
3. 책 펼침(페이지 플립) 전환
4. 목차 화면 노출

### 5.3 TOC spread

- 좌측 페이지: 시리즈 소개, 글 수, 기간 정보
- 우측 페이지: 챕터 목록(제목/날짜/읽기시간)
- 글이 많으면 목차 자체를 페이지 단위로 넘김
- 챕터 클릭은 선택만 수행, 실제 이동은 `열기` 버튼으로 확정

### 5.4 Dark/Light mode

각 모드별 시리즈 팔레트 정의:

- `featuring`
- `retrospective`
- `tellingme`

원칙:

- 다크/라이트 모두 대비 비율 확보
- 책등 텍스트 가독성 우선
- 배경/조명 값도 모드별로 분리

## 6) State Model

상태:

- `shelf`: 책장 탐색
- `opening`: 책 펼침 전환
- `toc`: 목차 탐색
- `navigating`: 포스트 이동 전환

주요 이벤트:

- `SCROLL_NEXT`, `SCROLL_PREV`
- `SELECT_BOOK`
- `OPEN_COMPLETE`
- `TOC_PAGE_NEXT`, `TOC_PAGE_PREV`
- `SELECT_CHAPTER`
- `CONFIRM_OPEN`
- `ESCAPE_TO_SHELF`

가드:

- 애니메이션 중 입력 잠금
- 챕터 미선택 시 `열기` 비활성

## 7) Accessibility & Fallback

- `prefers-reduced-motion` 감지 시 모션 축소
- 키보드 탐색 지원(좌/우 이동, Enter 선택, Esc 복귀)
- WebGL 미지원 시 2D 시리즈 카드 + 목차 리스트로 폴백
- 모바일 터치 스와이프 동작 제공

## 8) Performance Strategy

- 3D 씬은 dynamic import로 지연 로드
- 텍스처 경량화(WebP/AVIF, 해상도 제한)
- 모바일 저사양 렌더 모드(그림자/후처리 축소)
- 라우트 전환 시 필요 데이터만 prefetch

## 9) Error Handling

- 유효하지 않은 `seriesKey`는 `notFound()`
- 시리즈 포스트 0건 시 "준비 중" 상태 표시
- 데이터 누락 시 안전한 기본 메타(제목/날짜 fallback)

## 10) Testing Plan

Unit tests:

- 시리즈 그룹핑/필터링
- 정렬(`seriesOrder` 우선, 날짜 fallback)

Integration tests:

- `/series` → `/series/[seriesKey]` 상태 전환
- 딥링크 진입 시 펼침 인트로 후 TOC 도달

E2E tests:

- 책 선택 → 펼침 → 챕터 선택 → `열기` → `/posts/[slug]` 이동
- reduced motion 모드에서 동작 보장

## 11) Implementation Notes

- 초기 릴리스는 시리즈 3개만 지원
- 시리즈 설정(톤/라벨/설명)은 코드 상수로 관리
- 관리자 기능 확장은 후속 스코프로 분리

## 12) Acceptance Criteria

- `/series`에서 3개 시리즈를 3D 원형 책등 캐러셀로 탐색 가능
- `/series/[seriesKey]` 직접 접근 시 짧은 인트로 후 목차 표시
- 챕터 선택 후 `열기`로만 글 이동
- 다크/라이트 모드 모두 시각적 일관성과 가독성 충족
- WebGL 미지원 환경에서 기능적 폴백 제공
