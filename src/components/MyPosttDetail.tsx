import React from "react";

interface MyPostDetailProps {
  onBack: () => void;
  postDetail: {
    title: string;
    content: string;
    createdAt: string;
    nickName: string;
  };
}

const MyPostDetail: React.FC<MyPostDetailProps> = ({ onBack, postDetail }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[35vw] h-auto bg-white rounded-[1vw] text-[1.5vw] shadow-sm p-[2vw]">
        <div className="flex justify-between items-center mb-[1vw]">
          <div className="font-bold text-[1.2vw]">작성글 상세조회</div>
          <button onClick={onBack} className="font-bold cursor-pointer">
            x
          </button>
        </div>
        <hr className="border-gray-300 my-[1.5vw]" />
        <div className="grid gap-x-[1vw] gap-y-[1.5vw]">
          <div>
            <strong>제목:</strong> {postDetail.title}
          </div>
          <div>
            <strong>내용:</strong> {postDetail.content}
          </div>
          <div>
            <strong>작성일:</strong> {postDetail.createdAt}
          </div>
          <div>
            <strong>작성자:</strong> {postDetail.nickName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPostDetail;
