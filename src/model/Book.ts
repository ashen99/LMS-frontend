class Book {
  id: string;
  title: string;
  isbn: string;
  author: string;
  copies: number;

  constructor() {
    this.id = "";
    this.author = "";
    this.isbn = "";
    this.title = "";
    this.copies = 0;
  }
}

export default Book;
