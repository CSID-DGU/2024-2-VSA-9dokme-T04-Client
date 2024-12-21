import { Input } from "antd";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Props {
  onBack: () => void;
}

const EditProfile: React.FC<Props> = ({ onBack }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // 모달 열릴 때 애니메이션 시작
    return () => setIsOpen(false); // 모달 닫힐 때 애니메이션 종료
  }, []);

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <Title>유저정보 수정하기</Title>
          <CloseButton onClick={onBack}>x</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Label>유저이름</Label>
            <StyledInput type="text" />

            <Label>이메일</Label>
            <StyledInput type="text" />

            <Label>만료일자</Label>
            <StyledInput type="text" />
          </Form>
        </ModalBody>
        <ModalFooter>
          <ActionButton primary>수정 완료하기</ActionButton>
          <ActionButton onClick={onBack}>수정 취소하기</ActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};

export default EditProfile;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const ModalWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: 33vw;
  z-index: 50;
  width: 35vw;
  background-color: white;
  border-radius: 1vw;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-20px)")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const ModalContent = styled.div`
  padding: 2vw;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vw;
`;

const Title = styled.div`
  font-size: 1.2vw;
  font-weight: bold;
`;

const CloseButton = styled.button`
  font-size: 1.2vw;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0.5vw;
  border-radius: 0.5vw;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ModalBody = styled.div`
width: 100%;
  display: grid;
`;

const Label = styled.label`
  font-size: 1.2vw;
`;

const StyledInput = styled(Input)`
  margin : 10px 0;
  font-size: 1vw;
  border: 1px solid #ccc;
  border-radius: 0.5vw;
`;

const ModalFooter = styled.div`
  margin-top: 4vw;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  width: 48%;
  padding: 1vw;
  font-size: 1vw;
  font-weight: bold;
  border: none;
  border-radius: 0.5vw;
  background-color: ${({ primary }) => (primary ? "#2519b2" : "#e0e0e0")};
  color: ${({ primary }) => (primary ? "white" : "black")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#4d3bd9" : "#d6d6d6")};
  }
`;
