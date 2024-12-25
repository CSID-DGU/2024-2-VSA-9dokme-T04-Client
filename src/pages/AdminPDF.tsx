import React, { useState } from "react";
import { Modal, Button } from "antd";
import styled from "styled-components";
import BookDetail from "../json/BookDetail.json";
import EditPDFForm from "../components/EditPDFForm";
import AddPDFForm from "../components/AddPDFFrom";
import { BookDetailType } from "../json/BookDetailType";
import AdminBanner from "../components/AdminBanner";

const AdminPDF: React.FC = () => {
  const [books, setBooks] = useState<BookDetailType[]>(BookDetail.books);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDetailType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Calculate the indices for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleDelete = async (bookId: number) => {
    if (window.confirm("정말로 이 책을 삭제하시겠습니까?")) {
      try {
        // Simulated API call
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.bookId !== bookId)
        );
        alert("책이 성공적으로 삭제되었습니다.");
      } catch (error) {
        alert("책 삭제에 실패하였습니다.");
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (book: BookDetailType) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBook(null);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Root>
      <Container>
        <AdminBanner />
        <Title>PDF 관리 페이지</Title>

        <ButtonContainer>
          <AddButton onClick={handleOpenAddModal}>새로운 PDF 추가하기</AddButton>
        </ButtonContainer>

        <Table>
          <thead>
            <TableRow>
              <TableHeader>책 제목</TableHeader>
              <TableHeader>저자</TableHeader>
              <TableHeader>수정</TableHeader>
              <TableHeader>삭제</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <TableRow key={book.bookId}>
                <TableCell>{book.bookTitle}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <button onClick={() => handleOpenEditModal(book)}>수정</button>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(book.bookId)}>삭제</button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {Array.from(
            { length: Math.ceil(books.length / booksPerPage) },
            (_, index) => (
              <PaginationButton
                key={index + 1}
                onClick={() => paginate(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </PaginationButton>
            )
          )}
        </Pagination>

        <Modal
          title="PDF 추가하기"
          open={isAddModalOpen}
          onCancel={handleCloseAddModal}
          footer={null}
        >
          <AddPDFForm onClose={handleCloseAddModal} />
        </Modal>

        <Modal
          title="PDF 수정하기"
          open={isEditModalOpen}
          onCancel={handleCloseEditModal}
          footer={null}
        >
          {selectedBook && (
            <EditPDFForm book={selectedBook} onClose={handleCloseEditModal} />
          )}
        </Modal>
      </Container>
    </Root>
  );
};

const AddButton = styled(Button)`
  right: 10%;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Root = styled.div`
  padding-top: 20vh;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`
  width: 80%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 16px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f4f4f4;
  font-weight: bold;
  text-align: left;
`;

const TableRow = styled.tr`
  background-color: white;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#aa84c9;" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #ddd;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e6f7ff;
  }
`;

export default AdminPDF;
