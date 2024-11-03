export interface BookDetailType {
  bookId: number;
  publishDate: string;
  bookTitle: string;
  bookCategory: string;
  bookImage: string;
  author: string;
  description: string;
  isMarked: boolean;
}

export interface BookDetails {
  bookId: number;
  pdfImage: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  description: string;
  lastPage: number;
  marked: boolean;
}

export interface Books {
  books: BookDetails[];
}
