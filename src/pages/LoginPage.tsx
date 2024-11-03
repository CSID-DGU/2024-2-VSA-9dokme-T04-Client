import React from "react";
import { KAKAO_AUTH_URL } from "../auth/Auth";
import { Button } from "antd";

//필요없음
const LoginPage = () => {
  const handleKakaoButtonClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="w-screen h-full bg-customColor bg-opacity-20">
      <Button onClick={handleKakaoButtonClick}>로그인</Button>
    </div>
  );
};

export default LoginPage;
