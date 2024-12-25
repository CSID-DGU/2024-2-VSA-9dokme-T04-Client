// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import postDetailData from "../json/PostDetail.json";
// import { Button, Input } from "antd";

// interface Comment {
//   commentId: number;
//   comment: string;
//   nickName: string;
//   createdAt: string | null;
// }

// interface PostDetailType {
//   questionId: number;
//   title: string;
//   content: string;
//   commentCount: number;
//   chapter: string;
//   createdAt: string;
//   nickName: string;
//   commentList: Comment[];
// }

// interface PostDetailProps {
//   questionId: number;
//   onBack: () => void;
// }

// const PostDetail: React.FC<PostDetailProps> = ({ questionId, onBack }) => {
//   const [postDetail, setPostDetail] = useState<PostDetailType | null>(null);
//   const [comment, setComment] = useState<string>("");
//   const [comments, setComments] = useState<Comment[]>([]);

//   useEffect(() => {
//     const foundPost = (
//       postDetailData as { PostDetail: PostDetailType[] }
//     ).PostDetail.find((post) => post.questionId === questionId);

//     if (foundPost) {
//       setPostDetail(foundPost);
//       setComments(foundPost.commentList);
//     }
//   }, [questionId]);

//   if (!postDetail) {
//     return <div>Loading...</div>;
//   }

//   const handleCommentSubmit = () => {
//     if (comment.trim()) {
//       const newComment: Comment = {
//         commentId: comments.length + 1,
//         comment,
//         nickName: "현재 사용자",
//         createdAt: new Date().toISOString(),
//       };
//       setComments((prevComments) => [...prevComments, newComment]);
//       setComment("");
//     }
//   };

//   return (
//     <Container>
//       <BackButton onClick={onBack}>← 이전</BackButton>
//       <Title>{postDetail.title}</Title>
//       <div style={{ display: "flex" }}>
//         <Author>{postDetail.nickName}</Author>
//         <CreatedAt>{postDetail.createdAt}</CreatedAt>
//       </div>
//       <Content>{postDetail.content}</Content>
//       <Divider />
//       <CommentsTitle>댓글 {postDetail.commentCount}</CommentsTitle>
//       <CommentsList>
//         {comments.map((comment) => (
//           <Comment key={comment.commentId}>
//             <div style={{ display: "flex", gap: "7px", marginBottom: "10px" }}>
//               {comment.nickName}
//               <CreatedAt>{comment.createdAt}</CreatedAt>
//             </div>
//             {comment.comment}
//           </Comment>
//         ))}
//       </CommentsList>
//       <CommentInputWrapper>
//         <CommentInput
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder='댓글을 입력하세요.'
//         />
//         <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
//       </CommentInputWrapper>
//     </Container>
//   );
// };

// export default PostDetail;

// // 스타일 정의
// const BackButton = styled.button`
//   margin-bottom: 20px;
//   background: none;
//   border: none;
//   font-size: 1rem;
//   cursor: pointer;
//   color: #ad7ed1;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Container = styled.div`
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 1.6rem;
//   margin-bottom: 10px;
// `;

// const Author = styled.div`
//   font-size: 1rem;
//   margin-right: 5px;
// `;

// const CreatedAt = styled.div`
//   font-size: 1rem;
//   color: #b4b4b4;
// `;

// const Content = styled.p`
//   font-size: 1rem;
//   margin: 20px 0;
// `;

// const Divider = styled.hr`
//   border: none;
//   height: 1px;
//   background-color: #e0e0e0;
//   margin: 20px 0;
// `;

// const CommentsTitle = styled.h2`
//   font-weight: bold;
//   font-size: 1.1rem;
//   margin-bottom: 10px;
// `;

// const CommentsList = styled.div`
//   margin-bottom: 20px;
// `;

// const Comment = styled.div`
//   margin-bottom: 10px;
//   padding: 10px;
//   background-color: white;
//   border-radius: 5px;
//   border: 0.5px solid #ccc;
//   font-size: 1rem;
// `;

// const CommentInputWrapper = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const CommentInput = styled(Input)`
//   height: 60px;
// `;

// const SubmitButton = styled(Button)`
//   height: 60px;
// `;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import postDetailData from "../json/PostDetail.json";
import { Button, Input } from "antd";

interface Comment {
  commentId: number;
  comment: string;
  nickName: string;
  createdAt: string | null;
  isAiGenerated?: boolean; // AI 답변 여부
}

interface PostDetailType {
  questionId: number;
  title: string;
  content: string;
  commentCount: number;
  chapter: string;
  createdAt: string;
  nickName: string;
  commentList: Comment[];
}

interface PostDetailProps {
  questionId: number;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ questionId, onBack }) => {
  const [postDetail, setPostDetail] = useState<PostDetailType | null>(null);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

  useEffect(() => {
    const foundPost = (
      postDetailData as { PostDetail: PostDetailType[] }
    ).PostDetail.find((post) => post.questionId === questionId);

    if (foundPost) {
      setPostDetail(foundPost);
      setComments(foundPost.commentList);
    }
  }, [questionId]);

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        commentId: comments.length + 1,
        comment,
        nickName: "현재 사용자",
        createdAt: new Date().toISOString(),
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");
    }
  };

  const handleGenerateAiReply = () => {
    setIsGeneratingReply(true);
    setTimeout(() => {
      const aiReply: Comment = {
        commentId: comments.length + 1,
        comment:
          "이벤트 처리시에는 시간별로 처리 순서르 정확히 유지하는 것이 중요하므로, 같은 시간대의 이벤트 처리 정책을 미리 정의해두시는게 좋습니다. Priority Queue를 사용하면 삽입과 추출 모두 평균 O(log N)의 시간 복잡도를 가지므로, 성능이 중요한 시뮬레이션에 적합합니다.",
        nickName: "AI Assistant",
        createdAt: new Date().toISOString(),
        isAiGenerated: true,
      };
      setComments((prevComments) => [...prevComments, aiReply]);
      setIsGeneratingReply(false);
    }, 5000); // 5초 지연
  };

  return (
    <Container>
      <BackButton onClick={onBack}>← 이전</BackButton>
      <Title>{postDetail.title}</Title>
      <div style={{ display: "flex" }}>
        <Author>{postDetail.nickName}</Author>
        <CreatedAt>{postDetail.createdAt}</CreatedAt>
      </div>
      <Content>{postDetail.content}</Content>
      <AiReplyButton>
        <Button
          onClick={handleGenerateAiReply}
          loading={isGeneratingReply}
          disabled={isGeneratingReply}
          type="primary"
        >
          AI 답변 생성
        </Button>
      </AiReplyButton>
      <Divider />
      <CommentsTitle>댓글 {comments.length}</CommentsTitle>
      <CommentsList>
        {comments.map((comment) => (
          <Comment key={comment.commentId}>
            <div style={{ display: "flex", gap: "7px", marginBottom: "10px" }}>
              <span>{comment.nickName}</span>
              {comment.isAiGenerated && <AiTag>✨#AI 답변✨</AiTag>}
              <CreatedAt>
                {new Date(comment.createdAt!).toLocaleDateString("en-CA")}
              </CreatedAt>
            </div>
            <p>{comment.comment}</p>
          </Comment>
        ))}
      </CommentsList>
      <CommentInputWrapper>
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요."
        />
        <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
      </CommentInputWrapper>
    </Container>
  );
};

export default PostDetail;

// 스타일 정의
const Container = styled.div`
  padding: 20px;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #ad7ed1;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 1.2vw;
  margin-bottom: 10px;
`;

const Author = styled.div`
  font-size: 1rem;
  margin-right: 5px;
`;

const CreatedAt = styled.div`
  font-size: 1rem;
  color: #b4b4b4;
`;

const Content = styled.p`
  font-size: 1rem;
  margin: 20px 0;
`;

const AiReplyButton = styled.div`
  margin-bottom: 20px;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
`;

const CommentsTitle = styled.h2`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const CommentsList = styled.div`
  margin-bottom: 20px;
`;

const Comment = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 0.5px solid #ccc;
  font-size: 1rem;
`;

const AiTag = styled.span`
  background-color: #e8d8f5;
  color: #6b448b;
  padding: 0 5px;
  border-radius: 3px;
  font-size: 0.8rem;
  margin-left: 5px;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CommentInput = styled(Input)`
  height: 60px;
`;

const SubmitButton = styled(Button)`
  height: 60px;
`;
