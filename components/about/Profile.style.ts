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
  font-size: var(--logo-font-size);
  font-weight: var(--logo-font-weight);
`;

export const ProfileMainDesc = styled.h2`
  font-size: var(--text-font-size);
  font-weight: var(--text-font-weight);
  margin-top: 0.5rem;
`;

export const ProfileSubDesc = styled.h3`
  font-size: var(--link-font-size);
  font-weight: var(--link-font-weight);
  color: var(--text-base-90);
`;

export const ProfileImage = styled.div`
  position: relative;
  display: block;
  width: 160px;
  height: 160px;
  overflow: hidden;

  img {
    object-fit: cover;
    border-radius: 20rem;
  }

  @media screen and (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`;
