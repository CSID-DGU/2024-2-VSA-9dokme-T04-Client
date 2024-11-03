import React, { useState } from "react";
import styled from "styled-components";
import BookDetail from "../json/BookDetail.json";
import { BookDetailType } from "../json/BookDetailType";
import ModifyPDF from "./ModifyPDF";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/table";

const PDFEdit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const handleOpenModal = (bookId: number) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  return (
    <Box>
      <Table className="bg-white m-[3vw]">
        <TableHeader>
          <TableRow className="bg-[#D8E7FF]">
            <TableHead className="w-[30vw]">책 제목</TableHead>
            <TableHead className="w-[20vw]">저자</TableHead>
            <TableHead className="w-[13vw]">등록일</TableHead>
            <TableHead className="w-[7vw]">선택</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BookDetail.books.map((book: BookDetailType) => (
            <TableRow key={book.bookId} className="text-left">
              <TableCell className="font-medium">{book.bookTitle}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.publishDate}</TableCell>
              <TableCell>
                <button
                  className="bg-slate-400 text-[0.8vw] text-white px-[0.5vw] rounded hover:bg-customColor3"
                  onClick={() => handleOpenModal(book.bookId)}
                >
                  수정
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isModalOpen && selectedBookId !== null && (
        <ModifyPDF
          bookId={selectedBookId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
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

export default PDFEdit;
