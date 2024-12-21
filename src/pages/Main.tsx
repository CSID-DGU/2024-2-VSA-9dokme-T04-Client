"use client";
import { useState, useEffect } from "react";
import SlidingBanner from "../components/SlidingBanner";
import Hashtag from "../components/Hashtag";
import { Book } from "../json/BookList";
import books from "../json/books.json";
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
const book1 = "/images/books/book1.png";
const book2 = "/images/books/book2.png";
const book3 = "/images/books/book3.png";
const book4 = "/images/books/book4.png";
const book5 = "/images/books/book5.png";
const book6 = "/images/books/book6.png";
const book7 = "/images/books/book7.png";
import Sidebanner from "../components/Sidebanner";
import { PRIMARY } from "../utils/colors";
import { Button, Card, Input } from "antd";
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

/*Mobile, Browser view 조건부 렌더링*/
interface MainProps {
  mobileView?: boolean;
}

const Main: React.FC<MainProps> = ({ mobileView }) => {
  const router = useRouter();
  const handleImgClick = (bookId: number) => {
    router.push(`/bookdetail/${bookId}`);
  };

  const [category, setCategory] = useState<string>("전체보기");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterBooks, setFilterBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(0);
  const [memberId] = useState<number>(1);

  const handleHashBtnClick = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (category === "전체보기") {
      setFilterBooks(books.bookData);
    } else {
      setFilterBooks(
        books.bookData.filter((book) => book.category === category)
      );
    }
    console.log("Updated filterBooks: ", filterBooks);
  }, [category]);

  const handleSearchBtnClick = async () => {
    /*
    try {
      
      const response = await axios.get(`${BASE_URL}/api/mainpage/search`, {
        params: {
          title: searchQuery,
          memberId: memberId,
          page: page,
        },
      });
      const { content } = response.data;
     \
    
      const content = books.bookData;
      console.log("Fetched content: ", content);
 
      setFilterBooks(content);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
     */
    if (searchQuery) {
      setFilterBooks((prevBooks) =>
        prevBooks.filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    handleSearchBtnClick();
  }, [category, page]);

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
                <NoneBook>검색 결과가 없습니다.</NoneBook>
              ) : (
                <BooksContainer>
                  <div className="grid grid-cols-4 gap-10 m-4">
                    {filterBooks.map((book) => (
                      <BookCard
                        key={book.bookId}
                        cover={images[book.bookUrl]}
                        //cover={book.bookUrl}
                        title={book.title}
                        onClick={() => handleImgClick(book.bookId)}
                        isMarked={book.isMarked}
                        bookId={0}
                      />
                    ))}
                  </div>
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
  width: 100%;
  margin: 10vw 0;
`;
const BookContainer = styled.div`
  width: 70vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const BooksContainer = styled.div`
  margin-top: 3vw;
  display: flex;
  justify-content: center;
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
  &:hover,
  &:focus {
    border-color: ${PRIMARY.DEFAULT};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const SearchButton = styled(Button)`
  height: 3vw;
  width: 6vw;
  font-size: 1vw;
  background-color: ${PRIMARY.DEFAULT};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${PRIMARY.DEFAULT};
  }
`;

export default Main;
