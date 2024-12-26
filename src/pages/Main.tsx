import { useState, useEffect } from "react";
import SlidingBanner from "../components/SlidingBanner";
import Hashtag from "../components/Hashtag";
import { useNavigate } from "react-router-dom";
import book1 from "../images/books/book1.png";
import book2 from "../images/books/book2.png";
import book3 from "../images/books/book3.png";
import book4 from "../images/books/book4.png";
import book5 from "../images/books/book5.png";
import book6 from "../images/books/book6.png";
import book7 from "../images/books/book7.png";
import Sidebanner from "../components/Sidebanner";
import { PRIMARY } from "../utils/colors";
import { Button, Input } from "antd";
import styled from "styled-components";
import BookCard from "../components/BookCard";
import axios from "axios"; // axios 임포트
import { BASE_URL } from "../env";

const images: { [key: string]: string } = {
  "book1.png": book1,
  "book2.png": book2,
  "book3.png": book3,
  "book4.png": book4,
  "book5.png": book5,
  "book6.png": book6,
  "book7.png": book7,
};

interface MainProps {
  mobileView?: boolean;
}

const Main: React.FC<MainProps> = ({ mobileView }) => {
  const navigate = useNavigate();
  const handleImgClick = (bookId: number) => {
    navigate(`/bookdetail/${bookId}`);
  };

  const [category, setCategory] = useState<string>("전체보기");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterBooks, setFilterBooks] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수
  const memberId = localStorage.getItem("memberId");

  const handleHashBtnClick = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchBtnClick = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/api/mainpage/search`, {
        params: {
          title: searchQuery,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { content, totalPages } = response.data;

      setFilterBooks(content);
      setTotalPages(totalPages);
      console.log(content);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  useEffect(() => {
    handleSearchBtnClick();
  }, [category, page]);

  const goToBarcodeSearch = () => {
    navigate("/barcodefilming");
  };

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Root>
        <Sidebanner />
        <Container>
          <SlidingBanner />
          <BookContainer>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchBtnClick();
              }}
            >
              <SearchContainer>
                <SearchBox
                  placeholder="도서를 검색해보세요!"
                  onChange={handleSearchInputChange}
                />
                <SearchButton onClick={handleSearchBtnClick}>검색</SearchButton>
              </SearchContainer>
            </form>
            <div className="m-3">
              <Hashtag
                onCategoryChange={handleHashBtnClick}
                selectedCategory={category}
              />
            </div>
            <div className="flex justify-center">
              {filterBooks.length === 0 ? (
                <NoneBook>
                  텅!💨💨 등록된 교재가 없습니다.
                  <br />
                  조회하려는 PDF 교재의 실물 바코드를 통해 <br />
                  9DOKME 서비스 등록 요청을 보내보세요!
                  <br />
                  <SubscribeBtn onClick={goToBarcodeSearch}>
                    𝄂𝄀𝄁𝄃𝄂 바코드 교재인식 𝄃𝄂𝄂𝄀𝄁
                  </SubscribeBtn>
                </NoneBook>
              ) : (
                <BooksContainer>
                  <div className="grid grid-cols-4 gap-10 m-4">
                    {filterBooks.map((book) => (
                      <BookCard
                        key={book.bookId}
                        cover={book.bookUrl}
                        title={book.title}
                        onClick={() => handleImgClick(book.bookId)}
                        isMarked={book.isMarked}
                        bookId={book.bookId}
                      />
                    ))}
                  </div>
                  <PaginationContainer>
                    <PaginationButton
                      onClick={goToPreviousPage}
                      disabled={page === 0}
                    >
                      이전
                    </PaginationButton>
                    <CurrentPage>{page + 1}</CurrentPage>
                    <PaginationButton
                      onClick={goToNextPage}
                      disabled={page === totalPages - 1}
                    >
                      다음
                    </PaginationButton>
                  </PaginationContainer>
                </BooksContainer>
              )}
            </div>
          </BookContainer>
        </Container>
      </Root>
    </>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY.LiGHT};
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY.LiGHT};
`;

const NoneBook = styled.div`
  text-align: center;
  width: 100%;
  margin: 10vw 0;
`;

const BookContainer = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const BooksContainer = styled.div`
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled(Input)`
  width: 52vw;
  height: 3vw;
  font-size: 1.5vw;
`;

const SearchButton = styled(Button)`
  height: 3vw;
  width: 6vw;
  font-size: 1vw;
  background-color: ${PRIMARY.DEFAULT};
  color: white;
  border: none;
  border-radius: 5px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const PaginationButton = styled(Button)`
  margin: 0 10px;
`;

const CurrentPage = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 10px;
`;

const SubscribeBtn = styled.button`
  background: linear-gradient(
    90deg,
    #ffe3e4 0%,
    #ffabb5 22%,
    #ffa6b3 45%,
    #ff8f91 55%,
    #f5666f 79%,
    #ff3f43 100%
  );
  color: white;
  border: none;
  padding: 0.8vw 5vw;
  border-radius: 8px;
`;

export default Main;
