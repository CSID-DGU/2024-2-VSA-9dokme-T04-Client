import React from "react";
import styled from "styled-components";
import onBookmark from "../images/onBookmark.png";
import offBookmark from "../images/offBookmark.png";
import defaultCover from "../images/bookcover.png";
import API from "../api/axios";
import { BASE_URL } from "../env";

interface BookCardProps {
  bookId: number;
  cover: string; // 이미지 URL
  title: string; // 책 제목
  onClick: () => void; // 클릭 이벤트 핸들러
  isMarked: boolean; // 즐겨찾기 상태
}

const memberId = localStorage.getItem("memberId");

const BookCard: React.FC<BookCardProps> = ({
  bookId,
  cover,
  title,
  onClick,
  isMarked,
}) => {
  const coverSrc = cover ? cover : defaultCover;

  const addBookmark = async () => {
    try {
      const response = await API.post(`/bookmark`, null, {
        params: {
          bookId: bookId,
          memberId: memberId,
        },
      });
      if (response.status === 200 && response.data.isMarked) {
        console.log("Bookmark added successfully");
        alert(`[${title}] 도서가 북마크에 성공적으로 추가되었습니다:)`);
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      alert(`[${title}] 도서가 북마크에서 삭제되었습니다.`);
    }
  };

  const deleteBookmark = async () => {
    try {
      const response = await API.delete(`/bookmark`, {
        data: {
          bookId: bookId,
        },
      });
      if (response.status === 200 && !response.data.isMarked) {
        console.log("Bookmark deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <Root>
      <BookmarkIcon
        src={isMarked ? onBookmark : offBookmark}
        alt="Bookmark Icon"
        onClick={isMarked ? deleteBookmark : addBookmark}
      />
      <CardContainer onClick={onClick}>
        <CoverImageWrapper>
          <CoverImage alt={title} src={`${BASE_URL}/files${cover}`} />
        </CoverImageWrapper>
        <Title>{title.length > 15 ? `${title.slice(0, 15)}...` : title}</Title>
      </CardContainer>
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  margin: 20px;
`;

const BookmarkIcon = styled.img`
  position: absolute;
  top: -7px;
  right: 2px;
  width: 2vw;
  height: 2vw;
  cursor: pointer;
  z-index: 1;
`;

const CoverImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 150%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
`;

const CoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.div`
  padding: 12px;
  text-align: center;
  font-size: 1vw;
  font-weight: bold;
  color: #333;
`;

const CardContainer = styled.div`
  width: 12vw;
  height: 17vw;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-bottom: 20px;
  overflow: visible;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export default BookCard;
