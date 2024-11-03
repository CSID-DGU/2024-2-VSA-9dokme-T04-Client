import styled from "styled-components";
import AdminBanner from "../components/AdminBanner";
import Users from "../json/UserList.json";
import { User, UserList } from "../json/UserList";
import { useState } from "react";
import EditProfile from "../components/EditProfile";
import API from "../api/axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../components/ui/table";

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
    <div className="flex-col -screen h-screen bg-customColor bg-opacity-20 flex justify-center items-center">
      {openEditor === true ? <EditProfile onBack={onBack} /> : null}

      <AdminBanner />
      <h1 className="font-bold">유저 관리 페이지</h1>
      <Table className="bg-white m-[3vw] w-[60vw] ml-[20vw]">
        <TableHeader>
          <TableRow className="bg-[#D8E7FF]">
            <TableHead className="w-[10vw]">유저이름</TableHead>
            <TableHead className="w-[20vw]">이메일</TableHead>
            <TableHead className="w-[13vw]">만료일자</TableHead>
            <TableHead className="w-[7vw]">수정</TableHead>
            <TableHead className="w-[7vw]">삭제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Users.userList.map((user: User) => (
            <TableRow key={user.username} className="text-left">
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.expirationDate}</TableCell>
              <TableCell>
                <button
                  onClick={onEditClick}
                  className="bg-slate-400 text-[0.8vw] text-white px-[0.5vw] rounded hover:bg-customColor3"
                >
                  수정
                </button>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => onDeleteClick(String(user.userId))}
                  className="bg-slate-400 text-[0.8vw] text-white px-[0.5vw] rounded hover:bg-[#FF7E7E]"
                >
                  삭제
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

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
