import React, { useState } from "react";
import { initializeTossPayments } from "../utils/tossPayments";
import { requestBilling } from "../utils/paymentHandlers";
import kakaoLogo from "../images/kakao.png";

const PaymentPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const clientKey = "test_ck_d46qopOB89xLAkMQnk0YrZmM75y0";

  const tossPayments = initializeTossPayments(clientKey);

  const handleCardPayment = async () => {
    const requestJson = {
      customerKey: "test_customer_key",
      successUrl: window.location.origin + "/success",
      failUrl: window.location.origin + "/fail",
    };

    try {
      setLoading(true);
      await requestBilling(tossPayments, "카드", requestJson);
      alert("결제가 완료되었습니다.");
    } catch {
      alert("결제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-xl font-bold text-purple-700 mb-2">
          9dokme 정기결제 등록
        </h1>
        <p className="text-2xl font-semibold text-indigo-600 mb-6">
          월 9,900원
        </p>
        <hr className="border-gray-300 mb-6" />
        <ul className="text-gray-600 space-y-3 mb-6">
          <li>📚 전공책 PDF 대여 가능</li>
          <li>✏️ 필기 기능 사용 가능</li>
          <li>💬 질의응답 커뮤니티 사용 가능</li>
        </ul>
        <p className="text-sm text-gray-500 mb-4">결제 수단을 선택하세요.</p>
        <div className="flex justify-between items-center space-x-4">
          <button
            onClick={handleCardPayment}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            신용 / 체크
          </button>
          <button
            className="flex-1 px-4 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
            onClick={() => alert("카카오페이 결제를 선택하셨습니다.")}
          >
            <img src={kakaoLogo} className="h-4 mx-auto" />
            카카오페이
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
