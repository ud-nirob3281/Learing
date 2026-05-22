//! JavaScript Scope

//* Definition of Scope:
// Scope মানে হলো একটা নির্দিষ্ট এলাকা (boundary) যেখান থেকে variable ও function-কে access করা যায়।
// জাভাস্ক্রিপ্টে scope নির্ধারণ করে দেয়, কোন ভেরিয়েবল কোথায় visible আর কোথায় নয়।
// মূলত তিন ধরনের scope: Global Scope, Function Scope, Block Scope। and Other scope is module scope and lexical scope 
// Lexical Scope: function যেখানে লেখা হয়, তার parent scope-কে access করতে পারে। 
//English Definition:Where a function can access variables is decided by where the function is written in the code, not where it is called.


// Module scope: মডিউলার স্কোপ হচ্ছে জাভাস্ক্রিপ্টের আলাদা ফাইলের নিজস্ব একান্ত জায়গা। যখন আমরা ES6 Modules ব্যবহার করি (যেমন export / import), তখন প্রতিটা .js ফাইল নিজেই একটা আলাদা স্কোপ পেয়ে যায়। ওই ফাইলের ভেরিয়েবল, ফাংশন বাইরে থেকে অ্যাক্সেস করা যায় না, যতক্ষণ না তুমি সেটাকে export করো।
//England Definition:Each JavaScript module (file) has its own private scope; variables and functions are not visible outside unless they are explicitly exported.

//* 1. Global Scope:
// GEC-এর ভেতরে যেসব variable/function সরাসরি declare হয়, তারা global scope-এর অন্তর্ভুক্ত।
// এগুলো কোডের যেকোনো জায়গা থেকে access করা যায় (function-এর ভেতর থেকেও)।
// Browser-এ global variable window object-এর property হয়ে যায় (শুধু var এবং function declaration)।
// let/const দিয়েও global scope তৈরি হয়, কিন্তু তারা window object-এ যোগ হয় না।

//English definition: Variables declared outside any function or block are in the global scope. They can be accessed from anywhere in the code.

var globalVar = 'I am global var'; // window.globalVar
let globalLet = 'I am global let'; // window-এ নাই
const globalConst = 'I am global const'; // window-এ নাই


//* 2. Function Scope (Local Scope):
// Function-এর ভেতরে declare করা variable শুধু সেই function-এর ভেতরে accessible.
// বাইরে থেকে access করতে গেলে ReferenceError.
// প্রতিটি function call নিজস্ব function scope তৈরি করে।
// var, let, const সবই function-scoped (function-এর বাইরে visible না)
// তবে var function-scoped হলেও block-scoped না (nearest function-এর বাইরে leak করে না, কিন্তু if/for block-এ discount দেয় না)।

//English Definition: Variables declared inside a function (using var) are function-scoped. They can only be accessed within that function, not outside.

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

//English Definition: Variables declared with let or const inside a block {} are block-scoped. They exist only within that block (like in an if statement or a loop).

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



//* Scope chain বনাম Call Stack:
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
