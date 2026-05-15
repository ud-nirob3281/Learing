export class Libray {
  #books = JSON.parse(localStorage.getItem('allBook')) || [];

  addBook(book) {
    this.#books.push(book);
    localStorage.setItem('allBook', JSON.stringify(this.#books));
  }
  getAvailableBook() {
    return this.#books.filter(boo => boo.isAvilable);
  }
  getAllBook() {
    return this.#books;
  }
  findBook(bookId) {
    return this.#books.find(book => book.id === bookId);
  }
}

/* export class Libray {
  #books;
  constructor() {
    this.#books = [];
  }
  addBook(book) {
    this.#books.push(book);
  }
  getAvailableBook() {
    return this.#books.filter(boo => boo.isAvilable);
  }
  getAllBook() {
    return this.#books;
  }

  findBook(bookId) {
    return this.#books.find(book => book.id === bookId);
  }
} */
