import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../env";

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        console.log("Authorization code:", code); // 인가 code 출력
        const res = await axios.get(
          `${BASE_URL}/api/oauth?code=${code}`
        );

        console.log(res.data);
        // 로그인 시 message 추출
        const { data: role, message } = res.data;
        
        //message에서 닉네임, 이메일, 멤버아이디 추출
        const nicknameMatch = message.match(/nickname=([^,]*)/);
        const emailMatch = message.match(/email=([^,]*)/);
        const memberIdMatch = message.match(/memberId=([^}]*)/);
        const tokenMatch = message.match(/token=([^}]*)/);

        // 추출한 값을 localStorage에 저장
        if (nicknameMatch && emailMatch) {
          const nickname = nicknameMatch[1];
          const email = emailMatch[1];
          const memberId = memberIdMatch[1];
          const token = tokenMatch[1];

          localStorage.setItem("name", nickname);
          localStorage.setItem("email", email);
          localStorage.setItem("memberId", memberId);
          localStorage.setItem("token", token);
          localStorage.setItem("role", role); // role 저장


          //콘솔 출력으로 확인
          console.log("로컬스토리지 닉네임: ", localStorage.getItem("name"));
          console.log("로컬스토리지 이메일: ", localStorage.getItem("email"));
          console.log(
            "로컬스토리지 memberId: ",
            localStorage.getItem("memberId")
          );
          console.log(
            "로컬스토리지 token: ",
            localStorage.getItem("token")
          );
          console.log(
            "로컬스토리지 role: ",
            localStorage.getItem("role")
          );
        } else {
          console.error("Failed to parse nickname or email from message");
        }
        if (localStorage.getItem("memberId") !== "6") navigate("/mainPage");
        else navigate("/admin/adminPdf/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    if (code) {
      kakaoLogin();
    }
  }, [code, navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-customColor bg-opacity-20">
      <p className="text-xl font-semibold">로그인 중입니다 ...</p>
    </div>
  );
};

export default LoginLoading;
