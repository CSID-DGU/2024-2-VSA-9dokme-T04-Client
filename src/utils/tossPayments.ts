export const initializeTossPayments = (clientKey: string) => {
  if (!(window as any).TossPayments) {
    throw new Error("TossPayments SDK가 로드되지 않았습니다.");
  }
  return (window as any).TossPayments(clientKey);
};
