import styled from '@emotion/styled';

const ProjectModal = ({ setModalOpen, content }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ProjectModalContainer>
      <button onClick={closeModal}>
        <p>준비중입니다.</p>
      </button>
    </ProjectModalContainer>
  );
};

const ProjectModalContainer = styled.div`
  button p {
    color: black;
  }
  /* 모달창 크기 */
  /* width: 300px;
  height: 200px; */

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  border-radius: 8px;
`;

export default ProjectModal;
