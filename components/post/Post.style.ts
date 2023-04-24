import styled from '@emotion/styled';

export const PostCard = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 2rem;

  :hover {
    cursor: pointer;

    span img {
      transition: 0.2s;
      transform: scale(1.1);
    }

    h2 {
      transition: 0.2s;
      color: var(--accent);
    }
  }

  @media screen and (max-width: 768px) {
    gap: 0rem;
    flex-direction: column;
  }
`;

export const PostDate = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-base-70);
`;

export const PostType = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-base-70);
`;

export const PostTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
`;

export const PostDesc = styled.h3`
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--text-base-90);
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0;

  @media screen and (max-width: 768px) {
    gap: 0.5rem;
    flex-direction: column;
  }

  @media screen and (max-width: 270px) {
    display: none;
  }
`;

export const PostImg = styled.div`
  width: 14rem;
  height: 9rem;
  position: relative;
  flex-shrink: 0;
  & > span {
    border-radius: 0.6rem;
    & .autoImage {
      object-fit: cover !important;
      position: relative !important;
      height: auto !important;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: inherit;

    & > span {
      position: unset !important;
      & .autoImage {
        object-fit: contain !important;
      }
    }
  }
`;

export const PostData = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const PostTitleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
