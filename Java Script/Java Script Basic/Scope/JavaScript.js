//! JavaScript Scope

//* Definition of Scope:
// Scope মানে হলো একটা নির্দিষ্ট এলাকা (boundary) যেখান থেকে variable ও function-কে access করা যায়।
// জাভাস্ক্রিপ্টে scope নির্ধারণ করে দেয়, কোন ভেরিয়েবল কোথায় visible আর কোথায় নয়।
// মূলত তিন ধরনের scope: Global Scope, Function Scope, Block Scope।
// Lexical Scope: function যেখানে লেখা হয়, তার parent scope-কে access করতে পারে।
// এই পুরো ব্যাপারটাকে বলে Scope Chain।

//* 1. Global Scope:
// GEC-এর ভেতরে যেসব variable/function সরাসরি declare হয়, তারা global scope-এর অন্তর্ভুক্ত।
// এগুলো কোডের যেকোনো জায়গা থেকে access করা যায় (function-এর ভেতর থেকেও)।
// Browser-এ global variable window object-এর property হয়ে যায় (শুধু var এবং function declaration)।
// let/const দিয়েও global scope তৈরি হয়, কিন্তু তারা window object-এ যোগ হয় না।

var globalVar = 'I am global var'; // window.globalVar
let globalLet = 'I am global let'; // window-এ নাই
const globalConst = 'I am global const'; // window-এ নাই

function showGlobal() {
  console.log(globalVar); // accessible
  console.log(globalLet); // accessible (lexical scope)
  console.log(globalConst); // accessible
}
showGlobal();

/*
GEC:
  Creation Phase:
    - globalVar: undefined (var hoisting)
    - globalLet: TDZ (uninitialized)
    - globalConst: TDZ (uninitialized)
    - showGlobal: function body store

  Execution Phase:
    - globalVar = "I am global var"
    - globalLet = "I am global let"  (TDZ শেষ)
    - globalConst = "I am global const"
    - showGlobal() call → FEC তৈরি
*/

//* 2. Function Scope (Local Scope):
// Function-এর ভেতরে declare করা variable শুধু সেই function-এর ভেতরে accessible.
// বাইরে থেকে access করতে গেলে ReferenceError.
// প্রতিটি function call নিজস্ব function scope তৈরি করে।
// var, let, const সবই function-scoped (function-এর বাইরে visible না)
// তবে var function-scoped হলেও block-scoped না (nearest function-এর বাইরে leak করে না, কিন্তু if/for block-এ discount দেয় না)।

function outer() {
  var functionVar = 'Inside outer';
  let functionLet = 'Outer let';
  const functionConst = 'Outer const';

  function inner() {
    console.log(functionVar); // accessible (closure/scope chain)
    console.log(functionLet);
    console.log(functionConst);
  }
  inner();
  console.log(functionVar); // accessible (একই function scope)
}
outer();
// console.log(functionVar); // ReferenceError (function scope বাইরে নাই)

/*
FEC (outer):
  Creation Phase:
    - arguments: empty
    - this: window (non-strict)
    - functionVar: undefined (var hoisting)
    - functionLet: TDZ (uninitialized)
    - functionConst: TDZ
    - inner: function body store
  Execution Phase:
    - functionVar = "Inside outer"
    - functionLet = "Outer let"
    - functionConst = "Outer const"
    - inner() call -> inner FEC
*/

//* 3. Block Scope (ES6 let, const):
// {} ব্লকের ভেতরে let/const দিয়ে declare variable শুধু সেই ব্লকের ভেতরে সীমাবদ্ধ।
// var block scope মানে না, এটি function-scoped বা global-scoped (যেখানে declare হয়েছে)।
// Block scope: if, else, for, while, switch, এবং standalone {}.

{
  var blockVar = 'var inside block'; // function-scoped/global (window)
  let blockLet = 'let inside block'; // block-scoped
  const blockConst = 'const inside block'; // block-scoped
}
console.log(blockVar); // "var inside block" (block-এর বাইরেও আছে)
// console.log(blockLet); // ReferenceError
// console.log(blockConst); // ReferenceError

// Loop-এ block scope গুরুত্বপূর্ণ:
for (let i = 0; i < 3; i++) {
  console.log(i); // 0,1,2
}
// console.log(i); // ReferenceError (let block-scoped)

for (var j = 0; j < 3; j++) {
  console.log(j); // 0,1,2
}
console.log(j); // 3 (var function-scoped/global, leak করে)

//* 4. Lexical Scope & Scope Chain:
// জাভাস্ক্রিপ্ট nested function-এর ক্ষেত্রে inner function তার outer function-এর variable access করতে পারে।
// এটাকে Lexical Scoping বলে: function যেখানে লেখা (defined) হয়েছে, সেই location অনুযায়ী scope নির্ধারিত।
// Scope chain: inner scope -> parent scope -> global scope (একদম বাইরের window পর্যন্ত)
// প্রতিটি execution context-এর creation phase-এ [[Scope]] বা outer reference set হয়।

let outerVar = 'Outer';
function outerFunc() {
  let innerVar = 'Inner';
  function innerFunc() {
    let innermostVar = 'Innermost';
    console.log(innermostVar); // নিজের
    console.log(innerVar); // parent থেকে (lexical)
    console.log(outerVar); // grandparent (global) থেকে (lexical)
  }
  innerFunc();
}
outerFunc();

/*
GEC:
  CP:
    outerVar: TDZ
    outerFunc: function body
    (ignoring other)
  EP:
    outerVar = "Outer"
    outerFunc() call -> outerFunc FEC

outerFunc FEC:
  CP:
    innerVar: TDZ
    innerFunc: function body
  EP:
    innerVar = "Inner"
    innerFunc() call -> innerFunc FEC

innerFunc FEC:
  CP:
    innermostVar: TDZ
    outer reference -> outerFunc FEC (lexical)
  EP:
    innermostVar = "Innermost"
    console.log(innermostVar) -> scope chain: innerFunc -> outerFunc -> GEC
    innermostVar পায়, innerVar outerFunc-এ আছে, outerVar GEC-এ আছে
*/

//* 5. Scope & var/let/const hoisting recap:
// - var: function-scoped বা global-scoped, block scope মানে না, hoisting-এ undefined।
// - let/const: block-scoped ({}), hoisting-এ TDZ।
// - function declaration: function-scoped (অথবা global)।
// - Lexical scope-এর কারণে closure তৈরি হয় (function তার outer variable মনে রাখে)।

// উদাহরণ: var ও let-এর block scope difference
function scopeTest() {
  if (true) {
    var x = 'var x'; // function-scoped (না block-scoped)
    let y = 'let y'; // block-scoped
    const z = 'const z'; // block-scoped
  }
  console.log(x); // "var x" (access করা যাচ্ছে)
  // console.log(y); // ReferenceError
  // console.log(z); // ReferenceError
}
scopeTest();

/*
GEC:
  CP:
    scopeTest: f()
  EP:
    scopeTest() -> FEC

FEC scopeTest:
  CP:
    x: undefined (function-scoped, hoisted)
    y: TDZ (block-scoped, কিন্তু hoisted)
    z: TDZ
  EP:
    if block execute:
      x = "var x" (assign)
      y = "let y" (TDZ শেষ, initialize)
      z = "const z" (TDZ শেষ, initialize)
    block শেষ: y, z block-scope-এর বাইরে অ্যাশেবল না, destroy/out of scope
    x এখনো function scope-এ আছে, তাই accessible
*/

//* 6. Scope chain বনাম Call Stack:
// scope chain: function যেখানে লেখা হয়েছে তার ভিত্তিতে তৈরি হয় (lexical)
// call stack: function কীভাবে call হয়েছে তার sequence (execution)
// closure: inner function outer function-এর variable access করে, outer function execute শেষ হবার পরেও (যদি reference থাকে)।
// closure হলো lexical scope-এর একটি ফলাফল।

function createCounter() {
  let count = 0; // private variable (outer scope)
  return function () {
    // anonymous function
    count++;
    console.log(count);
  };
}
const counter = createCounter();
counter(); // 1
counter(); // 2
// count variable টা createCounter-এর execution শেষ হবার পরেও closure হয়ে থাকে।

/*
GEC:
  createCounter: f
  counter: undefined (const, TDZ) -> assign function
  তারপর counter() -> FEC of returned function
    returned function-এর [[Scope]]: createCounter FEC (lexical)
    createCounter FEC Execution শেষ, কিন্তু count variable garbage collected না, কারণ closure reference আছে।
*/

//! সংক্ষেপে Scope মনে রাখার পয়েন্ট:
/*
- Global Scope:    কোডের যেকোনো জায়গা থেকে accessible.
- Function Scope:  function-এর ভেতরে define variable; বাইরে accessible না।
- Block Scope:     {} এর ভেতরে let/const define variable; বাইরে accessible না।
- Lexical Scope:   inner function বাইরের function-এর variable পায় (নিজের parent, grandparent ইত্যাদি)।
- Hoisting:        var -> function/global scope-এ উপরে undefined;
                   let/const -> block scope, কিন্তু TDZ;
                   function declaration -> function/global scope, পুরা body।
*/
