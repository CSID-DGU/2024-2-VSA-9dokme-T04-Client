import React from "react";

interface Props {
  onBack: () => void;
}

const EditProfile: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="fixed top-[30%] right-[33vw] z-50 pointer w-[35vw] h-auto bg-white rounded-[1vw] text-[1.5vw] shadow-sm">
      <div className="m-[2vw]">
        <div className="flex justify-between items-center mb-[3vw] ">
          <div className="font-bold text-[1.2vw] ">유저정보 수정하기</div>
          <button onClick={onBack} className="font-bold cursor-pointer">
            x
          </button>
        </div>
        <div className="grid grid-cols-[1fr_5fr] gap-x-[1vw] gap-y-[1.5vw]">
          <label className="text-[1.2vw]">유저이름</label>
          <input
            type="text"
            className="col-span-1 p-[0.5vw] text-[1vw] border border-gray-300 rounded"
          />

          <label className="text-[1.2vw]">이메일</label>
          <input
            type="text"
            className="col-span-1 p-[0.5vw] text-[1vw] border border-gray-300 rounded"
          />

          <label className="text-[1.2vw]">만료일자</label>
          <input
            type="text"
            className="col-span-1 p-[0.5vw] text-[1vw] border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="mt-[4vw] ">
        <button className="bg-customColor3 text-white p-[1vw] text-[1vw] w-[50%] font-bold">
          수정 완료하기
        </button>
        <button
          onClick={onBack}
          className="bg-gray-300 text-black p-[1vw] text-[1vw] w-[50%] font-bold"
        >
          수정 취소하기
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
