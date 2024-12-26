import React, { useEffect, useState } from "react";
import profile from "../images/profile.png";
import User from "../json/User.json";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bg from "../images/bg.png";
import BookCard from "../components/BookCard";
import axios from "axios";
import Sidebanner from "../components/Sidebanner";
import { BASE_URL } from "../env";

import book1 from "../images/books/book1.png";
import book2 from "../images/books/book2.png";
import book3 from "../images/books/book3.png";
import book4 from "../images/books/book4.png";
import book5 from "../images/books/book5.png";
import book6 from "../images/books/book6.png";
import book7 from "../images/books/book7.png";

const images: { [key: string]: string } = {
  "book1.png": book1,
  "book2.png": book2,
  "book3.png": book3,
  "book4.png": book4,
  "book5.png": book5,
  "book6.png": book6,
  "book7.png": book7,
};

const MyPage = () => {
  interface Book {
    bookId: number;
    title: string;
    bookImage: string;
    bookUrl: string;
    isMarked: boolean;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [expiredAt, setExpiredAt] = useState("");

  const navigate = useNavigate();

  const handleClickSubscribeBtn = () => {
    navigate("/subscribe");
  };

  const handleImgClick = (bookId: number) => {
    navigate(`/bookdetail/${bookId}`);
  };

  // useEffect(() => {
  //   setBooks(booksData.bookData);
  //   console.log("books: ", books);
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchMypageData = async () => {
      try {
        const memberId = localStorage.getItem("memberId");

        if (memberId) {
          const response = await axios.get(`${BASE_URL}/api/mypage`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const { profileDto, bookList } = response.data;
          console.log("response.data: ", response.data);
          setBooks(bookList.content);
          setExpiredAt(profileDto.expirationDate);
          console.log("Profile Data:", profileDto);
          console.log("Book List Data:", bookList);
        } else {
          console.error("memberId not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching mypage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMypageData();
  }, []);

  const handleLogout = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/api/user/logout`, {
        headers: {
          Autorization: `Bearer ${token}`,
        },
      });
      navigate("/");

      console.log("Logout successful:", response.data);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const goToBarcodeSearch = () => {
    navigate("/barcodefilming");
  };

  return (
    <div className="w-screen h-[130vh] bg-primary-light bg-opacity-20">
      <Sidebanner />
      <div className="flex flex-col justify-center items-center">
        <img src={profile} className="w-[10vw] mt-[5vw]" alt="Profile" />
        <p className="text-[1.2vw] mt-[2vw] text-center">
          <span className="text-sky-600 font-bold">
            {localStorage.getItem("name")}
          </span>
          <span className="font-bold">님, 안녕하세요:)</span>
          <br />
          구독 만료일은
          <span className="text-red-400 font-bold mx-2">{expiredAt}</span>
          입니다.
        </p>

        <SubscribeBtn onClick={goToBarcodeSearch}>
          𝄂𝄀𝄁𝄃𝄂 바코드 교재인식 𝄃𝄂𝄂𝄀𝄁
        </SubscribeBtn>
        <div className="flex justify-center">
          <BgContainer>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div className="grid grid-cols-4 gap-10 m-4">
                  {books.map((book) => (
                    <BookCard
                      bookId={book.bookId}
                      cover={images[book.bookUrl]}
                      title={book.title}
                      isMarked={book.isMarked}
                      onClick={() => handleImgClick(book.bookId)}
                    />
                  ))}
                </div>
              </div>
            )}
          </BgContainer>
        </div>
      </div>
    </div>
  );
};

const BgContainer = styled.div`
  background-image: url(${bg});
  background-size: cover;
  width: 70vw;
  height: auto;
  background-repeat: no-repeat;
  padding: 2vw;
  margin: auto;
  display: inline-block;
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
  cursor: pointer;
  outline: none;
  font-size: 1.2vw;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s;
  margin-top: 2vw;
  margin-bottom: 2vw;

  &:hover {
    opacity: 0.8;
  }
`;

export default MyPage;
