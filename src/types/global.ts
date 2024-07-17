export interface DataType {
  key: string;
  name: string;
  contact: number;
  address: string;
}

export interface BookDataType {
  id: string,
  key: string;
  title: string;
  author: string;
  isbn: string;
  copies: number
}

export interface bookViewType {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: number
}
