//! JavaScript Arrays

/*
Array হলো ordered collection of elements (any data type).
Array reference type, heap-এ store. Index 0 থেকে শুরু.
Array-র নিজস্ব methods ও properties (length) আছে।
Array.isArray() দিয়ে check করতে হয় (typeof [] → "object")
*/

//* 1. Array Creation (অ্যারে তৈরি)
// Way-1: Array literal
const language = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', true, 'Rust'];

// Way-2: new Array() constructor
const language2 = new Array('HTML', 'CSS', 'JavaScript', 'Java', 'Python', true, 'Rust');
console.log(language === language2); // false (different references)

// Empty array with fixed length
const emptyArray = new Array(5);
console.log(emptyArray); // [ <5 empty slots> ]

// Way-3: Array.of() – এক বা একাধিক element দিয়ে array বানায়
const arrOf = Array.of(2, true, 'nirob', { age: 17 }, [1, 2, 3]);

// Way-4: Array.from() – array-like বা iterable থেকে array
const arrLike = { 0: 'UD', 1: 'UG', 2: 'UDN', length: 3 };
const fromArr = Array.from(arrLike); // ['UD', 'UG', 'UDN']

// Array.fromAsync() – async iterable থেকে promise resolve করে
const asyncArr = Array.fromAsync(arrLike); // Promise

//! 2. Access & Update
console.log(language[2]);               // 'JavaScript'
language[6] = 'C';                     // update
console.log(language[6]);              // 'C'

// length property (element count)
console.log(language.length);          // 7
console.log(language[language.length - 1]); // last element

//! 3. Check if Array
console.log(Array.isArray([1, 2]));     // true
console.log(Array.isArray('apple'));    // false
console.log(Array.isArray({}));         // false

//! 4. Convert to String
console.log(language.toString());      // "HTML,CSS,JavaScript,Java,Python,true,C"
console.log(language.join(' | '));     // custom separator

//! 5. Add / Remove Elements (mutable)
// push/pop – end
language.push('Rust');                 // add last
language.pop();                        // remove last
// unshift/shift – start
language.unshift('C');                 // add first
language.shift();                      // remove first

//! 6. Destructuring
const salad = ['🍅', '🍄', '🥦', '🥒', '🌽', '🥕', '🥑'];

// Basic
const [tomato, mushroom, carrot] = salad;
console.log(tomato, mushroom, carrot);  // 🍅 🍄 🥕

// Default value
const [a = '🍎', b = '🍌'] = ['🍇'];
console.log(a, b); // 🍇 🍌

// Skip values
const [, , third] = ['a', 'b', 'c'];
console.log(third); // 'c'

// Swapping
let first = '😒', second = '😊';
[first, second] = [second, first];
console.log(first, second); // 😊 😒

// Merge arrays with spread
let emotion = ['😊', '😒'];
let veg = ['🍅', '🍄'];
const merged = [...emotion, ...veg];
console.log(merged);

// Rest in destructuring
const [firstItem, secondItem, ...restItems] = salad;
console.log(restItems); // ['🥦', '🥒', '🌽', '🥕', '🥑']

//! 7. Spread & Rest (Spread = copy/merge, Rest = gather)
// Spread for shallow copy
const copySalad = [...salad];
console.log(copySalad === salad); // false
// Spread in function arguments
console.log(Math.max(...[1, 5, 3])); // 5

//! 8. Combine Arrays
const x = [1,2,3], y = [4,5,6], z = [7,8,9];
const combined = x.concat(y, z);
console.log(combined);               // [1,2,3,4,5,6,7,8,9]

// Using spread (more common)
const combined2 = [...x, ...y, ...z];


//! 9. Fill() - এটা দিয়ে আমরা একটা array এর সব এলিমেন্টকে নির্দিষ্ট ভ্যালু দিয়ে পূরণ করতে পারি।

//Muteable way
let array = ['🥦', '🥒', '🌽', '🥕', '🥑'];
//array.fill(0); //? array.fill(value) → সব এলিমেন্টকে একই value দিয়ে পূরণ করবে
//console.log(array); //? Output: [0, 0, 0, 0, 0]

array.fill('🌽', 1, 4); //?array.fill(value, start, end)
//console.log(array);

//console.log(Array(5).fill('A').join('-')); //? Fill and Join use

//Immuteable way
const arra = [1, 2, 3, 4, 5, 6];
const newArra = [...arra].fill(0);
//console.log(newArra);
//console.log(arra)


let customers = [
  {
    id: 1,
    f_name: 'Abby',
    l_name: 'Thomas',
    gender: 'M',
    married: true,
    age: 32,
    expense: 500,
    purchased: ['Shampoo', 'Toys', 'Book'],
  },
  {
    id: 2,
    f_name: 'Jerry',
    l_name: 'Tom',
    gender: 'M',
    married: true,
    age: 64,
    expense: 100,
    purchased: ['Stick', 'Blade'],
  },
  {
    id: 3,
    f_name: 'Dianna',
    l_name: 'Cherry',
    gender: 'F',
    married: true,
    age: 22,
    expense: 1500,
    purchased: ['Lipstik', 'Nail Polish', 'Bag', 'Book'],
  },
  {
    id: 4,
    f_name: 'Dev',
    l_name: 'Currian',
    gender: 'M',
    married: true,
    age: 8,
    expense: 90,
    purchased: ['Book'],
  },
  {
    id: 5,
    f_name: 'Maria',
    l_name: 'Gomes',
    gender: 'F',
    married: false,
    age: 7,
    expense: 300,
    purchased: ['Toys'],
  },
];

//! 10. Array itarator Methood

//* forEach – প্রতিটি element-এ কাজ
const colors = ['red','green','blue'];
colors.forEach((color, index) => console.log(index, color));


//* Filter()
const syntaxFilter = array.filter((element, index, array) => {
  // Some Code
});
//? filter() - Get 'Senior Citizens' by Filtering out other customers

const seniorCus = customers.filter(customer => {
  return customer.age >= 60;
});
//console.log(seniorCus);

//* Map()
// map() - Transform to add title and full name

const afterArray = customers.map(customer => {
  let title = '';
  if (customer.gender === 'M') {
    title = 'Mr.';
  } else if (customer.gender === 'F' && customer.married) {
    title = 'Mst.';
  } else {
    title = 'Miss.';
  }
  customer.fullName = `${title} ${customer.f_name} ${customer.l_name}`;
  return customer;
});
//console.log(afterArray);

//* Reduce
// A reducer function which is also called as callback function to be called on each element of the array.
//Syntax
/* const ret = arr.reduce((accumulator, currentValue, index, array)=> {
    // do something with accumulator and currentvalue
    // You get a result
    // You return that result
}) */
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const myTotal = numbers.reduce((acc, curr) => {
  // console.log(curr);
  //console.log(`Accmulator ${acc} and Current Value ${curr}`);
  acc = acc + curr;
  return acc;
}, 0);
//console.log(myTotal);

// reduce() - The average age of the Customers who have purchased the Item, 'Book'.
let count = 0;
const total = customers.reduce((acc, customer) => {
  if (customer.purchased.includes('Book')) {
    totalAge = acc + customer.age;
    count = count + 1;
  }
  return totalAge;
}, 0);
const average = total / count;
//console.log(average);

//* RedudceRight()
//Left -> Right
const num = numbers.reduceRight((acc, num) => {
  return acc - num;
});
//Right -> Left
const num1 = numbers.reduce((acc, num) => {
  return acc - num;
});
//console.log(num);
//console.log(num1);

//*some() - পরীক্ষা করে কোনো একটি উপাদান শর্ত পূরণ করলে true রিটার্ন করে, নাহলে false।
// some() - Do we have a Young Customer(age less than 10 years)?

const hasYoungCustomer = customers.some(customer => {
  return customer.age < 10;
});

//console.log('Has Young Customer(Age < 10):', hasYoungCustomer);

//* every - পরীক্ষা করে সব উপাদান শর্ত পূরণ করলে true রিটার্ন করে, নাহলে false।
// every() - Every Customer is Married?

const isAllMarried = customers.every(customer => {
  return customer.married;
});

//console.log('All Customer Married?:', isAllMarried);

//*Find - শর্ত পূরণ করা প্রথম উপাদানটি রিটার্ন করে। না পেলে undefined।
const youngCustomer = customers.find(customer => {
  return customer.age < 10;
});
//console.log(youngCustomer);

//*FindLast - শর্ত পূরণ করা শেষ উপাদানটি রিটার্ন করে। না পেলে undefined।
const youngCustomer0 = customers.findLast(customer => {
  return customer.age < 10;
});
//console.log(youngCustomer0);

//* FindIndex - শর্ত পূরণ করা প্রথম উপাদানের ইনডেক্স রিটার্ন করে। না পেলে -1।
const youngCustomer1 = customers.findIndex(customer => {
  return customer.age < 10;
});
//console.log(youngCustomer1);


//! 11. Includes()
const developer = ['FULL', 'MERN', 'MEAN', 'LARAVEL', 'MERN'];
//console.log(developer.includes('MERN'));
//console.log(developer.includes('njkh'));

//! 12. IndexOf()/LastIndexOf()
/* console.log(developer.indexOf('MERN')); //1
console.log(developer.indexOf('dfg')); //-1
console.log(developer.indexOf('gerh')); //-1

console.log(developer.lastIndexOf('MERN')); //4
console.log(developer.lastIndexOf('dfg')); //-1
console.log(developer.lastIndexOf('gerh')); //-1 */

//! 13. Reverse()/toReverse()
//* Reverse()
//Muteable
/* let rev = developer.reverse();
console.log(rev);
console.log(developer); */

//* toReverse()
//Immuteable
const toRev = developer.toReversed();
/* console.log(toRev);
console.log(developer); */



//! 14. Sorting

// sort() method array-র elements গুলোকে sort করে
// এটা MUTABLE - মানে মূল array-কে চেঞ্জ করে ফেলে
// Default ভাবে ascending order এ sort করে
// Default ভাবে সব elements-কে STRING হিসেবে sort করে


//* 🧠 COMPARE FUNCTION (The Heart of Sorting)

// Compare function-এর rules:
// compareFunction(a, b) return:
//   Negative Value (< 0)  →  a আগে বসবে, b পরে
//   Positive Value (> 0)  →  b আগে বসবে, a পরে
//   Zero (0)              →  কোনো চেঞ্জ নেই

// Visual Representation:
// a - b = Negative  →  a, b  (a আগে, b পরে) = Ascending
// a - b = Positive  →  b, a  (b আগে, a পরে) = Descending
// a - b = 0         →  a, b  (যেমন আছে তেমন)



//* 🔢 NUMBER SORTING

// sort() সবকিছুকে STRING হিসেবে sort করে
// তাই সংখ্যা sort করতে গেলে সমস্যা হয়

const numbers = [1, 100, 25, 40, 5];
numbers.sort(); // Default sort (string comparison)
console.log(numbers); // [1, 100, 25, 40, 5] ❌ WRONG!

// কেন ভুল হয়?
// "1" < "100" < "25" < "40" < "5" (Unicode string order)
// String comparison: "100" আসে "25" এর আগে কারণ '1' < '2'



const nums = [40, 100, 1, 5, 25, 10];

// ASCENDING (ছোট থেকে বড়) - Short Way
nums.sort((a, b) => a - b);
console.log(nums); // [1, 5, 10, 25, 40, 100] ✅

// ASCENDING (ছোট থেকে বড়) - Long Way (Step by Step)
nums.sort(function(a, b) {
  if (a < b) return -1;  // a ছোট, a আগে বসবে
  if (a > b) return 1;   // a বড়, b আগে বসবে (a পরে যাবে)
  return 0;              // সমান, কোনো চেঞ্জ নেই
  //return a === b ? 0 : a > b ? 1 : -1
});

// DESCENDING (বড় থেকে ছোট) - Short Way
nums.sort((a, b) => b - a);
console.log(nums); // [100, 40, 25, 10, 5, 1] ✅

// DESCENDING (বড় থেকে ছোট) - Long Way
nums.sort(function(a, b) {
  if (a > b) return -1;  // a বড়, a আগে বসবে
  if (a < b) return 1;   // a ছোট, b আগে বসবে (a পরে যাবে)
  return 0;              // সমান, কোনো চেঞ্জ নেই
  // return a === b ? 0 : a > b ? -1 : 1
});



//*  🔤 STRING SORTING

const names = ['John', 'alice', 'Bob', 'charlie'];

// Case-sensitive (Default) - A-Z তারপর a-z (ASCII order)
names.sort();
console.log(names); // ['Bob', 'John', 'alice', 'charlie']


// Case-insensitive (বড়-ছোট হাতের অক্ষর ইগনোর)
names.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(names); // ['alice', 'Bob', 'charlie', 'John'] ✅

// Z-A (Descending)
names.sort((a, b) => b.localeCompare(a));
console.log(names); // ['John', 'charlie', 'Bob', 'alice']

// বাংলা স্ট্রিং সর্টিং
const banglaWords = ['কলা', 'আম', 'জাম', 'লিচু'];
banglaWords.sort((a, b) => a.localeCompare(b, 'bn-BD'));
console.log(banglaWords); // ['আম', 'কলা', 'জাম', 'লিচু'] ✅


//* 📅 DATE SORTING

const dates = [
  new Date('2023-03-15'),
  new Date('2021-06-20'),
  new Date('2024-01-10')
];

// Ascending (পুরনো → নতুন)
dates.sort((a, b) => a - b);
console.log(dates);
// [2021-06-20, 2023-03-15, 2024-01-10]

// Descending (নতুন → পুরনো)
dates.sort((a, b) => b - a);
console.log(dates);
// [2024-01-10, 2023-03-15, 2021-06-20]



//* 🆕 toSorted() - IMMUTABLE SORT (ES2023)


// toSorted() নতুন array return করে, মূল array চেঞ্জ হয় না
// toSorted() ও compare function accept করে

const original = [3, 1, 4, 1, 5];

// Without compare function (Default string sort)
const sortedDefault = original.toSorted();
console.log(original);      // [3, 1, 4, 1, 5] - unchanged ✅
console.log(sortedDefault); // [1, 1, 3, 4, 5] - new array

// With compare function (Number sort)
const sortedAsc = original.toSorted((a, b) => a - b);
console.log(sortedAsc); // [1, 1, 3, 4, 5]

const sortedDesc = original.toSorted((a, b) => b - a);
console.log(sortedDesc); // [5, 4, 3, 1, 1]

/*
1. Default sort = STRING sort (Unicode order)
2. Number sort-এর জন্য compare function (a - b) আবশ্যক
3. sort() MUTABLE - মূল array চেঞ্জ করে ফেলে
4. Immutable চাইলে toSorted() বা [...arr].sort() ব্যবহার করো
5. Compare function: Negative = a আগে, Positive = b আগে, Zero = চেঞ্জ নেই
6. Objects-এর ক্ষেত্রে নির্দিষ্ট property দিয়ে compare করতে হয়
7. বাংলা সর্টিং-এর জন্য localeCompare() ব্যবহার করো
8. toSorted() ES2023 (নতুন) - সব ব্রাউজারে সাপোর্ট নাও থাকতে পারে
*/



//! 15. slice, splice, with

//* slice(start, end) – immutable, extract
const fruits = ['Apple','Banana','Cherry','Date'];
console.log(fruits.slice(1,3)); // ['Banana','Cherry']
const copy = fruits.slice(); // full copy

//* Splice()
//Muteable
//splice(start, deleteCount, item1, item2, item3...);
let languages = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', true, 'Rust'];
//languages.splice(0, 1);
//languages.splice(3, 2, 'React');
//languages.splice(2, 0, 'React');
//console.log(languages);

//*toSpliced()
//Immuteable
const toSli = languages.toSpliced(1, 1, 'React.JS');
//console.log(toSli);
//console.log(languages);


//*With()
//with(index,value)
const number = [1, 2, 3, 4, 5, 6, 7];
//? if i need update value 4 to 6 so
//number[3] = 6;
//console.log(number);
//? But problem is a This Array is muted. But I need Update value but Immuteable way so
const newArray = number.with(3, 6);
//console.log(newArray);
//console.log(number);

//! 16. at() – negative index allows

const junkFoodILove = ['🥖', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🍿'];

junkFoodILove.at(0); // '🥖'
junkFoodILove.at(3); // '🍕'
junkFoodILove.at(-1); // '🍿'
junkFoodILove.at(-5); // '🍕'
junkFoodILove.at(-8); // '🥖'
junkFoodILove.at(10); // undefined

//! 17. Flat()

const arr2 = [0, 1, [2, [3, [4, 5]]]];
/* console.log(arr2.flat(2));
console.log(arr2.flat(3));
console.log(arr2.flat(Infinity)); */

/* ! 18. flatMap - প্রথমে প্রতিটি উপাদানের উপর ম্যাপ করে (বদলায়), তারপর ফলাফলকে এক লেভেল ফ্ল্যাট করে।
এটি আলাদা করে map() ও flat() করার মতোই, কিন্তু বেশি কার্যকরী।*/

// flatMap = map + flat(1)
const arr3 = [1,2,3];
console.log(arr3.flatMap(x => [x, x*2])); // [1,2, 2,4, 3,6]

//! 19. copyWithin(target, start, end) – mutable
const arrCopy = [1,2,3,4,5,6,7];
arrCopy.copyWithin(0, 3, 6); // copy index 3-5 to index 0
console.log(arrCopy); // [4,5,6,4,5,6,7]

//! 20. split() (String method, array পেতে)
let names = 'UD NIROB';
let nameArr = names.split(' '); // ['UD','NIROB']

//* 18. Object.groupBy() – ES2024
const employees = [
  { name: 'Bob', dept: 'Engineering', salary: 5000 },
  { name: 'Alex', dept: 'HR', salary: 1000 },
  { name: 'Ravi', dept: 'Engineering', salary: 7000 },
];
const groupByDept = Object.groupBy(employees, ({ dept }) => dept);
console.log(groupByDept);

// Custom group
const bySalary = Object.groupBy(employees, ({ salary }) =>
  salary >= 5000 ? 'High' : 'Low'
);

//* 19. Iterator Methods (forEach, filter, map, reduce, reduceRight)

// forEach – প্রতিটি element-এ কাজ
const colors = ['red','green','blue'];
colors.forEach((color, index) => console.log(index, color));

// filter – শর্তসাপেক্ষে element রাখা
const customers = [
  { id:1, age:32, married:true, expense:500, purchased:['Book'] },
  { id:2, age:8, married:false, expense:90, purchased:['Toy'] },
  // ...
];
const seniorCitizens = customers.filter(c => c.age >= 60);

// map – প্রতিটি element transform
const fullNames = customers.map(c => {
  const title = c.gender === 'M' ? 'Mr.' : c.married ? 'Mst.' : 'Miss.';
  return `${title} ${c.f_name} ${c.l_name}`;
});

// reduce – single value accumulate
const totalExpense = customers.reduce((sum, c) => sum + c.expense, 0);

// reduceRight – ডান থেকে বামে
const diff = [10, 2, 1].reduceRight((acc, val) => acc - val); // (1-2) = -1, then 10-(-1)=11
console.log(diff);

//* 20. Advanced array features
// entries() – [index, value] iterator
const iterator = ['a','b'].entries();
for (const [i, v] of iterator) console.log(i, v);

// keys() – index iterator
// values() – value iterator
const vals = ['x','y'].values();
for (const v of vals) console.log(v);

// fromEntries() – array of [key,value] to object
const objFromArr = Object.fromEntries([['a',1],['b',2]]);
console.log(objFromArr); // {a:1, b:2}

// Method Chaining (example)
const totalMarriedExpense = customers
  .filter(c => c.married)
  .map(c => c.expense)
  .reduce((a, b) => a + b, 0);

//* 21. Shallow Copy vs Deep Copy (reference types-এর জন্য সাবধান)
const nestedArr = [{ id: 1 }, { id: 2 }];
const shallowCopy = [...nestedArr];
shallowCopy[0].id = 99;
console.log(nestedArr[0].id); // 99 (affected!)

// Deep copy option: structuredClone / JSON
const deepCopy = structuredClone(nestedArr);
deepCopy[0].id = 100;
console.log(nestedArr[0].id); // 99 (unaffected)

//! Summary of key methods
/*
| Category        | Methods                                   |
|-----------------|-------------------------------------------|
| Add/Remove      | push, pop, unshift, shift, splice         |
| Search          | includes, indexOf, lastIndexOf, find, findIndex |
| Test all/some   | every, some                               |
| Transform       | map, filter, reduce, reduceRight, flatMap |
| Iterate         | forEach, entries, keys, values            |
| Copy/Fill       | slice, fill, copyWithin, with, spread     |
| Sort/Reverse    | sort, toSorted, reverse, toReversed       |
| Flatten         | flat, flatMap                             |
| Static          | Array.isArray, Array.of, Array.from       |
| New             | Object.groupBy, toSpliced, with, at       |
*/

//! Task
{
  //4
  const number = [0, 1, 2, 3, 4, 4, 5, 5, 7, 9];

  for (let i = 0; i < number.length; i++) {
    //console.log(i);
    if (i % 2 === 1) {
      //console.log(number[i]);
    }
  }

  //5
  number.push(10);
  number.unshift(-1);
  number.pop();
  number.shift();
  // console.log(number);
  //7
  const favouriteFoods = [
    'Biryani',
    'Pizza',
    'Burger',
    'Pasta',
    'Sushi',
    'Ice Cream',
    'Fried Chicken',
    'Noodles',
    'Chocolate',
    'Mango',
  ];
  const [six] = [favouriteFoods[5]];
  //console.log(six);
  //8
  const [food1, food2, ...rest] = [
    'Biryani',
    'Pizza',
    'Burger',
    'Pasta',
    'Sushi',
    'Ice Cream',
    'Fried Chicken',
    'Noodles',
    'Chocolate',
    'Mango',
  ];
  //console.log(rest);
  //9
  const newArr = favouriteFoods.slice();
  const newArr1 = [...favouriteFoods];
  //console.log(favouriteFoods === newArr);
  // console.log(favouriteFoods === newArr1);

  //10
  favouriteFoods.length = 0;
  // console.log(favouriteFoods);
  //11
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let i = 0; i <= num.length - 1; i++) {
    /*  if (num[i] === 5) {
      num.length = 6;
      break;
    } */
  }
  // console.log(num);

  //12
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  items.splice(0, 10);
  //console.log(items);

  //! 15 Hard
  //way-1
  const elem = ['apple', 'banana', 'mango', 'grapes'];
  const v = elem.find(element => {
    return element.includes('ba');
  });
  //console.log(v);
  //Way-2
  const elem1 = elem.join(' ').includes('app');
  // console.log(elem1);

  //16
  const alphaNum = [
    'A1',
    'C3',
    'B2',
    'D4',
    'F6',
    'E5',
    'G7',
    'H8',
    'J10',
    'I9',
  ];
  const sortAs = alphaNum.toSorted();
  const sortDe = alphaNum.toSorted(function (a, b) {
    return a === b ? 0 : a > b ? -1 : 1;
  });
  //console.log(sortDe);
  //console.log(sortAs);

  //Data
  const employees = [
    { id: 1, name: 'Alice', departmentId: 1, salary: 5000 },
    { id: 2, name: 'Bob', departmentId: 2, salary: 7000 },
    { id: 3, name: 'Charlie', departmentId: 3, salary: 4500 },
    { id: 4, name: 'Diana', departmentId: 1, salary: 5500 },
    { id: 5, name: 'Edward', departmentId: 2, salary: 8000 },
    { id: 6, name: 'Fiona', departmentId: 4, salary: 6000 },
    { id: 7, name: 'George', departmentId: 3, salary: 5200 },
    { id: 8, name: 'Helen', departmentId: 4, salary: 8000 },
    { id: 9, name: 'Ian', departmentId: 2, salary: 4800 },
    { id: 10, name: 'Jane', departmentId: 1, salary: 5100 },
  ];
  const departments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Engineering' },
    { id: 3, name: 'Marketing' },
    { id: 4, name: 'Sales' },
  ];
  //21
  const engnieerFilter = employees.filter(val => {
    return val.departmentId === 2;
  });
  //console.log(engnieerFilter);
  //22
  //*Immuteable way

  /*   const newarr0 = employees.map(employ => {
    const find = departments.find(fi => fi.id === employ.departmentId).name;

    return `${employ.name}(${find})`;
  });
  console.log(newarr0);
  console.log(employees); */

  /*   const newarr = employees.map(employ => {
    let title = '';
    if (employ.departmentId === 1) {
      title = 'HR';
    } else if (employ.departmentId === 2) {
      title = 'Engineering';
    } else if (employ.departmentId === 3) {
      title = 'Marketing';
    } else {
      title = 'Sales';
    }
    //*Muteable way
    employ.name = `${employ.name}(${title})`;
    return employ;

  });
  console.log(employees);
  console.log(newarr); */

  //23
  //Way-1
  const emSa = employees.map(sal => {
    return sal.salary;
  });
  const maxSalary = Math.max(...emSa);
  // console.log(maxSalary);
  //Extra
  const maxSalaryArray = employees.filter(maxArr => {
    return maxArr.salary === maxSalary;
  });
  // console.log(maxSalaryArray);

  //Way-2
  let maxSa = 0;
  for (const maxVa of employees) {
    if (maxVa.salary > maxSa) {
      maxSa = maxVa.salary;
    }
  }
  // console.log(maxSa);
  //24
  const chekSalesEmploy = employees.some(chek => {
    return chek.departmentId === 4;
  });
  //console.log(chekSalesEmploy);

  //25
  function sala(data) {
    return data.filter(sal => {
      return sal.salary > 6000;
    });
  }
  //console.log(sala(employees));
  //
  const salar = employees.filter(sal => {
    return sal.salary > 6000;
  });
  //console.log(salar);
  //26
  const employName = employees.map(emName => {
    return emName.name;
  });
  //console.log(employName);
  //27
  const totalSalary = employees.reduce((acc, employSalary) => {
    let total = acc + employSalary.salary;
    return total;
  }, 0);
  //console.log(totalSalary);
  //28
  const minSa = employees.some(un5000 => un5000.salary < 5000);
  //console.log(minSa);
  //29
  //Way-1
  const findEmsa5100 = employees.find(fi => fi.salary === 5100);
  //console.log(findEmsa5100);
  //way-2
  const filterEmsa5100 = employees.filter(fi => fi.salary === 5100);
  //console.log(...filterEmsa5100);
  //30
  const findLastEmployinHR = employees.findLast(lhr => {
    return lhr.departmentId === 1;
  });
  //console.log(findLastEmployinHR);
  //31
  const findFirstEmployinMarketing = employees.find(
    ffem => ffem.departmentId === 3
  );
  // console.log(findFirstEmployinMarketing);
  //32
  const findFirstEmployinearn4000 = employees.every(
    employ => employ.salary > 4000
  );
  // console.log(findFirstEmployinearn4000);
  //33
  //way-1
  const findEmployinHRSales = employees.filter(employ => {
    return employ.departmentId === 1 || employ.departmentId === 4;
  });
  //console.log(findEmployinHRSales);
  //way-2
  let firstHR = null;
  let firstSales = null;

  for (let employ of employees) {
    if (!firstHR && employ.departmentId === 1) {
      firstHR = employ;
    }
    if (!firstSales && employ.departmentId === 4) {
      firstSales = employ;
    }
    if (firstHR && firstSales) break; // দুইজন মিলে গেলে loop stop
  }

  // console.log(firstHR);
  // console.log(firstSales);

  //34
  //way-1
  const verifyEmploy = employees.every(employ => {
    return (
      employ.departmentId === 1 ||
      employ.departmentId === 2 ||
      employ.departmentId === 3 ||
      employ.departmentId === 4
    );
  });
  //console.log(verifyEmploy);
  //way-2 best
  const verifyEmploy2 = employees.every(employ => {
    return [1, 2, 3, 4].includes(employ.departmentId);
  });
  //console.log(verifyEmploy2);
  //35
  //Way-1
  const deptName = employees.map(employ => {
    let dept = '';
    if (employ.departmentId === 1) {
      dept = 'HR';
    } else if (employ.departmentId === 2) {
      dept = 'Engineering';
    } else if (employ.departmentId === 3) {
      dept = 'Marketing';
    } else {
      dept = 'Sales';
    }
    return `${employ.name} ${dept}`;
  });

  //way-2 Best
  const deptName2 = employees.map(employ => {
    let names = departments.find(dept => dept.id === employ.departmentId);
    let nameadept = employ.name + names.name;
    return nameadept;
  });
  //  console.log(deptName2);
  //36
  const namearray = employees.map(employ => employ.name);
  //console.log(namearray);
  //37

  const salaryIncrase = employees.map(employ => {
    return { ...employ, salary: employ.salary + employ.salary * (10 / 100) };
  });
  // console.log(salaryIncrase);
  // console.log(employees);
  //38
  const employeesWithSkills = [
    { name: 'Alice', skills: ['Excel', 'Management'] },
    { name: 'Bob', skills: ['JavaScript', 'Debugging', 'Problem Solving'] },
    { name: 'Charlie', skills: ['Marketing', 'SEO'] },
    { name: 'Diana', skills: ['Communication', 'Recruitment'] },
    { name: 'Edward', skills: ['Leadership', 'Project Management'] },
    { name: 'Fiona', skills: ['Sales', 'Negotiation'] },
    { name: 'George', skills: ['Graphic Design', 'Branding'] },
    { name: 'Helen', skills: ['Customer Service', 'CRM Tools'] },
    { name: 'Ian', skills: ['React', 'Node.js'] },
    { name: 'Jane', skills: ['Accounting', 'Data Analysis'] },
  ];

  const skill = employeesWithSkills.map(employ => {
    return employ.skills;
  });
  //console.log(skill.flat());
  //39
  const engSalary = employees
    .map(employ => {
      if (employ.departmentId === 2) {
        return employ.salary;
      } else {
        return 0;
      }
    })
    .reduce((acc, emSalary) => {
      return acc + emSalary;
    }, 0);
  // console.log(engSalary);

  //best Practise
  const engSalary2 = employees
    .filter(employ => employ.departmentId === 2)
    .reduce((acc, emSalary) => acc + emSalary);
  // console.log(engSalary);
  //40 //! Fail
  const allem = departments.some(dept => {
    const employ = employees.filter(emp => emp.departmentId === dept.id);
    // console.log(employ);
    return employ.every(emp => emp.salary > 5000);
  });
  //console.log(allem);
  //45
  for (let employ of employees) {
    if (employ.salary > 5000) {
      //  console.log(employ.name);
    }
  }
  //46
  for (let { name, salary } of employees) {
    // console.log(name, salary);
  }
  //47
  for (let employ of employees) {
    const findName = departments.find(
      dept => dept.id === employ.departmentId
    ).name;
    // console.log(`${employ.name} works in ${findName}`);
  }
  //48
  for (let [index, employ] of employees.entries()) {
    // console.log(index, employ.name);
  }
  //49
  const arrayLike = { 0: 'First', 1: 'Second', length: 2 };
  //console.log(arrayLike[1]);

  //50
  function allarfg() {
    // console.log(Array.from(arguments));
  }
  allarfg(10, 20, 30);
  //51
  const div = document.querySelectorAll('div');
  // console.log(Array.from(div));
  //53
  const newArray = new Array(5).fill('A').join('-');
  //console.log(newArray);
  //57
  const str = 'HELLO';
  //console.log(Array.from(str));
  //58
  const fruits = ['apple', 'banana', 'apricot', 'mango', 'blueberry'];

  const grouped = fruits.reduce((acc, word) => {
    const firstLetter = word[0]; // first letter বের করা
    if (!acc[firstLetter]) {
      acc[firstLetter] = []; // যদি group না থাকে, নতুন array তৈরি
    }
    acc[firstLetter].push(word); // word group-এ add করা
    return acc;
  }, {});

  //console.log(grouped);

  /*   const friuit = ['apple', 'banana', 'apricot', 'mango', 'blueberry'];
  const a = friuit.map(fru => fru.charAt(0));
  console.log(a); */
  //59
  const numArr = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ];
  //Way-1
  const flatArr = numArr.flat();
  // console.log({ ...flatArr });
  //Way-2 Best
  //console.log(Object.fromEntries(numArr));
  //60
  const letterArr = [
    ['a', 'b'],
    ['c', 'd'],
  ];
  const upperArray = letterArr.flatMap(lett =>
    lett.map(le => le.toUpperCase())
  );
  //console.log(upperArray);

  //61 //!Fail
  const fruitArray = ['apple', 'banana', 'apple', 'mango', 'banana', 'banana'];
  let count = {};
  for (let fruit of fruitArray) {
    //count[fruit] = 1;
    if (count[fruit]) {
      count[fruit] = count[fruit] + 1;
    } else {
      count[fruit] = 1;
    }
  }
  console.log(count);
  //62
  const newLeA = ['a', 'b', 'c', 'd', 'e'];
  console.log(newLeA.slice(1, 4));
  //63
  newNumA = [9, 3, 1, 6, 8];
  console.log(newNumA.toSorted());
  //65
  const users = [
    { name: 'Alice', age: 55 },
    { name: 'Bob', age: 3 },
    { name: 'Charlie', age: 25 },
  ];
  const group = Object.groupBy(users, ({ age }) => {
    if (age >= 40) {
      return 'Adult';
    } else {
      return 'Non-Adult';
    }
  });
  console.log(group);

  //66
  const sentence =
    '40 Days of JavaScript by tapaScript is a powerful initiative';
  const sentArr = sentence.split(' ');
  let long = '';
  for (let sen of sentArr) {
    if (sen.length > long.length) {
      long = sen;
    }
  }
  console.log(long);
  //67
  const numA1 = [1, 2, 3, 4];
  const numA2 = [3, 4, 5, 6];

  const final = [];
  for (let num of numA1) {
    if (numA2.includes(num)) {
      final.push(num);
    }
  }
  console.log(final);
}
