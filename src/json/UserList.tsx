export interface User {
  userId: number;
  username: string;
  email: string;
  expirationDate: string;
}

export interface UserList {
  userList: User[];
}
