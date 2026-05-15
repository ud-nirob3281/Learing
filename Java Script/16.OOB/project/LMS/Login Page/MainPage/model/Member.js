import { user } from './user.js';

export class Member extends user {
  #BorrodBooks;
  #strongKey;
  constructor(name, password) {
    super(name, password);
    this.#strongKey = `key${this.name}+${this.password}`;
    this.#BorrodBooks = JSON.parse(localStorage.getItem(this.#strongKey)) || [];
  }

  addBorrowBook(book) {
    this.#BorrodBooks.push(book);
    localStorage.setItem(this.#strongKey, JSON.stringify(this.#BorrodBooks));
    localStorage.setItem(
      `borrowerName${book.title}`,
      JSON.stringify({
        name: this.name,
        book: book.title,
      }),
    );
  }
  getBoorrowBook() {
    return this.#BorrodBooks;
  }
  returnBook(book) {
    let bookIndex = this.#BorrodBooks.indexOf(book);
    this.#BorrodBooks.splice(bookIndex, 1);

    localStorage.setItem(this.#strongKey, JSON.stringify(this.#BorrodBooks));
    localStorage.removeItem(`borrowerName${book.title}`);
  }

  getRole() {
    return 'Member';
  }
}
