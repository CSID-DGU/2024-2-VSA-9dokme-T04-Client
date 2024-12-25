import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 사용
import { BASE_URL } from "../env";
import { Button } from "antd";

interface Inquire {
  questionId: number;
  bookId: number;
  title: string;
  content: string;
  commentCount: number;
  chapter: number;
  page: number;
  createdAt: string;
  nickName: string;
}

interface InquireResponse {
  content: Inquire[];
  totalElements: number;
  totalPages: number;
  size: number;
}

const MyArticle: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [posts, setPosts] = useState<Inquire[]>([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/myHistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
        },
      });

      const { content, totalPages } = response.data as InquireResponse;
      setPosts(content);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleNavigate = (bookId: number) => {
    navigate(`/view/${bookId}`);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <PaginationButton
          key={i}
          onClick={() => setPage(i)}
          active={i === page}
        >
          {i + 1}
        </PaginationButton>
      );
    }
    return pages;
  };

  return (
    <Root>
      <Container>
        <Title>나의 작성글</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>제목</TableHeader>
              <TableHeader>내용</TableHeader>
              <TableHeader>댓글 수</TableHeader>
              <TableHeader>이동</TableHeader>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <TableRow key={post.questionId}>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  {post.content.length > 40
                    ? post.content.slice(0, 40) + "..."
                    : post.content}
                </TableCell>
                <TableCell>{post.commentCount}</TableCell>
                <TableCell>
                  <MoveButton onClick={() => handleNavigate(post.bookId)}>
                    이동
                  </MoveButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <PaginationWrapper>{renderPagination()}</PaginationWrapper>
      </Container>
    </Root>
  );
};

// Styled Components
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
  width: 100%;
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
    background-color: #f9f9f9;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const MoveButton = styled(Button)`
`;

const PaginationWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button<{ active: boolean }>`
  margin: 0 5px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#007bff" : "#f0f0f0")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export default MyArticle;
