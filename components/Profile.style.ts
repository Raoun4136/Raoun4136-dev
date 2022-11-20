import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  width: 100%;
  position: relative;
`;
export const ProfileDesc = styled.div`
  text-align: left;
  margin-right: 50px;
`;
export const ProfileSubDesc = styled.div`
  margin-top: 1em;
  font-size: 16px;
  opacity: 0.6;
`;
export const ProfileTitle = styled.div`
  display: inline-block;
  color: var(--text-base);
  font-size: 38px;
  text-transform: capitalize;
`;
export const ProfileMainDesc = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
`;

export const ProfileImage = styled.div`
  position: relative;
  display: block;
  min-width: 180px;
  height: 180px;
  border-radius: 70%;
  overflow: hidden;

  image {
    object-fit: cover;
  }
`;
