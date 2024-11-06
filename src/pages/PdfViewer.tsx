import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as pdfjsLib from "pdfjs-dist";
import CommunityTab from "../components/CommunityTab";
import AIChat from "../components/AIChat";
import axios from "axios";
import { BASE_URL } from "../env";
import BookmarkSuccess from "../components/BookmarkSuccess";
import bookDetailData from "../json/BookDetail.json";
import { BookDetailType } from "../json/BookDetailType";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface Book {
  title: string;
  author: string;
  bookId: number;
  description: string;
  lastPage: number;
  pdfImage: string;
  publisher: string;
  category: string;
}

const PdfViewer: React.FC = () => {
  const [memberId] = useState<number>(1);
  const [page, setPage] = useState<number>(() =>
    parseInt(localStorage.getItem("lastPage") || "1")
  );
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const { bookId } = useParams<{ bookId: string }>();
  const numericBookId = Number(bookId);

  const location = useLocation();
  const { book }: { book?: Book } = location.state || {};
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bookData, setBookData] = useState<BookDetailType>();
  // 모달창
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalOn = () => {
    setIsOpen(true);
  };
  const handleModalOff = () => {
    setIsOpen(false);
  };
  // 책 상세 정보를 위한 인터페이스 정의
  // interface BookDetailType {
  //   title: string;
  //   cateogry: string;
  //   author: string;
  //   category: string;
  //   pdfUrl: string;
  // }
  const fetchBookData = async (bookId: number) => {
    try {
      const response = await axios.get<BookDetailType>(`${BASE_URL}/api/view`, {
        params: { bookId: numericBookId, memberId: memberId },
      });
      console.log("fetchBookData 성공!");
      return response.data;
    } catch (error) {
      console.error("Error fetching book details:", error);
      throw error;
    }
  };

  /** 
  useEffect(() => {
    const fetchData = async () => {
      if (!bookId) return;
      try {
        const bookData = await fetchBookData(numericBookId);
        setBookData(bookData);
        console.log("bookData: ", bookData);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [bookId]);
  */

  useEffect(() => {
    if (bookId) {
      console.log("bookId: ", bookId);
      const foundBook = bookDetailData.books.find(
        (book) => book.bookId === numericBookId
      );
      console.log("foundBook: ", foundBook);
      setBookData(foundBook);
    }
  }, [bookId]);

  /*
  useEffect(() => {
    console.log("받아온 book정보: ", bookData);

    const loadPdf = async () => {
      if (bookData?.pdfUrl) {
        const proxyUrl = "http://localhost:8080/";
        const pdfUrl = `${proxyUrl}${bookData?.pdfUrl}`;
        // const pdfUrl = `${bookData?.pdfUrl}`;
        try {
          const loadedPdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
          setPdfDoc(loadedPdfDoc);
          setNumPages(loadedPdfDoc.numPages);
        } catch (error) {
          console.error("Error loading PDF document:", error);
        }
      }
    };

    loadPdf();
  }, [bookData]);
  */

  /**mockdata 로드용 */
  useEffect(() => {
    const loadPdf = async () => {
      if (bookData?.bookURL) {
        try {
          const pdfUrl = bookData.bookURL;
          const loadedPdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
          setPdfDoc(loadedPdfDoc);
          setNumPages(loadedPdfDoc.numPages);
        } catch (error) {
          console.error("Error loading PDF document: ", error);
        }
      }
    };
  });
  useEffect(() => {
    localStorage.setItem("lastPage", page.toString());
  }, [page]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    console.log("마지막으로 읽은 페이지:", lastPage);
  }, [bookData]);

  useEffect(() => {
    const renderPage = async (pageNum: number) => {
      if (pdfDoc && canvasRef.current) {
        try {
          if (pageNum >= 1 && pageNum <= numPages) {
            const page = await pdfDoc.getPage(pageNum);
            const scale = 1;
            const viewport = page.getViewport({ scale });
            const context = canvasRef.current.getContext("2d");

            if (context) {
              canvasRef.current.height = viewport.height;
              canvasRef.current.width = viewport.width;

              const renderContext = {
                canvasContext: context,
                viewport,
              };
              await page.render(renderContext).promise;
            }
          } else {
            console.error("Invalid page request:", pageNum);
            setPage(1); // 올바르지 않은 페이지가 요청되면 첫 페이지로 설정
          }
        } catch (error) {
          console.error("Error rendering page:", error);
        }
      }
    };

    renderPage(page);
  }, [pdfDoc, page]);

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, numPages));
  };

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value, 10);
    if (!isNaN(newPage)) {
      setPage(Math.min(Math.max(newPage, 1), numPages));
    }
  };

  const handlePageBlur = () => {
    // 입력란에서 포커스를 잃었을 때 범위를 벗어난 입력을 1과 numPages 사이로 조정
    setPage((currentPage) => Math.min(Math.max(currentPage, 1), numPages));
  };

  const progressPercentage = (page / numPages) * 100;

  return (
    <Frame className="bg-customGradient w-full h-[150vh]">
      <CommunityTab bookId={bookId} />
      <AIChat />
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mt-20 mb-5">
          <div className="font-bold text-[1.5vw]">[{bookData?.bookTitle}]</div>
          <p className="text-[1.2vw] mt-[0.2vw]">{bookData?.author}</p>
        </div>
        <div>
          <TagBtn>{bookData?.bookCategory}</TagBtn>
        </div>

        <CanvasWrapper>
          <canvas ref={canvasRef}></canvas>
        </CanvasWrapper>
        <br />
        <ProgressBarContainer className="bg-white rounded mt-[1vw]">
          <ProgressBar progress={progressPercentage} />

          <ProgressText>진행률 {progressPercentage.toFixed(2)}%</ProgressText>
        </ProgressBarContainer>

        <ButtonContainer>
          <NavButton onClick={handlePreviousPage} disabled={page === 1}>
            이전 페이지
          </NavButton>
          <PageInput
            type="number"
            value={page}
            onChange={handlePageInput}
            onBlur={handlePageBlur}
          />
          <NavButton onClick={handleNextPage} disabled={page === numPages}>
            다음 페이지
          </NavButton>
        </ButtonContainer>
      </div>
    </Frame>
  );
};

const Frame = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    circle at 10% 50%,
    rgb(163, 175, 243) 0%,
    rgb(220, 182, 232) 100.2%
  );
  padding: 20px;
  overflow: auto;
`;

const TagBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: auto;
  height: 2vw;
  border-radius: 3vw;
  border-style: solid;
  border-width: 1px;
  border-color: #2519b2;
  padding: 1vw;
  font-size: 1vw;
  background-color: #d195ff;
`;

const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 750px;
  width: 100%;
  overflow: hidden; /* 스크롤바 숨김 */
`;

const ProgressBarContainer = styled.div`
  width: 40vw;
  height: 1vw;
  margin: 20px 0;
  position: relative;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 1vw;
  background-color: #001b8d;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  position: absolute;
  top: -25px;
  right: 0;
  font-size: 14px;
  font-weight: bold;
  color: #001b8d;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const NavButton = styled.button`
  background-color: #001b8d;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #c784ff;
  }
`;

const PageInput = styled.input`
  text-align: center;
  width: 50px;
  margin: 0 10px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default PdfViewer;
