import React, { useState } from "react";
import styled from "styled-components";
const Teacher = "/images/Teacher.png";
const back = "/images/back.png";

interface Book {
  bookId: number;
  bookTitle: string;
  author: string;
  bookCategory: string;
  bookURL: string;
}

interface CommunityModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

const QuesitonModal: React.FC<CommunityModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <div>
          <button onClick={onClose} className="close-button">
            <img src={back} alt="Close" />
          </button>
        </div>
        <div className="modal-body">
          <img src={Teacher} alt="Teacher" />
          <h1>{book.bookTitle}</h1>
          <p>{book.author}</p>
          <p>{book.bookCategory}</p>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;

  .modal-body {
    text-align: center;
  }

  img {
    width: 100px;
    height: 100px;
  }

  h1 {
    margin: 20px 0;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export default QuesitonModal;
