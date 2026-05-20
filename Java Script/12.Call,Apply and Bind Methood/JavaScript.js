// ================================================================
// ! JAVASCRIPT call, apply, bind - DEEP DETAILED NOTE
// ================================================================


//! জাভাস্ক্রিপ্টে function-এর ভিতর this কে হবে, সেটা নির্ভর করে call করার পদ্ধতির উপর।
//* নিচের উদাহরণে this আলাদা জায়গায় আলাদা আউটপুট দিচ্ছে।

function introduce() {
  //! strict mode off থাকলে এখানে this গ্লোবাল window/global object, on থাকলে undefined
  console.log('Hi, I am ' + this.name);
}

const personRahim = {
  name: 'Rahim',
  sayIntro: introduce,
};

//* কেইস ১: object-র method হিসেবে call
personRahim.sayIntro(); // "Hi, I am Rahim"

//* কেইস ২: standalone call (this হারিয়ে গেল)
const standalone = personRahim.sayIntro;
standalone(); // "Hi, I am undefined" (strict) নাহলে window.name যা থাকে

//? তাই আমরা চাই this-কে জোর করে fix করতে। সেটার জন্যেই call, apply, bind।

// ================================================================
// ! SECTION 1 : CALL METHOD
// ================================================================
//! call: function-কে সাথে সাথেই invoke করে, this change করে,
//!        এবং arguments দেয় comma দিয়ে আলাদা করে।

//* Syntax: functionName.call(thisArg, arg1, arg2, ...)

//* 1. Basic উদাহরণ
function fullIntro(city, country) {
  console.log(`${this.name} lives in ${city}, ${country}`);
}

const user1 = { name: 'Rahim' };
const user2 = { name: 'Karim' };

//* user1 কে this বানিয়ে call করলাম এখনই
fullIntro.call(user1, 'Dhaka', 'Bangladesh'); // Rahim lives in Dhaka, Bangladesh

//* 2. Function Borrowing (সবচেয়ে গুরুত্বপূর্ণ)
//! এক object-এর method অন্য object-এর data-র সাথে use করা
const printer = {
  display: function (prefix) {
    console.log(prefix + ' ' + this.text);
  },
};

const doc = { text: 'Important Document' };
printer.display.call(doc, 'Printing:'); // Printing: Important Document

//? display method টা printer-এর হলেও this doc-কে বানিয়ে দিলাম - এটাই function borrowing.

//* 3. Constructor Borrowing (ES5 way)
function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Employee(name, age, designation) {
  //! Person constructor-কে call করে this (Employee instance) কে সেট করা
  Person.call(this, name, age);
  this.designation = designation;
}

const emp1 = new Employee('Jabbar', 30, 'Manager');
console.log(emp1.name, emp1.age, emp1.designation); // Jabbar 30 Manager

//? এখানে Person.call(this, name, age) দিয়ে আমরা প্যারেন্ট constructor-কে ধার করলাম।

//* 4. কখন this দরকার নেই - null বা undefined পাস
const numbers = [2, 99, 5];
const maxWithCall = Math.max.call(null, 2, 99, 5); // 99 (কিন্তু array সরাসরি দেওয়া যায় না)
//? array-র জন্য call ব্যবহার করতে গেলে manually spread করতে হয়, তাই apply আসে কাজে

//* 5. call দিয়ে type checking (real-world)
const arr = [1, 2, 3];
const isArray = Object.prototype.toString.call(arr) === '[object Array]'; // true
//? এটা নির্ভরযোগ্য type check যেটা typeof চেক করতে পারে না

// ================================================================
// ! SECTION 2 : APPLY METHOD
// ================================================================
//! apply: call-এর জমজ ভাই; সাথে সাথেই invoke, this change,
//!        কিন্তু arguments নেয় একটা array (বা array-like) আকারে।

//* Syntax: functionName.apply(thisArg, [arg1, arg2, ...])

//* 1. Basic use
fullIntro.apply(user2, ['Chittagong', 'Bangladesh']); // Karim lives in Chittagong, Bangladesh

//* 2. Math.max/min - ক্লাসিক use case
const scores = [73, 42, 88, 91, 5];
const highest = Math.max.apply(null, scores); // 91
const lowest = Math.min.apply(null, scores); // 5

//? ES6-এ spread operator: Math.max(...scores) এখন বেশি ব্যবহার হয়, কিন্তু apply বুঝা জরুরি।

//* 3. array-like object (arguments) পাস করা
function logAll() {
  // arguments একটা array-like object
  console.log.apply(console, arguments);
}
logAll('Hello', 'World', 2025); // Hello World 2025

//? পুরনো কোডে দেখা যেত; এখন rest parameter ব্যবহার করাই ভালো।

//* 4. function borrowing apply দিয়েও
const calc = {
  sum: function (a, b, c) {
    return this.base + a + b + c;
  },
};
const ctx = { base: 10 };
const result = calc.sum.apply(ctx, [1, 2, 3]); // 16
//? call হলে calc.sum.call(ctx,1,2,3) দিতে হতো।

// ================================================================
// ! SECTION 3 : BIND METHOD
// ================================================================
//! bind: সাথে সাথে invoke করে না। নতুন একটা function ফেরত দেয়,
//!       যেখানে this চিরস্থায়ীভাবে বেঁধে দেওয়া থাকে (bound)।
//!       arguments ও partial (কিছু) fix করে রাখা যায় (currying)।

//* Syntax: const boundFn = originalFn.bind(thisArg, arg1, arg2, ...);

//* 1. Basic bind - পরে invoke
const boundFullIntro = fullIntro.bind(user1, 'Sylhet', 'Bangladesh');
// boundFullIntro এখনো call করিনি, শুধু function বানিয়েছি
boundFullIntro(); // Rahim lives in Sylhet, Bangladesh

setTimeout(boundFullIntro, 2000); // 2 সেকেন্ড পরও this ঠিক থাকবে

//? call/apply হত তাহলে সাথে সাথে invoke হয়ে যেত, কিন্তু bind function বানিয়ে রেখে দেয়।

//* 2. Partial Application (currying) - bind এর বিরাট শক্তি
const introKarim = fullIntro.bind(user2, 'Khulna'); // city fix
introKarim('Bangladesh'); // Karim lives in Khulna, Bangladesh
introKarim('India'); // Karim lives in Khulna, India
//? প্রথম argument city fixed, country পরে যেই দিবো সেটা নিবে।

//* সব arguments fix করে দিলে পরে আর দিতে হয় না
const introFull = fullIntro.bind(user2, 'Rajshahi', 'Bangladesh');
introFull(); // Karim lives in Rajshahi, Bangladesh

//* 3. Real-world: Event handler-এ this ফিক্স
//? ধরি, HTML-এ <button id="btn">Click</button> আছে
const button = {
  element: document.getElementById('btn'),
  name: 'Rahim',
  init: function () {
    // ক্লিক হ্যান্ডলার-এ this ঠিক রাখতে bind আবশ্যক
    this.element.addEventListener('click', this.handleClick.bind(this));
  },
  handleClick: function () {
    console.log('Hello ' + this.name); // this যেন button-টাই হয় (Rahim)
  },
};
button.init();
//? bind না করলে this হবে HTML element, name পেতাম না।

//* 4. bind করা function-এ আবার call/apply/bind কাজ করবে না (this locked)
const objA = { name: 'A' };
const objB = { name: 'B' };
function showName() {
  console.log(this.name);
}

const boundShow = showName.bind(objA);
boundShow(); // A
boundShow.call(objB); // A (ignore call)
boundShow.apply(objB); // A (ignore apply)
const rebind = boundShow.bind(objB);
rebind(); // A (bind precedence স্থায়ী)

//? একমাত্র new keyword দিয়ে constructor হিসেবে ডাকলে bind ওভাররাইড হয়, কিন্তু ওটা exception.

//* 5. Arrow function আর bind - অকেজো
//! Arrow function তার enclosing scope থেকে this নেয়, তাই bind/call/apply কার্যকর না
const arrowFunc = () => {
  console.log(this);
};
const objTest = { name: 'Test' };
arrowFunc.bind(objTest)(); // এখনো enclosing scope-র this (global/window/module)
//? মনে রাখবি: arrow function দিয়ে bind এড়ানো যায়, কিন্তু দরকারে bind করতে চাইলে normal function চাই।

// ================================================================
// ! SUMMARY TABLE (মুখস্থ করার জন্য)
// ================================================================
/*
 * Method | Invoke করে?       | Arguments কেমন?            | Return কী?
 * -------------------------------------------------------------------------
 * call   | সাথে সাথেই (immediate) | comma separated (arg1, arg2) | function-এর result
 * apply  | সাথে সাথেই            | array বা array-like         | function-এর result
 * bind   | পরে (নতুন ফাংশন)      | comma separated (partial fix) | নতুন bound function
 */

//? একলাইনে মন্ত্র:
//? call  => এখনই comma দিয়ে দে
//? apply => এখনই array দিয়ে দে
//? bind  => বেঁধে রাখ (বাঁধাই function), পরে খুলবি

// ================================================================
// ! BEHIND THE SCENES (কিছু ধারণা)
// ================================================================
//* call / apply প্রায় একই রকম কাজ করে ইঞ্জিনে: context object-এ টেম্পোরারিলি method assign,
//* তারপর invoke করে আবার delete করে দেয়। bind অভ্যন্তরীণভাবে closure তৈরি করে।
//? নিজের পলিফিল বোঝা থাকলে আরও গভীরে বোঝা যায়, তবে আপাতত এইটুকুই যথেষ্ট।

// ================================================================
// ! PRACTICE SCENARIOS (নিজে করিস)
// ================================================================
//? 1. একটা log function বানা, যেটা call/apply দিয়ে বিভিন্ন object-র context-এ message print করবে
//? 2. Math.max.apply দিয়ে অ্যারে থেকে বড় সংখ্যা বের কর, তারপর spread operator দিয়ে কর
//? 3. একটা increment function বানা bind দিয়ে partial application করে, পরে call কর
//? 4. Event listener-এ bind ছাড়া ও bindসহ behaviour দেখ
//? 5. Arrow function-এ bind দিয়ে দেখ কোনোটাই কাজ করে না

// ================================================================
// ! শেষ কথা
// ================================================================
//! call, apply, bind - এই তিন method জাভাস্ক্রিপ্টে function-এর context control
//! করার অব্যর্থ হাতিয়ার। এগুলো বুঝলে "this" আর ভয় লাগবে না।
//! যেকোনো জায়গায় ফাংশন ধার করতে পারবি, callback-এ this হারানোর টেনশন থাকবে না।
