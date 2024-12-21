import React, { useState, useEffect } from "react";
import styled from "styled-components";
import postDetailData from "../json/PostDetail.json";
import { Button, Input } from "antd";

interface Comment {
  commentId: number;
  comment: string;
  nickName: string;
  createdAt: string | null;
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

  return (
    <Container>
      <BackButton onClick={onBack}>← 이전</BackButton>
      <Title>{postDetail.title}</Title>
      <div style={{ display: "flex" }}>
        <Author>{postDetail.nickName}</Author>
        <CreatedAt>{postDetail.createdAt}</CreatedAt>
      </div>
      <Content>{postDetail.content}</Content>
      <Divider />
      <CommentsTitle>댓글 {postDetail.commentCount}</CommentsTitle>
      <CommentsList>
        {comments.map((comment) => (
          <Comment key={comment.commentId}>
            <div style={{ display: "flex", gap: "7px", marginBottom: "10px" }}>
              {comment.nickName}
              <CreatedAt>{comment.createdAt}</CreatedAt>
            </div>
            {comment.comment}
          </Comment>
        ))}
      </CommentsList>
      <CommentInputWrapper>
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='댓글을 입력하세요.'
        />
        <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
      </CommentInputWrapper>
    </Container>
  );
};

export default PostDetail;

// 스타일 정의
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

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 1.6rem;
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
