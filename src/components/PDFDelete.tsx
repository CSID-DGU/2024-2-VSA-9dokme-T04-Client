import React, { useState } from "react";
import styled from "styled-components";
import BookDetail from "../json/BookDetail.json";
import { BookDetailType } from "../json/BookDetailType";
import API from "../api/axios"; // API 호출을 위한 axios 인스턴스

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/table";

const PDFDelete: React.FC = () => {
  const [books, setBooks] = useState<BookDetailType[]>(BookDetail.books);
  const [memberId] = useState<number>(1);
  const handleDelete = async (bookId: number) => {
    if (window.confirm("정말로 이 책을 삭제하시겠습니까?")) {
      try {
        await API.delete(`/admin/books/${bookId}`, {});
        alert("책이 성공적으로 삭제되었습니다.");

        // 삭제된 책을 books 상태에서 제거
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.bookId !== bookId)
        );
      } catch (error) {
        alert("책 삭제에 실패하였습니다.");
        console.error("삭제 실패:", error);
      }
    }
  };

  return (
    <Box>
      <Table className="bg-white m-[3vw]">
        <TableHeader>
          <TableRow className="bg-[#D8E7FF]">
            <TableHead className="w-[30vw]">책 제목</TableHead>
            <TableHead className="w-[20vw]">저자</TableHead>
            <TableHead className="w-[7vw]">선택</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: BookDetailType) => (
            <TableRow key={book.bookId} className="text-left">
              <TableCell className="font-medium">{book.bookTitle}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                <button
                  className="bg-slate-400 text-[0.8vw] text-white px-[0.5vw] rounded hover:bg-[#FF7E7E]"
                  onClick={() => handleDelete(book.bookId)}
                >
                  삭제
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

const Box = styled.div`
  width: 75vw;
  height: auto;
  border: 0.2vw solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: transparent;
  background-color: rgba(197, 181, 247, 0.4);
  border-top: none;
  overflow-x: auto;
`;

export default PDFDelete;
