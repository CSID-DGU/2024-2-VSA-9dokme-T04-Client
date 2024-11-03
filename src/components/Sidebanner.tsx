import { useRecoilState } from "recoil";
import { activeButtonState } from "../recoil/atom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import banner from "../images/banner.png";
import chat from "../images/banner/chat.png";
import book from "../images/banner/book.png";
import bookmark from "../images/banner/bookmark.png";
import query from "../images/banner/query.png";
import logout from "../images/adminBanner/logout.png";
import API from "../api/axios";
const Sidebanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const [activeBtn, setActiveBtn] = useRecoilState(activeButtonState);

  const handleBannerClickOn = () => {
    if (!isClicked) setIsClicked(true);
  };
  const handleBannerClickOff = () => {
    if (isClicked) setIsClicked(false);
  };

  useEffect(() => {
    const pathToKeyMap: { [key: string]: string | undefined } = {
      "/mainpage": "mainpage",
      "/mypage": "mypage",
      "/myarticle": "myarticle",
      "/queryBoard": "queryboard",
    };
    const currentKey = pathToKeyMap[location.pathname];
    if (currentKey) {
      setActiveBtn(currentKey);
    }
  }, [location.pathname]);

  const handleNavigate = (path: string, btnKey: string) => {
    setActiveBtn(btnKey);
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
    <div className="fixed top-0 right-0 z-50">
      {!isClicked ? (
        <img
          src={banner}
          className="w-[3vw] fixed top-[2vw] right-[2vw]"
          onClick={handleBannerClickOn}
        />
      ) : (
        <div className="pointer w-[20vw] h-[50vw] bg-white rounded-bl-[2vw] p-[1vw] text-[1.5vw]">
          <div
            onClick={handleBannerClickOff}
            className="text-right font-bold cursor-pointer"
          >
            x
          </div>
          <div style={{ textAlign: "left", width: "100%" }}>
            <p style={{ fontSize: "1vw" }}>Menu</p>
          </div>
          <BtnComponent>
            <NavBarBtn
              text="메인페이지"
              icon={book}
              isActive={activeBtn === "mainpage"}
              onClick={() => handleNavigate("/mainpage", "mainpage")}
            />
            <NavBarBtn
              text="나의책갈피"
              icon={bookmark}
              isActive={activeBtn === "mypage"}
              onClick={() => handleNavigate("/mypage", "mypage")}
            />
            <NavBarBtn
              text="나의 작성글"
              icon={chat}
              isActive={activeBtn === "myarticle"}
              onClick={() => handleNavigate("/myarticle", "myarticle")}
            />
            <NavBarBtn
              text="문의글 작성"
              icon={query}
              isActive={activeBtn === "queryboard"}
              onClick={() => handleNavigate("/queryBoard", "queryboard")}
            />
            <NavBarBtn
              text="로그아웃"
              icon={logout}
              isActive={activeBtn === "logout"}
              onClick={() => handleLogout()}
            />
          </BtnComponent>
        </div>
      )}
    </div>
  );
};
interface NavBarBtnProps {
  text: string;
  icon: string;
  onClick: () => void;
  isActive: boolean;
}
interface NavBarBtnStyleProps {
  isActive: boolean;
}
const NavBarBtn: React.FC<NavBarBtnProps> = ({
  text,
  icon,
  onClick,
  isActive,
}) => {
  return (
    <NavBarBtnStyle onClick={onClick} isActive={isActive}>
      {icon && (
        <img
          src={icon}
          alt={text}
          style={{ marginRight: "10px", width: "18%" }}
        />
      )}
      {text}
    </NavBarBtnStyle>
  );
};

const NavBarBtnStyle = styled.button<NavBarBtnStyleProps>`
  color: ${(props) => (props.isActive ? "white" : "black")};
  background-color: ${(props) => (props.isActive ? "#5A4BFF" : "#FFFFFF")};
  text-align: left;
  font-weight: bold;
  font-size: 1vw;
  display: flex;
  align-items: center;
  width: 15vw;
  height: 2.3vw;
  padding: 1.7vw;
  border-radius: 0.5vw;
  border-style: none;
  margin: 1vw 0vw;
  &:hover {
    background-color: #5a4bff;
    color: white;
  }
`;

const BtnComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default Sidebanner;
