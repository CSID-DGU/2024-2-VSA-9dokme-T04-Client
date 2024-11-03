export interface Comment {
  commentId: number;
  comment: string;
  nickName: string;
  createdAt?: string;
}

export interface PostDetail {
  questionId: number;
  title: string;
  content: string;
  commentCount: number;
  createdAt: string;
  nickName: string;
  commentList: Comment[];
}

export interface PostList {
  PostDetail: PostDetail[];
}
