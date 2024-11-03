import React, { useState } from "react";
import API from "../api/axios";
import { BASE_URL } from "../env";

interface Props {
  onBack: () => void;
  bookId: number;
  userEmail: string;
}

const CreatePost: React.FC<Props> = ({ onBack, bookId, userEmail }) => {
  const [title, setTitle] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const memberId = localStorage.getItem("memberId");

  const handleSubmit = async () => {
    try {
      const payload = {
        userEmail: userEmail || "",
        bookChapter: chapter ? parseInt(chapter, 10) : 0,
        bookPage: page ? parseInt(page, 10) : 0,
        title: title,
        content: content,
      };

      const response = await API.post(
        `${BASE_URL}/api/community/question/${bookId}?memberId=${memberId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("질문이 성공적으로 등록되었습니다.");
        onBack();
      }
    } catch (error) {
      console.error("Error posting the question:", error);
      alert("질문 등록에 실패했습니다.");
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 pointer w-[30vw] h-auto bg-white rounded-bl-[2vw] text-[1.5vw] shadow-sm">
      <div className="m-[2vw]">
        <div className="flex justify-between items-center mb-[3vw]">
          <div className="font-bold text-[1.2vw]">커뮤니티 글 작성하기</div>
          <button onClick={onBack} className="font-bold cursor-pointer">
            x
          </button>
        </div>
        <div className="grid grid-cols-[1fr_5fr] gap-x-[1vw] gap-y-[1.5vw]">
          <label className="text-[1.2vw]">제목</label>
          <input
            type="text"
            className="col-span-1 p-[0.5vw] text-[1vw] border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="text-[1.2vw]">챕터</label>
          <input
            type="number"
            className="col-span-1 p-[0.5vw] text-[1vw] border border-gray-300 rounded"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />

          <label className="text-[1.2vw]">페이지</label>
          <input
            type="number"
            className="col-span-1 p-[0.5vw] text-[1vw] border border-gray-300 rounded"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          />

          <label className="text-[1.2vw] col-span-2">글내용</label>
          <textarea
            className="col-span-2 p-[0.5vw] text-[1vw] h-[10vw] border border-gray-300 rounded resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-[2vw] flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-customColor3 text-white p-[1vw] text-[1vw] w-[48%] font-bold"
        >
          작성 완료하기
        </button>
        <button
          onClick={onBack}
          className="bg-gray-300 text-black p-[1vw] text-[1vw] w-[48%] font-bold"
        >
          작성 취소하기
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
