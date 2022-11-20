import styled from '@emotion/styled';

export const RecentCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background: #0c0c0c;
  border: 1px solid black;
  border-radius: 30px;
  margin-top: 12px;
  cursor: pointer;
  padding: 25px 20px;
  transition: box-shadow 0.3s;

  &:hover {
    h2 {
      text-shadow: 0 -1.3em #dedede, 0 0 #a5c9ff;
    }
  }

  &:active {
    opacity: 1;
  }
`;
export const RecentTitle = styled.h2`
  color: #0000;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2em;
  text-shadow: 0 0 #dedede, 0 1.2em #a5c9ff;
  overflow: hidden;
  transition: 0.3s;
`;
export const RecentDesc = styled.div`
  color: #d2d2d2;
  margin-top: 2px;
  font-size: 14px;
  font-weight: 400;
`;
export const RecentDate = styled.div`
  margin-top: 12px;
  color: #a2a2a2;
  font-size: 12px;
  font-weight: 400;
`;
export const RecentInfo = styled.div`
  margin-top: 50px;
  color: #dedede;
  font-size: 16px;
  font-weight: 600;
`;
