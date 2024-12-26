import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
import banner from "../images/banner.png";
import { GRAY } from "../utils/colors";
import NotificationList from "./NotificationList";
import { BASE_URL } from "../env";
import axios from "axios";
import { message } from "antd";

const Sidebanner = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTab, setCurrentTab] = useState<"main" | "notifications">(
    "main"
  );

  const handleBannerClickOn = () => {
    setIsClicked(true);
    setIsAnimating(true);
  };

  const handleBannerClickOff = () => {
    setIsClicked(false);
    setIsAnimating(true);
    setCurrentTab("main");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰 추가
          },
        }
      );
      message.success("로그아웃되었습니다.");
      navigate("/");
      console.log("Logout successful:", response.data);
    } catch (error) {
      message.error("로그아웃에 실패했습니다.");
    }
  };
  

  const handleSwitchToNotifications = () => {
    setCurrentTab("notifications");
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
          {currentTab === "main" ? (
            <>
              <ToggleArrow onClick={handleBannerClickOff}>{">>"}</ToggleArrow>
              <MenuItem onClick={() => handleNavigate("/mainpage")}>
                메인 페이지
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/mypage")}>
                나의 책갈피
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/myarticle")}>
                나의 작성글
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/queryBoard")}>
                문의글 작성
              </MenuItem>
              <MenuItem onClick={handleSwitchToNotifications}>알림</MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </>
          ) : (
            <>
              <BackButton onClick={() => setCurrentTab("main")}>
                {"←"}
              </BackButton>
              <NotificationList onBack={() => setCurrentTab("main")} />
            </>
          )}
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

const BackButton = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e0e0e0;
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
