import styled from '@emotion/styled';

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
`;
export const ProfileDesc = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
`;

export const ProfileMainDesc = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin-top: 0.5rem;
`;

export const ProfileSubDesc = styled.h3`
  font-size: 0.8rem;
  font-weight: 300;
  color: var(--text-base-70);
`;

export const ProfileImage = styled.div`
  position: relative;
  display: block;
  width: 160px;
  height: 160px;
  overflow: hidden;

  img {
    object-fit: cover;
    object-position: 50% 0%;
    border-radius: 20rem;
  }

  @media screen and (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`;
