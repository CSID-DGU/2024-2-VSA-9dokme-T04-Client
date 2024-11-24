"use client";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import aichat from "../images/aichat.png";
import Teacher from "../images/Teacher.png";

// AIChat 컴포넌트 구현
const AIChat: React.FC = () => {
  const [chatLog, setChatLog] = useState<
    { message: string; isUser?: boolean }[]
  >([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const newChatLog = [...chatLog, { message: userInput, isUser: true }];
    setChatLog(newChatLog);

    try {
      const response = await API.get("/bot/chat", {
        params: { prompt: userInput },
      });
      const botMessage = response.data;
      setChatLog([...newChatLog, { message: botMessage }]);
    } catch (error) {
      console.error("Failed to fetch response from API:", error);
      setChatLog([
        ...newChatLog,
        { message: "Error: Failed to get response from the server." },
      ]);
    }

    setUserInput("");
  };

  const handleBannerClickOn = () => {
    setIsClicked(true);
  };

  const handleBannerClickOff = () => {
    setIsClicked(false);
  };

  return (
    <>
      {!isClicked ? (
        <div style={{ position: "fixed", top: "7vw", right: "2vw" }}>
          <div className="flex">
            <img
              src={Teacher}
              className="w-[3vw] fixed top-[7vw] right-[2vw]"
              onClick={handleBannerClickOn}
            />
            <img
              src={aichat}
              className=" w-[21vw] fixed top-[7vw] right-[2vw]"
              onClick={handleBannerClickOn}
            />
          </div>
        </div>
      ) : (
        <div style={{ position: "fixed", top: "0", right: "0", zIndex: 50 }}>
          <ChatContainer>
            <CloseButton onClick={handleBannerClickOff}>×</CloseButton>
            <MessageBox className="mt-[3vw]">
              {chatLog.map((chat, index) => (
                <Message key={index} isUser={chat.isUser}>
                  {chat.message}
                </Message>
              ))}
            </MessageBox>
            <InputArea>
              <StyledInput
                placeholder="교재 내용에 대해 질문하세요!"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <StyledButton onClick={handleSendMessage}>Send</StyledButton>
            </InputArea>
          </ChatContainer>
        </div>
      )}
    </>
  );
};

// 스타일 정의
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 0px 0px 0px 12px;
  width: 30vw;
  margin: 0 auto;
  position: relative;
`;

const MessageBox = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Message = styled.div<{ isUser?: boolean }>`
  margin-bottom: 10px;
  text-align: ${(props) => (props.isUser ? "right" : "left")};
  padding: 10px;
  background-color: ${(props) => (props.isUser ? "#e3f2fd" : "#f1f8e9")};
  border-radius: 12px;
`;

const InputArea = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
  margin-right: 10px;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  color: #ffffff;
  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

export default AIChat;
