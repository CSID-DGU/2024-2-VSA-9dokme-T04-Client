import banner from "../images/banner.png";
import styled from "styled-components";
import pdf from "../images/adminBanner/pdf.png";
import user from "../images/adminBanner/user.png";
import qboard from "../images/adminBanner/qboard.png";
import logout from "../images/banner/logout.png";
import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { GRAY } from "../utils/colors";
const AdminBanner = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBannerClickOn = () => {
    setIsClicked(true);
    setIsAnimating(true);
  };
  const handleBannerClickOff = () => {
    setIsClicked(false);
    setIsAnimating(true);
  };
  // useEffect(() => {
  //   const pathToKeyMap: { [key: string]: string | undefined } = {
  //     "/admin/adminPdf": "adminpdf",
  //     "/admin/adminUser": "adminuser",
  //     "/admin/adminQboard": "adminqboard",
  //   };
  //   const currentKey = pathToKeyMap[location.pathname];
  //   if (currentKey) {
  //     setActiveBtn(currentKey);
  //   }
  // }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      // API 호출
      const response = await API.get("/logout");
      alert("로그아웃되었습니다.");
      navigate("/");

      // 응답 로깅
      console.log("Logout successful:", response.data);
    } catch (error) {
      // 오류 처리
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className='fixed top-0 right-0 z-50'>
      {!isClicked && !isAnimating ? (
        <img
          src={banner}
          className='w-[3vw] fixed top-[2vw] right-[2vw]'
          onClick={handleBannerClickOn}
        />
      ) : (
        <Container
          isClicked={isClicked}
          onTransitionEnd={() => {
            if (!isClicked) {
              setIsAnimating(false);
            }
          }}
        >
          <AdminBadge>Admin</AdminBadge>
          <ToggleArrow onClick={handleBannerClickOff}>{">>"}</ToggleArrow>
          <MenuItem onClick={() => handleNavigate("/admin/adminPdf")}>
            PDF 관리
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/admin/adminUser")}>
            유저정보 관리
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/admin/adminQboard")}>
            문의게시판 관리
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/admin/adminPaymentList")}>
            결제정보 관리
          </MenuItem>
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        </Container>
      )}
    </div>
  );
};

const AdminBadge = styled.div`
  top: 25px;
  right: 25px;
  position: absolute;
  background-color: #e8d8f5;
  color: #6b448b;
  padding: 3px;
  border-radius: 5px;
`;

const Container = styled.div<{ isClicked: boolean }>`
  z-index: 50;
  width: 18vw;
  height: 100vh;
  background-color: WHITE;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border: 1px ${GRAY.DEFAULT} solid;

  animation: ${({ isClicked }) =>
    isClicked ? "slideIn 0.4s ease-in-out" : "none"};
  transform: ${({ isClicked }) => (isClicked ? "none" : "translateX(100%)")};
  transition: transform 0.4s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const ToggleArrow = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: gray;
  }
`;

const MenuItem = styled.div<{ active?: boolean }>`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export default AdminBanner;
