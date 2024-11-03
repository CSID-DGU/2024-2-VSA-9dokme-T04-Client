// @ts-nocheck
import React, { useState } from "react";
import API from "../api/axios";
import { BASE_URL } from "../env";

interface Props {
  onBackFn: () => void;
  questionId: number;
}

const AddComment: React.FC<Props> = ({ onBackFn, questionId }) => {
  const [content, setContent] = useState<string>("");

  const memberId = localStorage.getItem("memberId");

  const handleSubmit = async () => {
    try {
      const payload = {
        content: content,
      };

      const response = await API.post(
        `${BASE_URL}/api/community/comment/${questionId}?memberId=${memberId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("댓글이 성공적으로 등록되었습니다.");
        onBackFn();
      }
    } catch (error) {
      console.error(
        "Error posting the comment:",
        error.response ? error.response.data : error.message
      );
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="pointer w-[30vw] h-auto bg-white rounded-bl-[2vw] text-[1.5vw] shadow-sm">
      <div className="m-[2vw]">
        <div className="flex flex-col mb-[1vw]">
          <label className="text-[1vw] col-span-2 mb-[1vw]">
            📬 댓글을 작성해주세요.
          </label>
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
          onClick={onBackFn}
          className="bg-gray-300 text-black p-[1vw] text-[1vw] w-[48%] font-bold"
        >
          작성 취소하기
        </button>
      </div>
    </div>
  );
};

export default AddComment;
