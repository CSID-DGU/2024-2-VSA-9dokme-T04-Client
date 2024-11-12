/*mockData ver*/
export interface BookDetailType {
  bookId: number;
  publishDate: string;
  bookTitle: string;
  bookCategory: string;
  bookImage: string;
  bookURL: string;
  author: string;
  description: string;
  isMarked: boolean;
}

/*API ver*/
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
