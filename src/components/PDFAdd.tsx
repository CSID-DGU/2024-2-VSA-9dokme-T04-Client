import React, { useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const PDFAdd: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [publishDate, setPublishDate] = useState<string>(
    new Date().toISOString()
  );
  const [author, setAuthor] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [bookURL, setBookURL] = useState<string>("");
  const [bookChapter, setBookChapter] = useState<number>(0);
  const [bookFullPage, setBookFullPage] = useState<number>(0);
  const [rent, setRent] = useState<number>(0);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setBookImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !title ||
      !author ||
      !publisher ||
      !category ||
      !description ||
      !bookURL
    ) {
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
    if (bookImage) {
      formData.append("bookImage", bookImage);
    }
    formData.append("bookURL", bookURL);
    formData.append("bookChapter", bookChapter.toString());
    formData.append("bookFullPage", bookFullPage.toString());
    formData.append("rent", rent.toString());

    try {
      const response = await API.post("/admin/books", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("PDF가 성공적으로 등록되었습니다.");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("PDF 등록에 실패했습니다.");
    }
  };
  

  return (
    <Box>
      <FormContainer onSubmit={handleSubmit}>
        <div className="grid grid-cols-[1fr_8fr] gap-x-[1vw] gap-y-[1.5vw]">
          <Tag className="text-[1.2vw]">교재 이름</Tag>
          <StyledInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Tag className="text-[1.2vw]">출판일</Tag>
          <StyledInput
            type="text"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />

          <Tag className="text-[1.2vw]">저자</Tag>
          <StyledInput
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <Tag className="text-[1.2vw]">출판사</Tag>
          <StyledInput
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />

          <Tag className="text-[1.2vw]">카테고리</Tag>
          <StyledSelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리 선택</option>
            <option value="science">과학</option>
            <option value="nature">자연</option>
            <option value="art">예술</option>
            <option value="humanities">인문/사회</option>
            <option value="sports">체육</option>
            <option value="business">경영/경제</option>
          </StyledSelect>

          <Tag className="text-[1.2vw]">교재 설명</Tag>
          <StyledText
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Tag className="text-[1.2vw]">표지 이미지</Tag>
          <StyledInput
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
          />

          <Tag className="text-[1.2vw]">PDF URL</Tag>
          <StyledInput
            value={bookURL}
            onChange={(e) => setBookURL(e.target.value)}
          />

          <Tag className="text-[1.2vw]">챕터 수</Tag>
          <StyledInput
            type="number"
            value={bookChapter}
            onChange={(e) => setBookChapter(Number(e.target.value))}
          />

          <Tag className="text-[1.2vw]">전체 페이지 수</Tag>
          <StyledInput
            type="number"
            value={bookFullPage}
            onChange={(e) => setBookFullPage(Number(e.target.value))}
          />

          <Tag className="text-[1.2vw]">대여 여부</Tag>
          <StyledSelect
            value={rent}
            onChange={(e) => setRent(Number(e.target.value))}
          >
            <option value={0}>불가능</option>
            <option value={1}>가능</option>
          </StyledSelect>
        </div>
        <AddPdfBtn type="submit">PDF 등록하기</AddPdfBtn>
      </FormContainer>
    </Box>
  );
};

const Box = styled.div`
  width: 75vw;
  height: 35vw;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: rgba(197, 181, 247, 0.4);
  border-top: none;
  overflow: hidden; /* Ensure that the content stays inside */
`;

const FormContainer = styled.form`
  width: 100%;
  padding: 2vw;
  max-height: 100%; /* Ensure the form does not exceed the height of the Box */
  overflow-y: auto; /* Add vertical scrolling if content overflows */
`;

const StyledInput = styled(Input)`
`;

const StyledText = styled(TextArea)`
`

const StyledSelect = styled.select`
  border-radius: 0.2vw;
  padding: 0.5vw;
  font-size: 1vw;
`;

const Tag = styled.div`
  width: auto;
  height: 2vw;
  border-style: none;
  border-radius: 0.5vw;
  background-color: #d8e7ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddPdfBtn = styled.button`
  margin-top: 2vw;
  width: 65vw;
  height: 3vw;
  background-color: #2519b2;
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 0.3vw;
  font-size: 1.2vw;
`;

export default PDFAdd;
