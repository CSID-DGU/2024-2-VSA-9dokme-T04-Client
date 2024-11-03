import * as React from "react";
import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import MyPostDetail from "../components/MyPosttDetail"; // MyPostDetail 컴포넌트 임포트
import Sidebanner from "../components/Sidebanner";
import axios from "axios";
import { BASE_URL } from "../env";

interface Inquire {
  questionId: number;
  bookId: number;
  title: string;
  content: string;
  commentCount: number;
  chapter: number;
  page: number;
  createdAt: string;
  nickName: string;
}

interface InquireResponse {
  content: Inquire[];
  totalElements: number;
  totalPages: number;
  size: number;
}

const MyArticle: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedInquire, setSelectedInquire] = useState<Inquire | null>(null);
  const [isDetailView, setIsDetailView] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Inquire[]>([]);
  const [memberId] = useState<number>(1);

  const handlePostClick = (post: Inquire) => {
    setSelectedInquire(post);
    setIsDetailView(true);
  };

  const handleBack = () => {
    setIsDetailView(false);
  };

  const handleSearchBtnClick = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/myHistory`, {
        params: {
          page: page,
          memberId: memberId,
        },
      });

      const { content } = response.data;
      const filtered = content.filter((post: Inquire) =>
        post.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
      setFilteredPosts(filtered);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  useEffect(() => {
    handleSearchBtnClick();
  }, [page]);

  return (
    <div className="w-screen h-[150vh] bg-customColor bg-opacity-20 p-[2vw] relative">
      <Sidebanner />
      <div className="w-[80vw] mx-auto bg-white p-[2vw] rounded-lg shadow-lg">
        {isDetailView && selectedInquire ? (
          <MyPostDetail postDetail={selectedInquire} onBack={handleBack} />
        ) : (
          <>
            <div className="text-center font-bold text-[1.5vw] mb-[1vw]">
              나의 작성글
            </div>
            <div className="flex w-full mb-[2vw]">
              <Input
                className="flex-grow m-[0.5vw]"
                placeholder="게시글 제목을 통해 검색해보세요."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <Button
                variant="outline"
                className="border-[#C5B5F7] text-[1vw] hover:bg-[#C5B5F7] m-[0.5vw]"
                onClick={handleSearchBtnClick}
              >
                검색
              </Button>
            </div>
            <div className="h-full flex flex-col overflow-y-auto">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <CommunityBox
                    key={post.questionId}
                    title={post.title}
                    content={post.content}
                    commentsCount={post.commentCount}
                    chapter={post.chapter}
                    onClick={() => handlePostClick(post)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  해당 제목의 작성글이 없습니다.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CommunityBox: React.FC<{
  title: string;
  content: string;
  commentsCount: number;
  chapter: number;
  onClick: () => void;
}> = ({ title, content, commentsCount, chapter, onClick }) => {
  return (
    <div
      className="m-[1vw] bg-white shadow-lg rounded-lg p-4 border-solid border-[0.05vw] border-slate-300 mt-[1.5vw]"
      onClick={onClick}
    >
      <h2 className="font-bold text-[1.2vw]">{title}</h2>
      <hr className="mt-[0.5vw] mb-[0.5vw] border-slate-400" />
      <p className="text-gray-400 text-[1vw]">
        {content.length > 20 ? `${content.substring(0, 20)}...` : content}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500 text-[1vw]">댓글 {commentsCount}</span>
        {chapter && (
          <span className="text-[1vw] bg-customColor rounded px-[0.5vw]">
            Chapter {chapter}
          </span>
        )}
      </div>
    </div>
  );
};

export default MyArticle;
