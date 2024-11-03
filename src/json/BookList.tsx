export interface Book {
  bookId: number;
  title: string;
  category: string;
  bookImage: string;
  bookUrl: string;
  isMarked: boolean;
}

export interface BookData {
  bookData: Book[];
}
