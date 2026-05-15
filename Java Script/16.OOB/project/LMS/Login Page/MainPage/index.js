import { Admin } from './model/Admin.js';
import { Member } from './model/Member.js';
import { Book } from './model/Book.js';
import { Libray } from './model/Libray.js';
import { download } from '../Download.js';

const bookSection = document.getElementById('bookSection');
const borrowedSection = document.getElementById('borrowedSection');
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const borrowedList = document.getElementById('borrowedList');
const downloadBtn = document.getElementById('dwb');

const parms = new URLSearchParams(window.location.search);
const userDa = parms.get('userDa');
const name = parms.get('name');
const password = parms.get('password');

let currentUser;
if (userDa !== null && name !== null && password !== null) {
  main(userDa, name, password);
} else {
  main('Member', 'Admin', 1234);
}

function main(user, name, pass) {
  if (user === 'Admin') {
    currentUser = new Admin('Admin', 1234);

    bookSection.style.display = 'block';
    borrowedSection.style.display = 'none';
  } else {
    currentUser = new Member(name, pass);

    bookSection.style.display = 'none';
    borrowedSection.style.display = 'block';
    borrowBookFu();
  }
  //renderBook();
}

bookSection.style.display = 'none';

let libray = new Libray();

bookForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;

  const book = new Book(title, author, genre);
  libray.addBook(book);

  renderBook();
  borrowBookFu();
  bookForm.reset();
});

function renderBook() {
  bookList.innerHTML = '';

  libray.getAllBook().forEach(book => {
    const borroWerName = JSON.parse(
      localStorage.getItem(`borrowerName${book.title}`),
    ) || { name: 'No Data', book: 'No Data' };
    console.log(borroWerName);

    let control;
    if (currentUser.getRole() === 'Member' && book.isAvailable) {
      control = `<button class='bg-green-600 text-white px-3 py-1 rounded' data-action='borrow' data-id="${book.id}">Borrow</button>`;
    } else if (currentUser.getRole() === 'Admin') {
      control = `<span>${book.isAvailable ? `Available` : `Borrowed(${borroWerName.name})`}<span/>`;
    } else {
      control = '';
    }

    const creLi = document.createElement('li');
    creLi.className =
      'bg-purple-500 p-4 rounded shadow flex justify-between itmes-left';
    creLi.innerHTML = `
    <div><b>${book.title}</b> By ${book.author} <em>(${book.genre})</em></div>
    ${control}
    `;
    bookList.appendChild(creLi);
  });
}

bookList.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    // let allBook = JSON.parse(localStorage.getItem('allBook'));

    const bookId = e.target.dataset.id;
    //let thisBook = allBook.find(book => book.id === bookId);
    let thisBook = libray.findBook(bookId);

    thisBook.isAvailable = false;
    currentUser.addBorrowBook(thisBook);
    localStorage.setItem('allBook', JSON.stringify(libray.getAllBook()));
    renderBook();
    borrowBookFu();
  }
});

function borrowBookFu() {
  if (currentUser.getRole() === 'Member') {
    borrowedList.innerHTML = '';

    let borrowBookLists = currentUser.getBoorrowBook();
    borrowBookLists.forEach(book => {
      const creLi = document.createElement('li');
      creLi.className =
        'bg-red-400 p-4 rounded shadow flex justify-between itmes-left';

      creLi.innerHTML = ` <div><b>${book.title}</b> By ${book.author} <em>(${book.genre})</em></div>
      
      <button class='bg-amber-300 text-black px-3 py-1 rounded' data-id="${book.id}"'>Return</button>
      `;

      borrowedList.appendChild(creLi);
    });
  }
}
borrowedList.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    // let allBook = JSON.parse(localStorage.getItem('allBook'));
    const bookIds = e.target.dataset.id;
    let isBook = libray.findBook(bookIds);

    isBook.isAvailable = true;

    if (currentUser.getRole() === 'Member') {
      currentUser.returnBook(isBook);
    }
    localStorage.setItem('allBook', JSON.stringify(libray.getAllBook()));
    renderBook();
    borrowBookFu();
  }
});

//
downloadBtn.addEventListener('click', () => {
  download('../Login Page .zip');
});

renderBook();
borrowBookFu();
if (userDa !== null && name !== null && password !== null) {
  main(userDa, name, password);
} else {
  main('Member', 'Admin', 1234);
}
