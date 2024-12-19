import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import postDetailData from "../json/PostDetail.json"; // 파일 이름 변경

const PostDetail = () => {
  const { questionId } = useParams(); // questionId 받아오기
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  interface Comment {
    commentId: number;
    comment: string;
    nickName: string;
    createdAt: string | null;
  }
  
  interface PostDetail {
    questionId: number;
    title: string;
    content: string;
    commentCount: number;
    chapter: string;
    createdAt: string;
    nickName: string;
    commentList: Comment[];
  }  

  useEffect(() => {
    // 목데이터에서 해당 questionId의 데이터를 가져오기
    const foundPost = postDetailData.PostDetail.find(
      // @ts-ignore
      (post) => post.questionId === parseInt(questionId, 10)
    );
    if (foundPost) {
      setPostDetail(foundPost);
      setComments(foundPost.commentList); // 댓글 초기화
    }
  }, [questionId]);

  const handleCommentSubmit = () => {
    // 새로운 댓글 추가
    // const newComment = {
    //   commentId: comments.length + 1,
    //   comment,
    //   nickName: "현재 사용자", // 임의 값
    //   createdAt: new Date().toISOString(), // 현재 시간
    // };
    // setComments((prevComments) => [...prevComments, newComment]);
    // setComment(""); // 입력란 초기화
  };

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>{postDetail.title}</Title>
      <Author>작성자: {postDetail.nickName}</Author>
      <CreatedAt>작성일: {postDetail.createdAt}</CreatedAt>
      <Content>{postDetail.content}</Content>
      <Divider />
      <CommentsTitle>댓글</CommentsTitle>
      <CommentsList>
        {comments.map((comment, index) => (
          <Comment key={index}>
            <strong>{comment.nickName}</strong>: {comment.comment}
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

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Author = styled.div`
  font-size: 1rem;
  color: gray;
`;

const CreatedAt = styled.div`
  font-size: 0.9rem;
  color: gray;
`;

const Content = styled.p`
  font-size: 1.1rem;
  margin: 20px 0;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
`;

const CommentsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const CommentsList = styled.div`
  margin-bottom: 20px;
`;

const Comment = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CommentInput = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
