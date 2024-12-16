import styled from "styled-components";
import pdf from "../../public/images/adminBanner/pdf.png";
import user from "../../public/images/adminBanner/user.png";
import qboard from "../../public/images/adminBanner/qboard.png";
import logout from "../../public/images/banner/logout.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import API from "../api/axios";
import { useRouter } from "next/router";
const AdminBanner = () => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [activeBtn, setActiveBtn] = useState("adminpdf");
  const handleBannerClickOn = () => {
    if (!isClicked) setIsClicked(true);
  };
  const handleBannerClickOff = () => {
    if (isClicked) setIsClicked(false);
  };
  useEffect(() => {
    const pathToKeyMap: { [key: string]: string | undefined } = {
      "/admin/adminPdf": "adminpdf",
      "/admin/adminUser": "adminuser",
      "/admin/adminQboard": "adminqboard",
    };
    const currentKey = pathToKeyMap[router.pathname];
    if (currentKey) {
      setActiveBtn(currentKey);
    }
  }, [router.pathname]);
  const handleNavigate = (path: string, btnKey: string) => {
    setActiveBtn(btnKey);
    router.push(path);
  };
  // const handleLogout = async (): Promise<void> => {
  //   try {
  //     // API 호출
  //     const response = await API.get("/logout");
  //     alert("로그아웃되었습니다.");
  //     router.push("/");

  //     // 응답 로깅
  //     console.log("Logout successful:", response.data);
  //   } catch (error) {
  //     // 오류 처리
  //     console.error("Logout failed:", error);
  //   }
  // };
  return (
    <div className="fixed top-0 right-0 z-50">
      {!isClicked ? (
        <Image
          src="/public/images/banner.jpg"
          alt="Banner Image"
          width={1200}
          height={400}
          layout="intrinsic" // 원본 비율 유지하면서 크기 조정
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
              text="PDF 관리"
              icon={pdf}
              isActive={activeBtn === "adminpdf"}
              onClick={() => handleNavigate("/admin/adminPdf", "adminpdf")}
            />
            <NavBarBtn
              text="유저정보 관리"
              icon={user}
              isActive={activeBtn === "adminuser"}
              onClick={() => handleNavigate("/admin/adminUser", "adminuser")}
            />
            <NavBarBtn
              text="문의게시판 관리"
              icon={qboard}
              isActive={activeBtn === "adminqboard"}
              onClick={() =>
                handleNavigate("/admin/adminQboard", "adminqboard")
              }
            />
            <NavBarBtn
              text="로그아웃 (관리자)"
              icon={logout}
              isActive={activeBtn === "logout"}
              //onClick={handleLogout}
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
        <Image
          width={1200}
          height={400}
          layout="intrinsic"
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
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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

export default AdminBanner;
