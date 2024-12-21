import React from "react";

const subscribe = () => {
  return (
    <div className="flex flex-col justify-center items-center p-20">
      <h1>9DOKME 서비스 SubScribe</h1>
      <div>
        <h3>
          ✔️9DOKME 서비스를 구독하여 전공 교재를 PDF 서비스로 이용해보세요!
        </h3>
        <h3>✔️커뮤니티 서비스를 이용하여 사람들과 함께 토론해보세요!</h3>
        <h3>
          ✔️Premium 서비스를 구독하여, 커뮤니티 질문에 대해 신속한 AI 답변
          서비스를 받아보세요!
        </h3>
      </div>
      <div>
        <div className="flex flex-row space-between">
          <div>Standard</div>
          <div>월구독 9999원</div>
          <div></div>
        </div>
        <div className="flex flex-row space-between">
          <div>Premium</div>
          <div>월구독 12999원</div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="text-[1.2vw] w-[20vw] py-[1.5vw] bg-blue-200 text-center rounded-lg shadow-lg">
          Standard 플랜 구독하기
        </div>
        <div className="text-[1.2vw] w-[20vw] py-[1.5vw] bg-red-200 text-center rounded-lg shadow-lg">
          Premium 플랜 구독하기
        </div>
      </div>
    </div>
  );
};

export default subscribe;
