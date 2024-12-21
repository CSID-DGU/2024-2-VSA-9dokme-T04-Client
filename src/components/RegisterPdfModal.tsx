import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ParameterProps {
  handleModalClose: () => void;
  isExisted: boolean; // 부모 컴포넌트에서 전달받는 상태
}

const RegisterPdfModal: React.FC<ParameterProps> = ({
  handleModalClose,
  isExisted,
}) => {
  const [modalSize, setModalSize] = useState({ width: "37vw", height: "30vh" });

  const updateModalSize = () => {
    const width = window.innerWidth * 0.37;
    const height = (width / 4) * 3;
    setModalSize({ width: `${width}px`, height: `${height}px` });
  };

  useEffect(() => {
    const debouncedResize = () => {
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(updateModalSize, 100);
    };
    window.addEventListener("resize", debouncedResize);
    updateModalSize();

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return (
    <Modal style={{ width: modalSize.width, height: modalSize.height }}>
      <ModalHeader>
        <span>9DOKME 바코드 교재 검색 서비스</span>
        <CloseButton onClick={handleModalClose}>×</CloseButton>
      </ModalHeader>
      <ModalBody>
        <Message>
          {isExisted ? (
            <p>
              이미 등록되어있는 교재입니다. <br />
              📚교재 이름: AI 시대의 컴퓨터 개론
              <br />
              🔖출판사: 인피니티북스
              <br />
              📅출판 년도: 2019년
            </p>
          ) : (
            <p>
              아직 등록되지 않은 교재입니다.
              <br />
              9DOKME에 교재 등록 요청을 보낼까요?
              <div className="text-left rounded shadow-lg bg-gray-200 p-2">
                📚교재 이름: AI 시대의 컴퓨터 개론
                <br />
                🔖출판사: 인피니티북스
                <br />
                📅출판 년도: 2019년
              </div>
            </p>
          )}
        </Message>
      </ModalBody>
      <ModalFooter>
        {isExisted ? (
          <RegisterButton
            onClick={() => {
              window.location.href = "/bookdetail/3";
            }}
          >
            해당 PDF 조회하기
          </RegisterButton>
        ) : (
          <RegisterButton onClick={handleModalClose}>
            등록 요청 보내기
          </RegisterButton>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default RegisterPdfModal;

// 스타일 정의
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: auto;
  max-height: 80vh;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(148, 182, 239, 0.2);
  border-radius: 10px 10px 0 0;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const ModalBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Message = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-size: 1.5vw;
`;

const RegisterButton = styled.button`
  font-size: 1.2vw;
  color: white;
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  font-weight: bold;
  background-color: #2519b2;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    background-color: #1f158d;
  }
`;
