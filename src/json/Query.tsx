// 문의 하나의 타입 정의
export interface Inquiry {
  inquireId: number;
  userId: number;
  title: string;
  content: string;
}

// 페이지 정보와 함께 응답되는 데이터의 타입 정의
export interface InquiryResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Inquiry[]; // Inquiry 타입의 배열
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: Pageable;
}

// 페이지 정렬 정보의 타입 정의
export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이지네이션 정보의 타입 정의
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
