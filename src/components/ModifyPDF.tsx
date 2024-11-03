import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import API from "../api/axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 60vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

// 타입 정의
interface EditPDFModalProps {
  bookId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  publishDate: string;
  author: string;
  publisher: string;
  category: string;
  description: string;
  bookImage: string;
  bookURL: string;
  bookChapter: number;
  bookFullPage: number;
  rent: number;
}

const EditPDFModal: React.FC<EditPDFModalProps> = ({
  bookId,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    publishDate: "",
    author: "",
    publisher: "",
    category: "",
    description: "",
    bookImage: "",
    bookURL: "",
    bookChapter: 0,
    bookFullPage: 0,
    rent: 0,
  });

  useEffect(() => {
    if (bookId && isOpen) {
      // API 요청으로 PDF 상세 정보 가져오기
      const fetchBookDetails = async () => {
        try {
          const response = await API.get(`/api/books`, {
            params: { id: bookId },
          });
          const bookDetails = response.data;

          // formData 상태를 가져온 데이터로 업데이트 (PDF 수정하기니까 기존내용 렌더링)
          setFormData({
            title: bookDetails.title,
            publishDate: bookDetails.publishDate,
            author: bookDetails.author,
            publisher: bookDetails.publisher,
            category: bookDetails.category,
            description: bookDetails.description,
            bookImage: bookDetails.pdfImage,
            bookURL: "", // bookURL은 상세 정보에 없다면 빈 문자열로 초기화
            bookChapter: bookDetails.lastPage, // 예시로 lastPage를 chapter로 사용
            bookFullPage: bookDetails.lastPage, // 전체 페이지 수가 lastPage라 가정
            rent: bookDetails.marked ? 1 : 0, // marked가 true면 1, false면 0
          });
        } catch (error) {
          console.error("PDF 상세 정보 조회 실패:", error);
        }
      };

      fetchBookDetails();
    }
  }, [bookId, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.put(`/admin/books/${bookId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("PDF 수정에 성공하였습니다.");
      console.log("PDF 수정 성공:", response.data);
      onClose();
    } catch (error) {
      alert("PDF 수정에 실패하였습니다.");
      console.error("PDF 수정 실패:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>PDF 수정</h2>
        <form onSubmit={handleSubmit}>
          <Label>제목</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <Label>출판일</Label>
          <Input
            type="datetime-local"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
          />

          <Label>저자</Label>
          <Input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />

          <Label>출판사</Label>
          <Input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />

          <Label>카테고리</Label>
          <Input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <Label>설명</Label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <Label>책 이미지</Label>
          <Input
            type="text"
            name="bookImage"
            value={formData.bookImage}
            onChange={handleChange}
          />

          <Label>책 URL</Label>
          <Input
            type="text"
            name="bookURL"
            value={formData.bookURL}
            onChange={handleChange}
          />

          <Label>챕터 수</Label>
          <Input
            type="number"
            name="bookChapter"
            value={formData.bookChapter}
            onChange={handleChange}
          />

          <Label>전체 페이지 수</Label>
          <Input
            type="number"
            name="bookFullPage"
            value={formData.bookFullPage}
            onChange={handleChange}
          />

          <Label>렌트 가능</Label>
          <Input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
          />

          <SubmitButton type="submit">수정하기</SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditPDFModal;
