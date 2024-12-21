import React, { useEffect, useState } from "react";
import User from "../json/User.json";
import profile from "../images/profile.png";
import Sidebanner from "../components/Sidebanner";
import API from "../api/axios";
import { BASE_URL } from "../env";
import { message } from "antd";
const QueryBoard = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token is missing.");
      return;
    }
  
    try {
      const response = await API.post(
        `${BASE_URL}/api/inquire`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        message.success("문의글이 관리자에게 성공적으로 제출되었습니다:)");
  
        setTitle("");
        setContent("");
  
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        message.error("문의글 제출에 실패했습니다.");
      }
    } catch (error) {
      console.log("문의글 제출 오류: ", error);
      alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };
  

  return (
    <div className="w-screen h-[100vh] bg-customColor bg-opacity-20 p-[5vw]">
      <Sidebanner />
      <div className="flex flex-col justify-center items-center">
        <img src={profile} className="w-[10vw]" />
        <p className="text-[1.2vw] mt-[2vw]">
          <span className="text-sky-600 font-bold">{User.username}</span>님의
          문의글 작성 페이지입니다.
        </p>

        <div className="mt-[3vw] w-[70vw]">
          <div className="bg-black1 text-white text-[1vw] p-[0.5vw]">
            문의사항을 작성 후 제출해주세요.
          </div>
          <form className="bg-white h-[23vw] text-[1vw] box-border p-[3vw] flex flex-col">
            <div className="grid grid-cols-10 grid-rows-5 h-full">
              <div className="col-span-1 row-span-1 font-bold">제목</div>
              <div className="col-span-9 row-span-1">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-[100%] h-[80%] border-slate-400 border-solid border-[0.1vw] pl-[1vw]"
                />
              </div>
              <div className="col-span-1 row-span-4 font-bold">문의글</div>
              <div className="col-span-9 row-span-4">
                <input
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-[100%] h-[100%] border-slate-400 border-solid border-[0.1vw] pl-[1vw]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-btncolor w-[9vw] text-center text-white py-[0.5vw] px-[1vw] bg-btncolor rounded-sm mt-[2vw]"
              >
                제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default QueryBoard;
