import React, { useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
import { Button, Input, Select } from "antd";
import { BookDetailType } from "../json/BookDetailType";

interface EditPDFFormProps {
  book: BookDetailType;
  onClose: () => void;
}

const EditPDFForm: React.FC<EditPDFFormProps> = ({ book, onClose }) => {
  const [title, setTitle] = useState<string>(book.bookTitle);
  const [publishDate, setPublishDate] = useState<string>(book.publishDate);
  const [author, setAuthor] = useState<string>(book.author);
  const [bookCategory, setBookCategory] = useState<string>(book.bookCategory);
  const [bookImage, setBookImage] = useState<string>(book.bookImage);
  const [description, setDescription] = useState<string>(book.description);
  const [bookURL, setBookURL] = useState<string>(book.bookURL);
  const [isMarked, setIsMarked] = useState<boolean>(book.isMarked);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !author || !description || !bookURL) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    try {
      await API.put(`/admin/books/${book.bookId}`, {
        bookId: book.bookId,
        publishDate,
        bookTitle: title,
        bookCategory,
        bookImage,
        bookURL,
        author,
        description,
        isMarked,
      });
      alert("PDF가 성공적으로 수정되었습니다.");
      onClose();
    } catch (error) {
      console.error("Error updating PDF:", error);
      alert("PDF 수정에 실패했습니다.");
    }
  };

  return (
    <Root>
      <FormContainer onSubmit={handleSubmit}>
        <LineContainer>
          <Tag>교재 이름</Tag>
          <StyledInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </LineContainer>
        <LineContainer>
          <Tag>출판일</Tag>
          <StyledInput
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </LineContainer>
        <LineContainer>
          <Tag>저자</Tag>
          <StyledInput
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </LineContainer>
        <LineContainer>
          <Tag>카테고리</Tag>
          <StyledSelect
            value={bookCategory}
            onChange={(value) => setBookCategory(String(value))}
          >
            <Select.Option value="">카테고리 선택</Select.Option>
            <Select.Option value="science">과학</Select.Option>
            <Select.Option value="nature">자연</Select.Option>
            <Select.Option value="art">예술</Select.Option>
            <Select.Option value="humanities">인문/사회</Select.Option>
            <Select.Option value="sports">체육</Select.Option>
            <Select.Option value="business">경영/경제</Select.Option>
          </StyledSelect>
        </LineContainer>
        <LineContainer>
          <Tag>교재 설명</Tag>
          <StyledText
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </LineContainer>
        <LineContainer>
          <Tag>PDF URL</Tag>
          <StyledInput
            value={bookURL}
            onChange={(e) => setBookURL(e.target.value)}
          />
        </LineContainer>
        <LineContainer>
          <Tag>표지 이미지</Tag>
          <StyledInput
            value={bookImage}
            onChange={(e) => setBookImage(e.target.value)}
          />
        </LineContainer>
        <LineContainer>
          <Tag>마크 여부</Tag>
          <StyledSelect
            value={isMarked ? "true" : "false"}
            onChange={(value) => setIsMarked(value === "true")}
          >
            <Select.Option value="false">아니오</Select.Option>
            <Select.Option value="true">예</Select.Option>
          </StyledSelect>
        </LineContainer>
        <SubmitButtonContainer>
          <SubmitButton>PDF 수정하기</SubmitButton>
        </SubmitButtonContainer>
      </FormContainer>
    </Root>
  );
};

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SubmitButton = styled(Button)`
  width: 200px;
`;

const LineContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Root = styled.div``;
const FormContainer = styled.form`
  padding: 2vw;
  overflow-y: auto;
`;

const StyledInput = styled(Input)`
  width: 80%;
  margin-left: 3px;
`;

const StyledText = styled(Input)`
  width: 80%;
  margin-left: 3px;
`;

const StyledSelect = styled(Select)`
  width: 80%;
  margin-left: 3px;
  height: 40px;
`;

const Tag = styled.div`
  width: 4vw;
  height: 2vw;
  border-radius: 0.5vw;
  display: flex;
  align-items: center;
  font-size: 0.7vw;
  font-weight: bold;
`;

export default EditPDFForm;
