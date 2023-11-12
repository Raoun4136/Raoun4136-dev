import styled from '@emotion/styled';

const ControlDesc = () => {
  return (
    <ControlWrapper>
      <p>press w a s d to move</p>
      <p>press k to swap camera</p>
      <p>press r to reset</p>
      <p>press arrows for flips</p>
    </ControlWrapper>
  );
};

const ControlWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: black;
  opacity: 0.5;
  color: white;
  padding: 5px;

  p {
    margin: 5px;
    font-family: monospace;
    font-size: 12px;
    letter-spacing: 0.75px;
  }
`;

export default ControlDesc;
