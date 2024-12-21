import styled from "styled-components";
import AdminBanner from "../components/AdminBanner";
import Users from "../json/UserList.json";
import { User, UserList } from "../json/UserList";
import { useState } from "react";
import EditProfile from "../components/EditProfile";
import API from "../api/axios";
import { Button } from "antd";

const AdminUser = () => {
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const onBack = () => {
    setOpenEditor(false);
  };
  const onEditClick = () => {
    setOpenEditor(true);
  };
  const onDeleteClick = async (userId: string) => {
    try {
      const response = await API.post(`/api/admin/member/delete/${userId}`);
      if (response.status === 200 || response.status === 201) {
        alert(`${userId}: 유저가 삭제되었습니다.`);
      } else {
        alert("문의글 제출에 실패했습니다.");
      }
    } catch (error) {
      console.log("문의글 제출 오류: ", error);
      alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };
  return (
    <Root>
      <Container>
        {openEditor === true ? <EditProfile onBack={onBack} /> : null}

        <AdminBanner />
        <Title>유저 관리 페이지</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>유저이름</TableHeader>
              <TableHeader>이메일</TableHeader>
              <TableHeader>만료일자</TableHeader>
              <TableHeader>수정</TableHeader>
              <TableHeader>삭제</TableHeader>
            </tr>
          </thead>
          <tbody>
            {Users.userList.map((user: User) => (
              <TableRow key={user.username}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.expirationDate}</TableCell>
                <TableCell>
                  <StyledButton
                    onClick={onEditClick}
                  >
                    수정
                  </StyledButton>
                </TableCell>
                <TableCell>
                  <StyledButton
                    onClick={() => onDeleteClick(String(user.userId))}
                  >
                    삭제
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
    </Root>
  );
};

const StyledButton = styled(Button)`
  
`
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
  background-color: white;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Box = styled.div`
  width: 75vw;
  height: auto;
  border: 0.2vw solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: transparent;
  background-color: rgba(197, 181, 247, 0.4);
  border-top: none;
  overflow-x: auto;
`;

export default AdminUser;
