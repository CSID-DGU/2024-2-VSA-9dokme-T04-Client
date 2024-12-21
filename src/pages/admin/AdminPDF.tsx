import axios from "axios";
import { useState, useEffect } from "react";
import PDFAdd from "../../components/PDFAdd";
import PDFEdit from "../../components/PDFEdit";
import PDFDelete from "../../components/PDFDelete";
import styled from "styled-components";
import AdminBanner from "../../components/AdminBanner";
import { BASE_URL } from "../../env";
const AdminPDF: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"add" | "edit" | "delete">("add");
  const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/admin/books?search=""")
  //     .then((response) => {
  //       console.log("서버 응답:", response.data);
  //       setBooks(response.data);
  //     })
  //     .catch((error) => console.error("데이터 로딩 중 오류 발생:", error));
  // }, []);
  useEffect(() => {
    // 검색어를 포함한 API 호출
    const defaultSearchTerm = ""; // 기본 검색어 설정
    // axios
    //   .get(`${BASE_URL}/api/admin/books?search=${defaultSearchTerm}`)
    //   .then((response) => {
    //     console.log("서버 응답:", response.data);
    //     setBooks(response.data);
    //   })
    //   .catch((error) => console.error("데이터 로딩 중 오류 발생:", error));
  }, []);

  const handleTabChange = (tab: "add" | "edit" | "delete") => {
    setActiveTab(tab);
  };

  return (
    <div className="w-screen h-[100vh] bg-customColor bg-opacity-20">
      <AdminBanner />
      <div className="text-center w-full h-[7vw] flex items-center justify-center font-bold text-[2vw]">
        PDF 관리 페이지
      </div>
      <div className="tab-buttons flex justify-center items-center w-full">
        <OptionTab
          className={`tab-button ${activeTab === "add" ? "active" : ""}`}
          onClick={() => handleTabChange("add")}
        >
          PDF 추가
        </OptionTab>
        <OptionTab
          className={`tab-button ${activeTab === "edit" ? "active" : ""}`}
          onClick={() => handleTabChange("edit")}
        >
          PDF 수정
        </OptionTab>
        <OptionTab
          className={`tab-button ${activeTab === "delete" ? "active" : ""}`}
          onClick={() => handleTabChange("delete")}
        >
          PDF 삭제
        </OptionTab>
      </div>
      <div className="text-center w-full flex items-center justify-center font-bold mt-[-0.1vw]">
        {activeTab === "add" && <PDFAdd />}
        {activeTab === "edit" && <PDFEdit />}
        {activeTab === "delete" && <PDFDelete />}
      </div>
    </div>
  );
};

const OptionTab = styled.button`
  width: 25vw;
  height: 6vw;
  border-radius: 1vw 1vw 0 0;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.7vw;
  background-color: transparent;
  cursor: pointer;

  &.active {
    background-color: rgba(197, 181, 247, 0.4);
    border-bottom: none;
  }
`;

export default AdminPDF;
