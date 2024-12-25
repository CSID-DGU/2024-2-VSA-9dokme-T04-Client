import React, { useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
import { BASE_URL } from "../env";
import { Button, Input } from "antd";

interface Post {
  questionId: number;
  title: string;
  content: string;
  commentCount: number;
  chapter: string;
  createdAt: string;
}

interface Props {
  onBack: () => void;
  bookId: number;
  userEmail: string;
}

const CreatePost: React.FC<Props> = ({ onBack, bookId, userEmail }) => {
  const [title, setTitle] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const memberId = localStorage.getItem("memberId");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const payload = {
        userEmail: userEmail || "",
        bookChapter: chapter ? parseInt(chapter, 10) : 0,
        bookPage: page ? parseInt(page, 10) : 0,
        title: title,
        content: content,
      };

      const response = await API.post(
        `${BASE_URL}/api/community/question/${bookId}?memberId=${memberId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("질문이 성공적으로 등록되었습니다.");
        onBack();
      }
    } catch (error) {
      console.error("Error posting the question:", error);
      alert("질문 등록에 실패했습니다.");
    }
  };

  return (
    <ModalContainer>
      <Header>
        <BackButton onClick={onBack}>← 뒤로가기</BackButton>
      </Header>

      <Form>
        <FormLabel>제목</FormLabel>
        <StyledInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormLabel>챕터</FormLabel>
        <StyledInput
          type="number"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />

        <FormLabel>페이지</FormLabel>
        <StyledInput
          type="number"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />

        <FormLabel>글내용</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form>

      <ButtonContainer>
        <WriteButton onClick={handleSubmit}>글 등록하기</WriteButton>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default CreatePost;

const WriteButton = styled(Button)`
  width: 100%;
  height: 5vh;
  font-size: 1.1vw;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;
  height: 100vh;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #ad7ed1;

  &:hover {
    text-decoration: underline;
  }
`;
const Title = styled.h2`
  font-size: 1.5vw;
  font-weight: bold;
  color: #333;
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 1vw 1.5vw;
  margin-bottom: 2vw;
`;

const FormLabel = styled.label`
  font-size: 1vw;
  color: #555;
  font-weight: bold;
`;

const StyledInput = styled(Input)`
  padding: 0.8vw;
`;

const Textarea = styled(Input)`
  height: 10vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  width: 48%;
  padding: 1vw;
  font-size: 1vw;
  font-weight: bold;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  width: 48%;
  padding: 1vw;
  font-size: 1vw;
  font-weight: bold;
  color: #333;
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d6d6d6;
  }
`;
