let language = ['JavaSript', 'Java', 'Python', 'PHP', 'C++', 'Vue'];

//! Filter
//* Array থেকে প্রথম Word নিদিষ্ট করে কোন Value বের করতে চাইলে
let langJ = language.filter(valJ => valJ.startsWith('J'));
//console.log(langJ);

//* Array থেকে Word এর Lenghth নিদিষ্ট করে কোন Value বের করতে চাইলে
let langLen = language.filter(valLen => {
  // console.log(valLen.length);
  return valLen.length === 3;
});

//console.log(langLen);
//* Array থেকে মধ্যের Word নিদিষ্ট করে কোন Value বের করতে চাইলে
let langH = language.filter(valH => valH.toUpperCase().includes('H'));
//console.log(langH);

//* Array থেকে মধ্যের নিদিষ্ট কিছু সংখ্যা বের করতে চাইলে
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let val6 = numbers.filter(num => num > 5);
//console.log(val6);

const stack = [
  {
    name: 'Mearn Stack',
    property: 'Mongo,Express,React,Node',
    foundation: 'JavaScript',
    trending: true,
    price: 5000,
  },
  {
    name: 'Laravel',
    property: 'JavaScript,Vue,PHP,Laravel,MySQL',
    foundation: 'JavaScript',
    trending: true,
    price: 3000,
  },
  {
    name: 'WordPress',
    property: 'JavaScript,PHP,WordPress,MySQL',
    foundation: 'PHP',
    trending: true,
    price: 4000,
  },
];

//* Foundation JavaScript কিকি আছে তা দেখতে চাইলে
let fdJs = stack.filter(valFdJs => valFdJs.foundation === 'JavaScript');
//console.log(fdJs);

//! Map
//* প্রতিটা Value এর সাথে 5 করে যোগ হক  এটা চাইলে
const numP5 = numbers.map(num => num + 5);
//console.log(numP5);

//TODO Chaining
const numhCh = numbers
  .map(num => num + 5)
  .map(nm => nm - 2)
  .filter(num => num > 8);
//console.log(numhCh);

//! Reduce
const myTotal = numbers.reduce((acc, curr) => {
  console.log(curr);
  console.log(`Accmulator ${acc} and Current Value ${curr}`);
  return acc + curr;
}, 0);
console.log(myTotal);

const stackTotal = stack.reduce((acc, cur) => {
  console.log(cur);
  //console.log(`Accmulator ${acc} and Current Value ${cur.price}`);
  return acc + cur.price;
}, 0);

console.log(stackTotal);
