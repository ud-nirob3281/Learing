//! JavaScript Execution Context
/* 
JS engine code run করার আগে:
  1. Tokenization: কোড ভেঙে ছোট ছোট টুকরা (token) বানায়।
  2. Parsing: Tokens দিয়ে AST (Abstract Syntax Tree) তৈরি করে।
  3. Compilation / Execution: AST থেকে machine code বানিয়ে execute করে।
  
Execution Context: 
  কোড execute করার জন্য যে environment দরকার (variables, functions, scope chain, this) 
  তাকে Execution Context বলে। প্রতিবার function call-এ নতুন একটা execution context তৈরি হয়।
*/

//* Global Execution Context (GEC):
// যখন JS code first time run হয়, তখন default ভাবে GEC তৈরি হয়।
// সব global code (function-এর বাইরের code) এই context-এ run হয়।
// Browser-এ global object = 'window',  Node.js-এ 'global'।
// GEC-এ this === window (non-strict mode)

/* 
GEC-এর দুটি Phase:
▶️ Creation Phase (Memory Allocation):
    - window object + this (window) set হয়।
    - var variable-গুলোর জন্য memory allocate হয়, value = undefined (hoisting)।
    - let, const variable-গুলোর জন্যও memory allocate হয়, কিন্তু value UNINITIALIZED (TDZ)। 
      (access করলে ReferenceError)
    - function declaration পুরো body-সহ memory-তে store হয় (function hoisting)।
    - function expression (var/let/const) ভেরিয়েবল হিসেবেই store, body না।
    
▶️ Execution Phase (Code Run):
    - Line by line code execute হয়।
    - var variable-এ মান assign হয়।
    - let/const যেই লাইনে declare, সেই লাইনে initialization হয়; তার আগে TDZ।
    - function call পেলে নতুন Function Execution Context (FEC) তৈরি হয়।
*/

//* Function Execution Context (FEC):
// যখন কোনো function call হয়, তখন নতুন FEC তৈরি হয়।
// প্রতিটি function call-এর জন্য আলাদা FEC।

/*
FEC-এর দুটি Phase:
▶️ Creation Phase:
    - arguments object তৈরি হয় (array-like, প্যারামিটারগুলোর list)।
    - this keyword bind হয় (function যেভাবে call হয়েছে তার উপর ভিত্তি করে)।
    - function parameter-গুলোর জন্য memory allocate হয় (start with undefined, পরে value set)।
    - function-এর ভেতরে থাকা var variables -> undefined, let/const -> TDZ (uninitialized)।
    - nested function declaration পুরো body-সহ memory-তে store হয়।
    - scope chain set হয় (outer environment এর reference রাখে)।

▶️ Execution Phase:
    - parameter গুলোতে passed value assign হয়।
    - Local variable গুলোতে value assign হয়।
    - Nested function call পেলে নতুন FEC তৈরি হয়, Call Stack-এ push হয়।
    - Function শেষ হলে FEC destroy হয় (Call Stack থেকে pop)।
*/

//? Example 1: let / const behaviour & function
let myName = 'Safa';
function love() {
  console.log(`I love you ${myName}`);
}
love();

/*
GEC:
  Creation Phase:
    - myName: memory allocate (let -> TDZ, uninitialized)
    - love: function body store

  Execution Phase:
    - myName = 'Safa'  (TDZ শেষ, initialize)
    - love() call -> FEC তৈরি

FEC (for love):
  Creation Phase:
    - arguments object (empty, কারণ কোনো প্যারামিটার নেই)
    - this: global object (window) / strict mode-এ undefined
    - কোনো local variable নাই
    - scope chain: [FEC -> GEC]
  Execution Phase:
    - console.log() execute -> output: "I love you Safa"
*/

//? Example 2: var vs let hoisting & nested functions
var a = 5;
function testMe() {
  var b = 10;
  var user = {
    name: 'Nirob',
    country: 'BanglaDesh',
  };
  function testAgain() {
    console.log('abc');
    console.log('def');
  }
  testAgain();
}
testMe();

/*
GEC:
  Creation Phase:
    - a: undefined (var hoisting, window.a = undefined)
    - testMe: function body store
  Execution Phase:
    - a = 5
    - testMe() call -> FEC

FEC (for testMe):
  Creation Phase:
    - arguments: empty (no params)
    - this: window (non-strict)
    - b: undefined (var hoisting)
    - user: undefined (var hoisting)
    - testAgain: function body store
  Execution Phase:
    - b = 10
    - user = {name:'Nirob', ...}
    - testAgain() call -> new FEC

FEC (for testAgain):
  Creation Phase:
    - (no variables)
    - scope chain: [testAgain FEC -> testMe FEC -> GEC]
  Execution Phase:
    - console.log('abc')
    - console.log('def')
    - return (destroy FEC)
*/

//? Example 3: Function Expression hoisting (error দেখানো)

//testFunc(); // TypeError: testFunc is not a function
var testFunc = function () {
  console.log('Hi');
};

/*
GEC:
  Creation Phase:
    - testFunc: undefined (var hoisting)
  Execution Phase:
    - testFunc() call -> যেহেতু testFunc এখনো undefined, 
      তাই TypeError: testFunc is not a function
    - তারপর testFunc = function() {...} (কিন্তু error-এর জন্য এ লাইন এক্সিকিউট হবে না)
*/

//! মনে রাখার মূল পয়েন্ট:
// - Hoisting: var -> undefined; let/const -> TDZ (uninitialized);
// - Function declaration পুরা body-সহ hoist হয়, তাই আগে call করা যায়।
// - Function expression / arrow function শুধু variable hoist হয়, body না।
// - GEC সবচেয়ে বাইরের layer, FEC function call-এ create হয়।
// - Call stack: LIFO; function শেষ হলে FEC pop হয়।

// Draw in Js memory watch this Video https://youtu.be/_4hyUJBV8Aw?si=yjscu12t2qqFHA7c&t=1982
