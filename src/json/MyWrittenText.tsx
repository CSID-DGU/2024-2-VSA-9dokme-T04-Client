export interface HistoryItem {
  question: number;
  title: string;
  createdAt: string;
}

export interface Data {
  history: HistoryItem[];
}

export interface ApiResponse {
  data: Data;
}
