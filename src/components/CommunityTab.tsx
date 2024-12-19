// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import community from "../images/community.png";
import communitytalk from "../images/communitytalk.png";
import communityposts from "../json/Community.json";
import CreatePost from "./CreatePost";
import XIcon from "../images/xIcon.png";
import CommentIcon from "../images/comment.png"
import { Dropdown, Menu, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";


const CommunityTab = ({ bookId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [createPostBtn, setCreatePostBtn] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchPage, setSearchPage] = useState("");
  const [filterPost, setFilterPost] = useState([]);
  const navigate = useNavigate(); // 페이지 이동 훅


  // 목데이터 교체
  useEffect(() => {
    setFilterPost(communityposts.questionList);
  }, []);

  const handleBannerClickOn = () => {
    setIsClicked(true);
  };

  const handleBannerClickOff = () => {
    setIsClicked(false);
  };

  const handleCreatePostBtnClick = () => {
    setCreatePostBtn(true);
  };

  const handleBackFromWriting = () => {
    setCreatePostBtn(false);
  };

  const handlePostClick = (questionId) => {
    navigate(`/post/${questionId}`); // 상세 페이지로 이동
  };

  const items = [
    { key: "1", label: "ch1" },
    { key: "2", label: "ch2" },
    { key: "3", label: "ch3" },
    { key: "4", label: "a danger item" },
  ];

  const menu = (
    <Menu
      items={items}
      onClick={(e) => {
        console.log(`Selected: ${e.key}`);
      }}
    />
  );

  return (
    <div>
      {!isClicked ? (
        <BannerWrapper>
          <BannerIcon src={community} onClick={handleBannerClickOn} />
          <BannerTalkIcon src={communitytalk} onClick={handleBannerClickOn} />
        </BannerWrapper>
      ) : null}

      <ModalRoot isClicked={isClicked}>
        <CloseButton onClick={handleBannerClickOff} src={XIcon} />

        {createPostBtn ? (
          <CreatePost
            onBack={handleBackFromWriting}
            bookId={bookId}
            userEmail='example@gmail.com'
          />
        ) : (
          <>
            <Title>커뮤니티</Title>
            <SearchWrapper>
              <TitleInput
                placeholder='게시글 제목을 검색해보세요.'
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <PageInput
                placeholder='페이지'
                value={searchPage}
                onChange={(e) => setSearchPage(e.target.value)}
              />
              <ChapterDropdown
                placement='bottomRight'
                overlay={menu}
                trigger={["click"]}
              >
                <a href='#' onClick={(e) => e.preventDefault()}>
                  <ChapterButton>챕터 ▼</ChapterButton>
                </a>
              </ChapterDropdown>
            </SearchWrapper>
            <PostList>
              {filterPost.map((post) => (
                <CommunityBox
                  key={post.questionId}
                  onClick={() => handlePostClick(post.questionId)}
                >
                  <PostTitle>{post.title}</PostTitle>
                  <PostContent>{post.content}</PostContent>
                  <Divider />
                  <PostFooter>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ChapterTag>{post.chapter}</ChapterTag>
                      <PostContent>{post.createdAt}</PostContent>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ImageIcon src={CommentIcon} />
                      <PostContent>{post.commentCount}</PostContent>
                    </div>
                  </PostFooter>
                </CommunityBox>
              ))}
            </PostList>
            <WriteButton>글 작성하기</WriteButton>
          </>
        )}
      </ModalRoot>
    </div>
  );
};

const WriteButton = styled.div`
  background-color: #9772b6;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1.1vw;
  color: white;
  cursor: pointer;
`;

const ImageIcon = styled.img`
  width: 0.8vw;
  height: 0.8vw;
  color: gray;
  margin-right: 3px;
`

const ChapterTag = styled.div`
  background-color: #e8d8f5;
  border-radius: 6px;
  font-size: 0.6vw;
  color: #6b448b;
  padding: 3px;
  margin-right: 3px;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 0.8vw;
  margin-bottom: 0.4vw;

`;

const ChapterButton = styled(Button)`
  height: 2vw;
`;
const ChapterDropdown = styled(Dropdown)`
  display: flex;
  flex-direction: row;
`;
const BannerWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 2vw;
  right: 2vw;
`;

const BannerIcon = styled.img`
  width: 3vw;
  cursor: pointer;
`;

const BannerTalkIcon = styled.img`
  width: 20vw;
  margin-left: 1vw;
  cursor: pointer;
`;

const ModalRoot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 50;
  width: 25vw;
  height: 100vh;
  background-color: white;
  font-size: 1.5vw;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) =>
    props.isClicked ? "translateX(0)" : "translateX(100%)"};
`;

const CloseButton = styled.img`
  width: 1vw;
  height: 1vw;
  position: absolute;
  right: 1vw;
  top: 1vw;
  cursor: pointer;
  background-color: transparent;
  border-radius: 20%;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #d8d8d8;
    transform: scale(1.3);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.div`
  font-size: 1.2vw;
  font-weight: bold;
  margin: 1vw;
  height: 2vw;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1vw;
  gap: 5px;
`;

const TitleInput = styled(Input)`
  height: 2vw;
`;

const PageInput = styled(Input)`
  width: 18%;
  height: 2vw;
`;

const StyledButton = styled(Button)`
  border-color: #c5b5f7;
  font-size: 1vw;
  margin: 0.5vw;
  &:hover {
    background-color: #c5b5f7;
  }
`;

const PostList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const CommunityBox = styled.div`
  padding: 1vw;
  margin: 1vw;
  border: 1px solid #ccc;
  border-radius: 0.5vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const PostTitle = styled.h3`
  font-size: 0.8vw;
`;

const PostContent = styled.p`
  font-size: 0.7vw;
  color: gray;
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.8vw;
  color: gray;
`;

export default CommunityTab;
