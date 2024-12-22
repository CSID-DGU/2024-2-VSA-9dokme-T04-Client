// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../api/axios";
import { BASE_URL } from "../env";
import AddComment from "./AddComment";
import postdetail from "../json/PostDetail.json";
import back from "../images/back.png";

interface Props {
  questionId: number;
  chapter: string;
  setSelectedQuestionId: React.Dispatch<React.SetStateAction<number | null>>;
  handleBannerClickOff: () => void;
}

const DetailPost: React.FC<Props> = ({
  questionId,
  chapter,
  setSelectedQuestionId,
  handleBannerClickOff,
}) => {
  const [questionDetail, setQuestionDetail] = useState(null);
  const [onBackBtn, setOnBackBtn] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchQuestionDetail = async () => {
  //     try {
  //       const response = await API.get(
  //         `${BASE_URL}/api/questiondetail/${questionId}`
  //       );
  //       if (response.status === 200) {
  //         setQuestionDetail(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching question detail:", error);
  //     }
  //   };

  //   if (questionId) {
  //     fetchQuestionDetail();
  //   }
  // }, [questionId]);

  useEffect(() => {
    console.log("postdetail:", postdetail.PostDetail);
    if (questionId !== null) {
      const filteredQuestionDetail = postdetail.PostDetail.filter(
        (post) => post.questionId === questionId
      );
      if (filteredQuestionDetail.length > 0) {
        setQuestionDetail(filteredQuestionDetail[0]);
        console.log("상세글: ", questionDetail);
      } else {
        console.log("해당 질문을 찾을 수 없습니다.");
      }
      setQuestionDetail(questionDetail);
    }
  }, []);

  const handleBackBtnClick = () => {
    setSelectedQuestionId(null);
  };

  const handleClickOnBackBtn = () => {
    setOnBackBtn(!onBackBtn);
  };

  return (
    <div className="fixed top-0 right-0 z-50 pointer w-[30vw] h-auto bg-white rounded-bl-[2vw] text-[1.5vw] shadow-sm">
      <div className="flex justify-between pl-[2vw] pr-[2vw] pt-[1vw]">
        <img
          className="w-[2vw] cursor-pointer"
          src={back}
          alt="arrow"
          onClick={handleBackBtnClick}
        />
        <div
          className="font-bold cursor-pointer"
          onClick={handleBannerClickOff}
        >
          x
        </div>
      </div>
      {questionDetail ? (
        <div className="m-[1vw] bg-white shadow-lg rounded-lg p-4 border-solid border-[0.05vw] border-slate-300 mt-[1.5vw]">
          <h2 className="font-bold text-[1vw]">{questionDetail.title}</h2>
          <span className=" text-[1vw] bg-customColor rounded px-[0.5vw]">
            {chapter}
          </span>
          <br />{" "}
          <p className="text-[1vw] mt-[0.3vw] text-slate-500">
            작성자: {questionDetail.nickName || "익명"}
          </p>
          <br />
          <p className=" text-[0.5vw] ">{questionDetail.question.content}</p>
          <hr className="mt-[1vw] mb-[0.5vw] border-slate-400" />
          {questionDetail.commentList.length > 0 ? (
            questionDetail.commentList.map((comment) => (
              <div key={comment.commentId} className="m-[1vw]">
                <p className="text-[1vw] text-slate-600">
                  {comment.nickName || "익명"}
                </p>
                <p className="text-[1vw]">{comment.content}</p>
                <hr className="mt-[1vw] mb-[0.5vw] border-slate-400" />
              </div>
            ))
          ) : (
            <div className="h-[10vw] font-bold flex justify-center items-center text-[1vw]">
              아직 작성된 댓글이 없습니다. <br />
              첫번째로 댓글을 남겨보세요! 👇
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">해당 게시물을 찾을 수 없습니다.</div>
      )}
      <div className="w-[100%]">
        {onBackBtn === true ? (
          <AddComment onBackFn={handleClickOnBackBtn} questionId={questionId} />
        ) : (
          <WritingBtn onClick={handleClickOnBackBtn}>댓글 남기기</WritingBtn>
        )}
      </div>
    </div>
  );
};

const WritingBtn = styled.div`
  margin-top: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #2519b2;
  height: 4vw;
  font-weight: bold;
  color: white;
  font-size: 1.5vw;
  cursor: pointer;
`;
const DetailContainer = styled.div`
  max-height: 80vh; // 최대 높이 설정
  overflow-y: auto; // 내용이 넘칠 경우 스크롤
  padding: 2vw;
  margin-top: 2vw;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: solid 1px #ccc;
`;

export default DetailPost;
