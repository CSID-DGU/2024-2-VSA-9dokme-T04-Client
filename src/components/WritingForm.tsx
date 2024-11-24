import React, { useState } from "react";
import { Drawer, Button } from "@mui/material";
import { Input } from "../components/ui/input";
import { FileTextIcon } from "@radix-ui/react-icons";
import * as Slider from "@radix-ui/react-slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchChapter, setSearchChapter] = useState("");
  const [sliderValue, setSliderValue] = useState(50); // 슬라이더 값 상태

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]); // 슬라이더 값을 상태에 반영
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Button variant="contained" onClick={() => setIsDrawerOpen(true)}>
        열기
      </Button>

      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "60%", // 부모의 50% 너비 설정
            margin: "0 auto", // 중앙 정렬
            borderTopLeftRadius: "16px", // top-left 모서리 둥글게
            borderTopRightRadius: "16px", // top-right 모서리 둥글게
            overflow: "hidden", // 둥근 모서리가 잘 보이도록 설정
          },
        }}
      >
        <div style={{ padding: "20px" }}>
          <div className="flex flex-row">
            <p> 커뮤니티 글 작성</p>
          </div>
          <div>
            <Input className="mt-[2vw]" placeholder="제목을 입력하세요" />
            <DropdownMenu>
              <DropdownMenuTrigger className="border border-[#C5B5F7] rounded-[0.5vw] bg-white p-[0.4vw] w-full text-[1vw] flex-grow m-[0.5vw]">
                {searchChapter === "" ? "전체챕터 ▼" : `${searchChapter} ▼`}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#ffffff]">
                <DropdownMenuItem onClick={() => setSearchChapter("")}>
                  전체챕터
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchChapter("ch1")}>
                  ch1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchChapter("ch2")}>
                  ch2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchChapter("ch5")}>
                  ch5
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchChapter("ch6")}>
                  ch6
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="mt-4">
              <Slider.Root
                value={[sliderValue]} // 슬라이더 값
                onValueChange={handleSliderChange} // 값 변경 시 호출
                max={100} // 최대값 설정
                min={0} // 최소값 설정
                step={1} // 값 변화 간격 설정
                style={{ width: "100%" }} // 슬라이더 너비를 100%로 설정
              >
                <Slider.Track
                  style={{
                    backgroundColor: "#ddd", // 슬라이더 트랙 색상
                    height: "4px", // 트랙의 높이
                    borderRadius: "2px", // 트랙 모서리 둥글게
                  }}
                >
                  <Slider.Range
                    style={{
                      backgroundColor: "#9F81F7", // 범위 색상
                      height: "100%", // 범위 높이
                    }}
                  />
                </Slider.Track>
                <Slider.Thumb
                  style={{
                    width: "20px", // 핸들의 크기
                    height: "20px", // 핸들의 크기
                    backgroundColor: "#9F81F7", // 핸들의 색상
                    borderRadius: "50%", // 핸들 모서리 둥글게
                  }}
                />
              </Slider.Root>
              <p>페이지: {sliderValue}</p>
            </div>

            <Input
              className="h-[10vw] mt-[2vw] mb-[2vw]"
              placeholder="내용을 입력하세요."
            />
          </div>

          <div className="flex flex-row justify-between">
            <Button
              variant="contained"
              className="success"
              style={{ marginRight: "10px" }}
              onClick={() => setIsDrawerOpen(false)}
            >
              <FileTextIcon />
              제출하기
            </Button>
            <Button variant="outlined" onClick={() => setIsDrawerOpen(false)}>
              닫기
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
