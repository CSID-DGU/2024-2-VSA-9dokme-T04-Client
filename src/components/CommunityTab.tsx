// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../api/axios";
import community from "../images/community.png";
import communitytalk from "../images/communitytalk.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import communityposts from "../json/Community.json";
import postdetail from "../json/PostDetail.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BASE_URL } from "../env";
import DetailPost from "./DetailPost";
import CreatePost from "./CreatePost";

const CommunityTab = ({ bookId }) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [createPostBtn, setCreatePostBtn] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchChapter, setSearchChapter] = useState("");
  const [searchPage, setSearchPage] = useState("");
  const [filterPost, setFilterPost] = useState([]);
  const [questionDetail, setQuestionDetail] = useState(null);

  // useEffect(() => {
  //   const fetchCommunityPosts = async () => {
  //     try {
  //       const response = await API.get(
  //         `${BASE_URL}/api/questionlist/${bookId}?chapter=${searchChapter}&bookPage=${searchPage}`
  //       );
  //       if (response.status === 200) {
  //         setFilterPost(response.data.questionList);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching community posts:", error);
  //     }
  //   };

  //   fetchCommunityPosts();
  // }, [bookId, searchChapter, searchPage]);

  /*목데이터 교체*/
  useEffect(() => {
    setFilterPost(communityposts.questionList);
  }, []);

  /*
  useEffect(() => {
    if (selectedQuestionId !== null) {
      const fetchQuestionDetail = async () => {
        try {
          const response = await API.get(
            `${BASE_URL}/api/questiondetail/${selectedQuestionId}`
          );
          if (response.status === 200) {
            setQuestionDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching question detail:", error);
        }
      };

      fetchQuestionDetail();
    }
  }, [selectedQuestionId]);
  */
  useEffect(() => {
    if (selectedQuestionId !== null) {
      const filteredQuestionDetail = postdetail.PostDetail.filter(
        (post) => post.questionId === selectedQuestionId
      );
      if (filteredQuestionDetail.length > 0) {
        const fetchQuestionDetail = filteredQuestionDetail[0];
        console.log(fetchQuestionDetail);
      } else {
        console.log("해당 질문을 찾을 수 없습니다.");
      }
    }
  }, [selectedQuestionId]);

  const handlePostClick = (questionId) => {
    setSelectedQuestionId(questionId);
  };

  const handleBannerClickOn = () => {
    if (!isClicked) setIsClicked(true);
  };

  const handleBannerClickOff = () => {
    if (isClicked) setIsClicked(false);
  };

  const handleCreatePostBtnClick = () => {
    setCreatePostBtn(true);
  };

  const handleBackFromWriting = () => {
    setCreatePostBtn(false);
  };

  // const handleSearch = () => {
  //   const fetchCommunityPosts = async () => {
  //     try {
  //       const response = await API.get(
  //         `${BASE_URL}/api/questionlist/${bookId}?chapter=${searchChapter}&bookPage=${searchPage}`
  //       );
  //       if (response.status === 200) {
  //         setFilterPost(response.data.questionList);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching community posts:", error);
  //     }
  //   };

  //   fetchCommunityPosts();
  // };
  const handleSearch = () => {
    const filtered = communityposts.questionList.filter((post) => {
      const matchTitle =
        searchTitle === "" ||
        post.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchChapter =
        searchChapter === "" ||
        post.chapter.toLowerCase() === searchChapter.toLowerCase();
      const matchPage =
        searchPage === "" ||
        post.content.toLowerCase().includes(searchPage.toLowerCase());
      return matchTitle && matchChapter && matchPage;
    });

    setFilterPost(filtered.length > 0 ? filtered : communityposts.questionList);
  };

  const selectedPost = filterPost.find(
    (post) => post.questionId === selectedQuestionId
  );

  return (
    <div className="fixed top-0 right-0 z-50 ">
      {!isClicked ? (
        <div className="flex">
          <img
            src={community}
            className="w-[3vw] fixed top-[2vw] right-[2vw]"
            onClick={handleBannerClickOn}
          />
          <img
            src={communitytalk}
            className="w-[20vw] fixed top-[2vw] right-[3vw]"
            onClick={handleBannerClickOn}
          />
        </div>
      ) : (
        <div className="pointer fixed top-0 right-0 z-50 w-[30vw] h-[80vh] bg-white rounded-bl-[2vw] text-[1.5vw] shadow-sm flex flex-col">
          <div
            onClick={handleBannerClickOff}
            className="text-right font-bold cursor-pointer p-[1vw]"
          >
            x
          </div>

          {createPostBtn ? (
            <CreatePost
              onBack={handleBackFromWriting}
              bookId={bookId}
              userEmail="example@gmail.com"
            />
          ) : (
            <>
              {selectedQuestionId === null ? (
                <>
                  <div className="font-bold text-[1vw] ml-[1vw] h-[2vw]">
                    커뮤니티 게시판
                  </div>
                  <div className="flex flex-col justify-center items-center m-[1vw]">
                    <div className="flex w-full mb-[1vw]">
                      <Input
                        className="flex-grow m-[0.5vw] text-[1vw]"
                        placeholder="게시글 제목을 검색해보세요."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="border border-[#C5B5F7] rounded-[0.5vw] bg-white p-[0.4vw] w-full text-[1vw] flex-grow m-[0.5vw]">
                          {searchChapter === ""
                            ? "전체챕터 ▼"
                            : `${searchChapter} ▼`}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#ffffff]">
                          <DropdownMenuItem
                            onClick={() => setSearchChapter("")}
                          >
                            전체챕터
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSearchChapter("ch1")}
                          >
                            ch1
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSearchChapter("ch2")}
                          >
                            ch2
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSearchChapter("ch5")}
                          >
                            ch5
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSearchChapter("ch6")}
                          >
                            ch6
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Input
                        className="flex-grow m-[0.5vw] text-[1vw]"
                        placeholder="페이지를 검색하세요."
                        value={searchPage}
                        onChange={(e) => setSearchPage(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        className="border-[#C5B5F7] text-[1vw] hover:bg-[#C5B5F7] m-[0.5vw]"
                        onClick={handleSearch}
                      >
                        검색
                      </Button>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    {filterPost.map((post) => (
                      <CommunityBox
                        key={post.questionId}
                        title={post.title}
                        content={post.content}
                        commentsCount={post.commentCount}
                        chapter={post.chapter}
                        onClick={() => handlePostClick(post.questionId)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                questionDetail && (
                  <DetailPost
                    questionId={selectedQuestionId}
                    chapter={searchChapter}
                    setSelectedQuestionId={setSelectedQuestionId}
                    handleBannerClickOff={handleBannerClickOff}
                  />
                )
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const CommunityBox = ({ title, content, commentsCount, chapter, onClick }) => (
  <div
    onClick={onClick}
    className="p-[1vw] mb-[1vw] m-[1vw] border rounded-[0.5vw] shadow-sm cursor-pointer hover:bg-gray-100"
  >
    <h3 className="font-bold text-[1.2vw]">{title}</h3>
    <p className="text-[1vw] mt-[0.5vw]">{content}</p>
    <div className="text-gray-500 text-[0.8vw] mt-[1vw]">
      Chapter: {chapter}, Comments: {commentsCount}
    </div>
  </div>
);

const WritingBtn = styled.div`
  width: 33vw;
  height: 6vw;
  border-radius: 30px;
  margin-left: 10%;
  background-color: #e6e5ef;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  font-size: 1.2vw;
`;

export default CommunityTab;
