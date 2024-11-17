import React, { useEffect, useState } from "react";

const PaymentPage: React.FC = () => {
  const [jsons, setJsons] = useState<any>({});
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailureModalVisible, setFailureModalVisible] = useState(false);

  const baseURL = "https://www.9dokme.p-e.kr/";
  const clientKey = "test_ck_d46qopOB89xLAkMQnk0YrZmM75y0";

  useEffect(() => {
    const email =
      (document.getElementById("userEmail") as HTMLInputElement)?.value || "";
    const name =
      (document.getElementById("userName") as HTMLInputElement)?.value || "";

    setUserEmail(email);
    setUserName(name);

    const tossPayments = (window as any).TossPayments(clientKey);

    setJsons({
      card: {
        customerKey: "test_customer_key",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
      },
    });

    const handleKakaoPayClick = () => {
      requestPay("KAKAO");
    };

    const kakaoPayImg = document.getElementById("kakaoPayImg");
    if (kakaoPayImg) {
      kakaoPayImg.addEventListener("click", handleKakaoPayClick);
    }

    return () => {
      if (kakaoPayImg) {
        kakaoPayImg.removeEventListener("click", handleKakaoPayClick);
      }
    };
  }, []);

  const billing = (method: string, requestJson: any) => {
    const tossPayments = (window as any).TossPayments(clientKey);

    tossPayments
      .requestBillingAuth(method, requestJson)
      .then((response: any) => {
        verifyPayment(response.imp_uid, "TOSS");
        setSuccessModalVisible(true);
      })
      .catch(() => {
        setFailureModalVisible(true);
      });
  };

  const requestPay = (paymentType: string) => {
    const IMP = (window as any).IMP;
    IMP.init("imp20450277");

    IMP.request_pay(
      {
        pg: "kakaopay.TCSUBSCRIP",
        pay_method: "card",
        merchant_uid: "order_no_" + new Date().getTime(),
        name: "9dokme 정기결제 등록",
        amount: 9900,
        buyer_email: userEmail,
        buyer_name: userName,
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구",
        buyer_postcode: "123-456",
      },
      (response: any) => {
        if (response.success) {
          setSuccessModalVisible(true);
          verifyPayment(response.imp_uid, paymentType);
        } else {
          setFailureModalVisible(true);
        }
      }
    );
  };

  const verifyPayment = (imp_uid: string, paymentType: string) => {
    fetch(`${baseURL}payments/complete?imp_uid=${imp_uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pgProvider: paymentType === "KAKAO" ? "kakaopay" : "toss",
        payMethod: "card",
        merchantUid: "order_no_" + new Date().getTime(),
        name: "구독결제",
        amount: 9900,
        buyerEmail: userEmail,
        buyerName: userName,
        buyerTel: "010-1234-5678",
        buyerAddr: "서울특별시 강남구",
        buyerPostcode: "123-456",
        paymentType,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("서버 응답:", data);
      })
      .catch((error) => {
        console.error("결제 검증 중 오류 발생:", error);
      });
  };

  return (
    <div className="container">
      <h1>9dokme 정기결제 등록</h1>
      <p className="price">월 9,900원</p>
      <hr />
      <ul className="features">
        <li>전공책 pdf 대여 가능</li>
        <li>필기 기능 사용 가능</li>
        <li>질의응답 커뮤니티 사용 가능</li>
      </ul>
      <hr />
      <p className="choose-text">결제 수단을 선택하세요.</p>
      <div className="button-group">
        <button
          className="payment-button"
          onClick={() => billing("카드", jsons.card)}
          style={{ padding: "12px 25px" }}
        >
          <span>신용 / 체크</span>
        </button>
        <img
          src="https://www.9dokme.p-e.kr/images/kakaoPaymentImg.png"
          alt="kakao pay"
          id="kakaoPayImg"
          className="kakao-pay-img"
        />
      </div>
      {isSuccessModalVisible && (
        <div id="paymentModal" className="modal">
          <div className="modal-content">
            <h3>결제가 완료되었습니다.</h3>
            <p>구독 만료일은 2024-09-22입니다.</p>
            <button
              onClick={() =>
                (window.location.href =
                  "https://www.9dokme.p-e.kr/api/mainpage")
              }
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      )}
      {isFailureModalVisible && (
        <div id="failureModal" className="modal">
          <div className="modal-content">
            <h3>정기결제 등록에 실패했습니다.</h3>
            <button onClick={() => setFailureModalVisible(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
