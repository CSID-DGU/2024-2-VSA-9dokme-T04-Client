import React from "react";
import { Inquiry } from "../json/Query";
interface Props {
  query: Inquiry;
  onBack: () => void;
}

const QueryDetail: React.FC<Props> = ({ query, onBack }) => {
  return (
    <div className="fixed top-[30%] right-[33vw] z-50 pointer w-[35vw] h-auto bg-white rounded-[1vw] text-[1.5vw] shadow-sm">
      <div className="m-[2vw]">
        <div className="flex justify-between items-center mb-[3vw] ">
          <div className="font-bold text-[1.2vw] ">문의글 내용 상세조회</div>
          <button onClick={onBack} className="font-bold cursor-pointer">
            x`
          </button>
        </div>
        <div className="grid  gap-x-[1vw] gap-y-[1.5vw]">
          <div>{query.content}</div>
        </div>
      </div>
      <div className="mt-[4vw] "></div>
    </div>
  );
};

export default QueryDetail;
