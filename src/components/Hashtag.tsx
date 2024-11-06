import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { PRIMARY } from "../utils/colors";

interface HashtagProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string | null;
}

const Hashtag = ({ onCategoryChange, selectedCategory }: HashtagProps) => {
  const categories = [
    "전체보기",
    "공학",
    "자연",
    "예술",
    "인문/사회",
    "체육",
    "경영/경제",
  ];

  return (
    <div className="flex justify-center items-center flex-wrap gap-4">
      {categories.map((category) => (
        <StyledButton
          key={category}
          type="default"
          className={selectedCategory === category ? "selected" : ""}
          onClick={() => onCategoryChange(category)}
        >
          {category === "전체보기" ? "" : "#"}
          {category}
        </StyledButton>
      ))}
    </div>
  );
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 7vw;
  height: 3vw;
  border-radius: 3vw;
  font-size: 1.1vw;
  font-weight: bold;
  border-color: ${PRIMARY.DEFAULT};
  color: ${PRIMARY.DEFAULT};
  background-color: white;

  &.selected {
    background-color: ${PRIMARY.DEFAULT};
    border-color: white;
    color: white;
  }

  &:hover,
  &:focus {
    background-color: ${PRIMARY.DEFAULT};
    border-color: ${PRIMARY.DEFAULT};
    color: white;
  }
`;

const WritingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${PRIMARY.DEFAULT};
  height: 4vw;
  font-weight: bold;
  color: white;
  font-size: 1.5vw;
`;

export default Hashtag;
