import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactPaginate from "react-paginate";
import AdminBanner from "../components/AdminBanner";
// import QueryDetail from "../components/QueryDetail";
import { BASE_URL } from "../env";
import { Button } from "antd";

const AdminQboard: React.FC = () => {
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [selectedQuery, setSelectedQuery] = useState<any | null>(null);
  const [queryData, setQueryData] = useState<any>({
    content: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchQueries = async (page: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/admin/inquiries/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size: 10,
        },
      });
      setQueryData(response.data);
    } catch (error) {
      console.error("API 호출 오류: ", error);
    }
  };

  useEffect(() => {
    fetchQueries(currentPage);
  }, [currentPage]);

  const onBack = () => {
    setOpenEditor(false);
    setSelectedQuery(null);
  };

  const detailViewClick = (query: any) => {
    setSelectedQuery(query);
    setOpenEditor(true);
  };

  const onDeleteClick = async (inquireId: number) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/admin/inquiries/delete/${inquireId}`
      );
      if (response.status === 200 || response.status === 204) {
        fetchQueries(currentPage);
        alert("문의글이 삭제되었습니다.");
      } else {
        alert("문의글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("문의글 삭제 오류: ", error);
      alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <Root>
      <Container>
        <AdminBanner />
        <Title>문의게시판 관리 페이지</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>유저 Id</TableHeader>
              <TableHeader>문의글 제목</TableHeader>
              <TableHeader>문의글 내용</TableHeader>
              {/* <TableHeader>조회</TableHeader> */}
              <TableHeader>삭제</TableHeader>
            </tr>
          </thead>
          <tbody>
            {queryData.content.map((query: any) => (
              <TableRow key={query.inquireId}>
                <TableCell>{query.userId}</TableCell>
                <TableCell>{query.title}</TableCell>
                <TableCell>
                  {query.content.length > 40
                    ? query.content.slice(0, 40) + "..."
                    : query.content}
                </TableCell>
                {/* <TableCell>
                  <ActionButton onClick={() => detailViewClick(query)}>
                    상세조회
                  </ActionButton>
                </TableCell> */}
                <TableCell>
                  <DeleteButton onClick={() => onDeleteClick(query.inquireId)}>
                    삭제
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <PaginationWrapper>
          <ReactPaginate
            previousLabel={"이전"}
            nextLabel={"다음"}
            breakLabel={"..."}
            pageCount={queryData.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
          />
        </PaginationWrapper>
      </Container>
    </Root>
  );
};

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

const DeleteButton = styled(Button)`
`;

const PaginationWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination a {
    text-decoration: none;
    padding: 8px 12px;
    color: #aa84c9;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    background-color: white;
    &:hover {
    border-color: #aa84c9;
    background-color: #f0f0f0;
    transition: border-color 0.3s ease, background-color 0.3s ease;

  }
  }

  .pagination .active a {
    background-color:#aa84c9;
    color: white;
  }
`;


export default AdminQboard;
