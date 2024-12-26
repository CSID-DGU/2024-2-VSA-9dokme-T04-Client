import React, { useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
import { Button, Input, Select } from "antd";
import { BASE_URL } from "../env";
import axios from "axios";

interface AddPDFFormProps {
  onClose: () => void;
}

const AddPDFForm: React.FC<AddPDFFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [publishDate, setPublishDate] = useState<string>(
    new Date().toISOString()
  );
  const [author, setAuthor] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [bookPDF, setBookPDF] = useState<File | null>(null);
  const [bookChapter, setBookChapter] = useState<number>(0);
  const [bookFullPage, setBookFullPage] = useState<number>(0);
  const [rent, setRent] = useState<number>(0);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setBookImage(event.target.files[0]);
    }
  };

  const handlePDFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setBookPDF(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !author || !publisher || !category || !description || !bookImage || !bookPDF) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishDate", publishDate);
    formData.append("author", author);
    formData.append("publisher", publisher);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("bookImage", bookImage);
    formData.append("bookPDF", bookPDF);
    formData.append("bookChapter", bookChapter.toString());
    formData.append("bookFullPage", bookFullPage.toString());
    formData.append("rent", rent.toString());

    try {
      const token = localStorage.getItem("token");
    
      const response = await axios.post(`${BASE_URL}/admin/books`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    
      if (response.status === 200) {
        alert("PDF와 이미지가 성공적으로 등록되었습니다.");
        onClose();
      }
    } catch (error) {
      console.error("Error uploading PDF or image:", error);
      alert("등록에 실패했습니다.");
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
          <Tag>출판사</Tag>
          <StyledInput
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </LineContainer>
        <LineContainer>
          <Tag>카테고리</Tag>
          <StyledSelect
            value={category}
            onChange={(value) => setCategory(String(value))}
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
          <Tag>이미지</Tag>
          <StyledInput
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
          />
        </LineContainer>
        <LineContainer>
          <Tag>PDF 파일</Tag>
          <StyledInput
            type="file"
            accept=".pdf"
            onChange={handlePDFChange}
          />
        </LineContainer>
        <LineContainer>
          <Tag>챕터 수</Tag>
          <StyledInput
            type="number"
            value={bookChapter}
            onChange={(e) => setBookChapter(Number(e.target.value))}
          />
        </LineContainer>
        <LineContainer>
          <Tag>총 페이지</Tag>
          <StyledInput
            type="number"
            value={bookFullPage}
            onChange={(e) => setBookFullPage(Number(e.target.value))}
          />
        </LineContainer>
        <LineContainer>
          <Tag>대여 여부</Tag>
          <StyledSelect
            value={rent.toString()}
            onChange={(value) => setRent(Number(value))}
          >
            <Select.Option value="0">불가능</Select.Option>
            <Select.Option value="1">가능</Select.Option>
          </StyledSelect>
        </LineContainer>
        <SubmitButtonContainer>
          <SubmitButton onClick={handleSubmit}>PDF 등록하기</SubmitButton>
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
  height: 40px;
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

export default AddPDFForm;
