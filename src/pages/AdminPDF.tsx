import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { Input, Modal, Button } from "antd";
import styled from "styled-components";
import BookDetail from "../json/BookDetail.json";
import EditPDFForm from "../components/EditPDFForm";
import AddPDFForm from "../components/AddPDFFrom";
import { BookDetailType } from "../json/BookDetailType";
import AdminBanner from "../components/AdminBanner";

const AdminPDF: React.FC = () => {
  const [books, setBooks] = useState<BookDetailType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDetailType | null>(null);

  // Fetch book data
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await API.get("/admin/books");
  //       setBooks(response.data);
  //     } catch (error) {
  //       console.error("Error fetching books:", error);
  //     }
  //   };
  //   fetchBooks();
  // }, []);

  // Handle delete action
  const handleDelete = async (bookId: number) => {
    if (window.confirm("정말로 이 책을 삭제하시겠습니까?")) {
      try {
        await API.delete(`/admin/books/${bookId}`);
        alert("책이 성공적으로 삭제되었습니다.");
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.bookId !== bookId)
        );
      } catch (error) {
        alert("책 삭제에 실패하였습니다.");
        console.error("Error deleting book:", error);
      }
    }
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (book: BookDetailType) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  // Close modals
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBook(null);
  };

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
            {BookDetail.books.map((book) => (
              <TableRow key={book.bookId}>
                <TableCell>{book.bookTitle}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <button onClick={() => handleOpenEditModal(book)}>
                    수정
                  </button>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(book.bookId)}>
                    삭제
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        {/* Add Modal */}
        <Modal
          title='PDF 추가하기'
          open={isAddModalOpen}
          onCancel={handleCloseAddModal}
          footer={null}
        >
          <AddPDFForm onClose={handleCloseAddModal} />
        </Modal>

        {/* Edit Modal */}
        <Modal
          title='PDF 수정하기'
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

export default AdminPDF;
