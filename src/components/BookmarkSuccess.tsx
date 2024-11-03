import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ParameterProps {
  isOpen: boolean;
  handleModalClose: () => void;
  bookId: string | undefined;
}

const BookmarkSuccess: React.FC<ParameterProps> = ({
  isOpen,
  handleModalClose,
  bookId,
}) => {
  const [modalSize, setModalSize] = useState({ width: "37vw", height: "30vh" });

  const updateModalSize = () => {
    // 화면 너비의 37%를 기준으로 세로 크기 계산 (4:3 비율 유지를 위해)
    const width = window.innerWidth * 0.37;
    const height = (width / 4) * 3;
    setModalSize({ width: `${width}px`, height: `${height}px` });
  };

  useEffect(() => {
    window.addEventListener("resize", updateModalSize);
    updateModalSize(); // 컴포넌트 마운트 시 초기 크기 설정

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateModalSize);
    };
  }, []);

  return (
    <Modal
      style={{
        display: isOpen ? "grid" : "none",
        width: modalSize.width,
        height: modalSize.height,
      }}
    >
      <Top>
        <span>북마크 추가 완료</span>
      </Top>
      <Body>
        <div
          style={{
            textAlign: "center",
            margin: "4vw 0vw 5vw 0vw",
            fontSize: "1.5vw",
          }}
        >
          북마크 추가가 완료되었습니다.😊
        </div>
        <RegisterBtn onClick={() => handleModalClose()}>확인</RegisterBtn>
      </Body>
    </Modal>
  );
};

const Modal = styled.div`
  margin-top: 15vw;
  margin-left: 30vw;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: grid;
  grid-template-rows: 3fr 17fr;
  z-index: 1000;
  width: 37vw;
  height: 30vh;
  position: absolute;
  top: 0%;
  left: 0%;
  background-color: white;
  border-radius: 10px;
`;

const Top = styled.div`
  border-radius: 10px 10px 0px 0px;
  background-color: rgba(148, 182, 239, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 0px 10px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 10px 10px;
`;

const RegisterBtn = styled.button`
  font-size: 1.5vw;
  color: white;
  margin: 5% 0% 10% 0%;
  width: 70%;
  height: 15%;
  border-style: none;
  font-weight: bold;
  background-color: #2519b2;
  border-radius: 3px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export default BookmarkSuccess;
