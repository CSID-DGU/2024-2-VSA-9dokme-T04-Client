export interface Question {
  questionId: number;
  title: string;
  content: string;
  chapter: string;
  page: number;
  commentCount: number;
  nickname?: string;
  createdAt: string;
}

export interface QuestionList {
  questionList: Question[];
}
