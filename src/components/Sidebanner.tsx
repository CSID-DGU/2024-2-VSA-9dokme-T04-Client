import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
const banner = "/images/banner.png";
import { GRAY } from "../utils/colors";

const Sidebanner = () => {
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

  const handleNavigate = (path: string, btnKey: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const response = await API.get("/logout");
      alert("로그아웃되었습니다.");
      navigate("/");
      console.log("Logout successful:", response.data);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50">
      {!isClicked && !isAnimating ? (
        <img
          src={banner}
          className="w-[3vw] fixed top-[2vw] right-[2vw]"
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
          <ToggleArrow onClick={handleBannerClickOff}>{">>"}</ToggleArrow>
          <MenuItem onClick={() => handleNavigate("/mainpage", "mainpage")}>
            메인 페이지
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/mypage", "mypage")}>
            나의 책갈피
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/myarticle", "myarticle")}>
            나의 작성글
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/queryBoard", "queryboard")}>
            문의글 작성
          </MenuItem>
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        </Container>
      )}
    </div>
  );
};

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

export default Sidebanner;
