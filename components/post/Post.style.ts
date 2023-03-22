import styled from '@emotion/styled';

//TODO: height 반응형으로 만들기
export const PostCard = styled.div`
  width: 100%;
  height: 9.5rem;
  position: relative;
  box-shadow: 0 0 0.2rem var(--post-shadow);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  padding: 1rem 1.5rem;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0.4rem var(--post-shadow-hover);

    span img {
      transition: 0.2s;
      transform: scale(1.1);
    }
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    height: 20rem;
    flex-direction: column-reverse;
  }

  @media screen and (max-width: 400px) {
    height: 18rem;
  }

  @media screen and (max-width: 300px) {
    height: 16rem;
  }
`;

export const PostDate = styled.p`
  font-size: var(--link-font-size);
  font-weight: var(--link-font-weight);
  color: var(--text-base-90);
`;

export const PostType = styled.p`
  font-size: var(--link-font-size);
  font-weight: var(--link-font-weight);
  color: var(--text-base-90);
`;

export const PostTitle = styled.h2`
  font-size: var(--intro-font-size);
  font-weight: var(--intro-font-weight);
`;

export const PostDesc = styled.h3`
  font-size: var(--text-font-size);
  font-weight: var(--text-font-weight);
  color: var(--text-base-90);
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding-right: 0.5rem;

  @media screen and (max-width: 600px) {
    padding-right: 0;
  }
`;

//TODO: height 반응형으로 만들기
export const PostImg = styled.div`
  width: 13rem;
  height: 100%;
  position: relative;
  flex-shrink: 0;

  img {
    border-radius: 0.5rem;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 12rem;
  }

  @media screen and (max-width: 400px) {
    height: 10rem;
  }

  @media screen and (max-width: 300px) {
    height: 6rem;
  }
`;

export const PostData = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const PostTitleSection = styled.section``;
