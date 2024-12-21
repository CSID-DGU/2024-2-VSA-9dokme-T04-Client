// 결제 요청 함수
export const requestBilling = async (
  tossPayments: any,
  method: string,
  requestJson: any
) => {
  try {
    const response = await tossPayments.requestBillingAuth(method, requestJson);
    console.log("결제 성공:", response);
    return response;
  } catch (error) {
    console.error("결제 실패:", error);
    throw error;
  }
};
