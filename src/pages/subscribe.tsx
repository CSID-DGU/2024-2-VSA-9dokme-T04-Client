import React from "react";

const Subscribe = () => {
  return (
    <div className="flex flex-col justify-center items-center px-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">9DOKME 서비스 구독 플랜</h1>
      <div className="text-lg mb-6">
        <p>
          ✔️ 9DOKME 서비스를 구독하여 전공 교재를 PDF 서비스로 이용해보세요!
        </p>
        <p>✔️ 커뮤니티 서비스를 이용하여 사람들과 함께 토론해보세요!</p>
        <p>
          ✔️ Premium 서비스를 구독하여, 커뮤니티 질문에 대해 신속한 AI 답변
          서비스를 받아보세요!
        </p>
      </div>
      <table className="table-auto border-collapse border border-gray-200 w-full max-w-4xl text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-400 p-4">🎯 플랜</th>
            <th className="border border-gray-400 p-4">💲 가격</th>
            <th className="border border-gray-400 p-4">💡 제공 서비스</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 p-4 font-medium">Standard</td>
            <td className="border border-gray-300 p-4">월구독 9,999원</td>
            <td className="border border-gray-300 p-4 text-left">
              <ul className="list-disc list-inside">
                <li>모든 교재 PDF 열람 가능</li>
                <li>교재 Chapter, Page별 커뮤니티 기능 이용 가능</li>
              </ul>
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 p-4 font-medium">Premium</td>
            <td className="border border-gray-300 p-4">월구독 12,999원</td>
            <td className="border border-gray-300 p-4 text-left">
              <ul className="list-disc list-inside">
                <li>모든 교재 PDF 열람 가능</li>
                <li>교재 Chapter, Page별 커뮤니티 기능 이용 가능</li>
                <li>커뮤니티 질문에 대한 실시간 AI 답변 서비스 이용 가능</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex gap-6 mt-20">
        <button className="w-[25vw] h-[4vw] px-6 py-3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 to-blue-500 to-90% text-white text-lg rounded-lg shadow-sm hover:shadow hover:scale-105 transition transform shadow-lg">
          Standard 플랜 구독하기
        </button>
        <button className="w-[25vw] h-[4vw] px-6 py-3 text-white text-lg rounded-lg bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 hover:scale-105 transition transform shadow-lg">
          Premium 플랜 구독하기
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
