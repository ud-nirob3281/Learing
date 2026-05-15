const BOOKS = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    featured: false,
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    featured: false,
  },
  {
    id: 3,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    featured: false,
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    featured: false,
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    featured: false,
  },
  {
    id: 6,
    title: 'React',
    author: 'Salinger',
    featured: false,
  },
];
let book = document.getElementById('book');
let search = document.getElementById('search');

function alldata(data) {
  data.map(books => {
    const crediv = document.createElement('div');
    crediv.className = 'all_book';
    book.appendChild(crediv);
    crediv.innerHTML = '<i class="fa-regular fa-star"></i>';

    const creh3 = document.createElement('h3');
    const crep = document.createElement('p');

    creh3.innerHTML = books.title;

    crediv.appendChild(creh3);

    crep.innerHTML = books.author;
    crediv.appendChild(crep);

    const starIc = crediv.querySelector('i');

    starIc.addEventListener('click', function () {
      books.featured = !books.featured;
      if (books.featured === true) {
        this.style.color = 'green';
      } else {
        this.style.color = '';
      }
    });
  });
}
alldata(BOOKS);

search.addEventListener('input', function (event) {
  const sevalue = event.target.value;
  book.innerHTML = '';
  let refineBook = BOOKS.filter(function (alldata) {
    return alldata.title.toLowerCase().includes(sevalue.toLowerCase());
  });
  alldata(refineBook);
});
//<i class="fa-regular fa-star"></i>
