import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Sidebanner from "../components/Sidebanner";
import { Divider, message } from "antd";
import { PRIMARY } from "../utils/colors";
import { BASE_URL } from "../env";

// 책 상세 정보를 위한 인터페이스 정의
interface BookDetailType {
  bookId: number;
  pdfImage: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  description: string;
  lastPage: number;
  marked: boolean;
}

const BookDetail = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookDetailType | null>(null);
  const [memberId] = useState<number>(1);

  const fetchBookDetail = async (bookId: string) => {
    try {
      const response = await axios.get<BookDetailType>(
        `${BASE_URL}/api/books`,
        {
          params: { id: bookId, memberId: memberId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching book details:", error);
      message.error("책 정보를 불러오는데 실패했습니다.");
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!bookId) return;

      try {
        const bookData = await fetchBookDetail(bookId);
        setBook(bookData);
        console.log("bookData: ", bookData);
      } catch (error) {}
    };

    fetchData();
  }, [bookId]);

  const handleBookmarkBtn = async () => {
    try {
      console.log(bookId);
      await axios.post(
        `${BASE_URL}/api/bookmark?BookId=${bookId}&memberId=${memberId}`
      );
      message.success("북마크에 추가되었습니다!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error bookmarking the book:", error);
      message.error("이미 북마크에 등록되었습니다.");
    }
  };

  const handleDeleteBookmark = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/bookmark?bookId=${bookId}&memberId=${memberId}`
      );

      if (response.status === 200) {
        message.success("북마크가 취소되었습니다 :)");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      message.error("오류가 발생했습니다.");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <Root>
      <Sidebanner />
      <Container>
        <BookImage src={book.pdfImage} alt={`Cover of ${book.title}`} />
        <ContentContainer>
          <div>
            <BookTypo>{book.title}</BookTypo>
            <TagBtn>{book.category}</TagBtn>
            <ContentTypo>{book.description}</ContentTypo>
          </div>
          <Divider style={{ borderColor: "#cacaca" }} />
          <ButtonContainer>
            <GradientButton
              onClick={() => navigate(`/view/${bookId}`, { state: { book } })}
            >
              PDF 보러가기
            </GradientButton>
            {!book.marked ? (
              <GradientButton onClick={() => handleBookmarkBtn()}>
                책갈피에 추가하기
              </GradientButton>
            ) : (
              <GreyButton
                className="bg-grey"
                onClick={() => handleDeleteBookmark()}
              >
                책갈피 취소하기
              </GreyButton>
            )}
          </ButtonContainer>
        </ContentContainer>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY.LiGHT};
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-top: 80px;
  margin-bottom: 80px;
`;

const BookImage = styled.img`
  margin: 2vw;
  width: 15vw;
  border-radius: 8px;
  align-self: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const BookContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookTypo = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const ContentTypo = styled.div`
  font-size: 15px;
`;

const ContentContainer = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 40px;
  background-color: white;
  height: 500px;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const GradientButton = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc); /* 그라데이션 효과 */
  width: 45%;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s;

  &:hover {
  }

  &:active {
  }
`;

const GreyButton = styled.button`
  background: #d9d9d9;
  width: 45%;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s;

  &:hover {
  }

  &:active {
  }
`;
const TagBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 1vw;
  width: auto;
  height: 1.2vw;
  border-radius: 3vw;
  border-style: solid;
  border-width: 1px;
  border-color: ${PRIMARY.DEFAULT};
  color: ${PRIMARY.DEFAULT};
  padding: 0.6vw;
  font-size: 0.8vw;
  background-color: white;
  margin: 1vw 1vw 1vw 0vw;
`;
export default BookDetail;
