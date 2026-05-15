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

//! Hoisting
//* Varriable Hoisting

console.log(name); //und...
var name;
name = 'tom';
console.log(name); //tom

//? NOTE: GLC তে var এত value UNDIFINED save হয় কিন্তু let,const UNDIFINED save হয়না uninlisize হয়।
//*console.log(name1); // Error name1 is't defind(TDZ)
let name1;
name1 = 'tom';
console.log(name1); //tom

/*
    Creation Phase
        log func go to memory
        name create in memory name value is undifined

    Excuteing Phase
        Call first log func output is undifined Because name Value set undifined in creation phase
        Assign name value 'tom'
        Call second log func output is 'tom'

    Explanation:https://youtu.be/K0GO30KqS00?si=0rI0P4LqdzYzR_1g&t=85
*/

//*Function Hoisting
ches();
function ches() {
  console.log('ches');
  caugth();
}

function caugth() {
  console.log('caugth');
}
/*
  GLC
      CP
         Save memory in all func
      EP
          Excute ches() So create FEC

  FEC(for ches())
      CP
         save memory in log
      EP
          Excute log
          Excute caugth So create another FEC
          
        FEC(for Caugth())
          CP
             save memory in log
           EP
          Excute log
       
 */

//test();
var test = function () {
  console.log('Hi Safa');
}; //Output: Error test is not a function

/*
We make function like function test(){...} --> This Case 'test' is function name.
But We make function like let test = finction(){...} --> This Case 'test' isn't function name 'test' is varriable name and test value is function.

Our Code case 
  GEC
    CP
      Create Varriabe It value is Undifined
    EP
      Excute test() [test is undi.. so undifined()->test is not a function]
      Assaign test value in function
Explanation:https://youtu.be/K0GO30KqS00?si=0ut-NRivdbjKuDsM&t=696
*/
//! Scope

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

//! JavaScript Closure

//* Definition of Closure:
// Closure তখন তৈরি হয় যখন একটা inner function তার outer function-এর variable-গুলো access করতে পারে,
// এমনকি outer function-এর execution শেষ হয়ে যাওয়ার পরেও।
// এটা JavaScript-এর lexical scoping-এর কারণে সম্ভব।
// সহজ ভাষায়: "একটা function তার জন্মস্থানের (lexical environment) স্মৃতি ধরে রাখে।"

//* How Closure Works (Execution Context ও Scope Chain এর মাধ্যমে):
/*
যখন কোনো function define হয়, creation phase-এ তার [[Scope]] বা outer reference set হয়।
এই outer reference ওই function-এর জন্মস্থানের environment-কে point করে।
Function যখন call হয়, execution context-এ scope chain তৈরি হয়:
    Current FEC -> Outer FEC (lexical) -> GEC
এমনকি outer function execution শেষ হয়ে call stack থেকে সরে গেলেও,
যদি inner function বেঁচে থাকে এবং outer-এর variable-কে reference করে,
তখন garbage collector সেই variable-গুলোকে memory থেকে সরায় না।
এই retained environment-ই closure.
*/

//* 1. Simple Closure Example:
function outer() {
  let outerVar = 'I am from outer'; // outer function-এর local variable

  function inner() {
    console.log(outerVar); // inner তার জন্মস্থানের (outer) variable access করছে
  }

  return inner; // inner function-টা return করে দিচ্ছি, কিন্তু call করছি না
}

const myClosure = outer(); // outer call শেষ, normally outerVar destroy হবার কথা
myClosure(); // তারপরও "I am from outer" print করে -> Closure magic!

/*
Execution Flow:
GEC:
  CP:
    outer: function body
    myClosure: TDZ (let/const)
  EP:
    outer() call -> outer FEC তৈরি

outer FEC:
  CP:
    outerVar: TDZ (let)
    inner: function body store (তার [[Scope]]: outer FEC)
  EP:
    outerVar = "I am from outer"
    return inner -> myClosure receive করে inner function-টা
    outer FEC execution শেষ, call stack থেকে pop

এখন outer FEC চলে গেছে, কিন্তু inner function-এর [[Scope]] এখনো outer-এর environment-কে reference করে আছে।
যেহেতু outerVar inner থেকে access করা হয়েছে, GC সেটা ফেলে দেয় না।
myClosure() call দিলে inner FEC তৈরি হয়, scope chain-এ outerVar খুঁজে পায়।
*/

//* 2. Private Variable / Counter Pattern (Closure-এর বাস্তব ব্যবহার):
{
  function createCounter() {
    let count = 0; // private variable, বাইরে থেকে সরাসরি access নাই

    return function () {
      count++;
      console.log(count);
    };
  }

  const counter = createCounter();
  counter(); // 1
  counter(); // 2
  counter(); // 3
}
// console.log(count); // ReferenceError (private, এই closure-এর কারণে)

/*
GEC:
  createCounter: function body
  counter: TDZ -> পরে assign
  counter() -> inner FEC
    inner-এর [[Scope]] -> createCounter FEC (lexical)
    createCounter FEC-এর count variable বার বার update হয়, কারণ প্রতিবার একই environment refer করে।
    createCounter execution শেষ, কিন্তু count memory-তে থেকে যায়।
*/

//* 3. Multiple Closures & Independent Copies:
function createCounters() {
  let count = 0;
  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getCount: function () {
      return count;
    },
  };
}

const myCounter = createCounters();
myCounter.increment();
myCounter.increment();
console.log(myCounter.getCount()); // 2
myCounter.decrement();
console.log(myCounter.getCount()); // 1

// count variable টা increment, decrement, getCount সবার মধ্যে shared closure.
// এইটা module pattern-এর ভিত্তি (private state)।

//* 4. Closure inside Loop (let vs var - famous pitfall):
// var দিয়ে loop-এ closure বানালে সমস্যা, কারণ var function-scoped, block-scoped না।

for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(i); // সব 4 প্রিন্ট করবে (var i পুরো function-scope-এ একটাই)
  }, 100);
}
// Output (after 100ms): 4 4 4

/*
কারণ: setTimeout-এর callback গুলো closure i-কে reference করে, কিন্তু i var দিয়ে function-scope-এ একটাই।
Loop শেষে i-এর মান 4, তারপর callback গুলো execute হলে 4 দেখায়।
*/

// সমাধান 1: let (block-scoped) ব্যবহার
for (let j = 1; j <= 3; j++) {
  setTimeout(function () {
    console.log(j); // 1 2 3 (প্রতিটি iteration-এ নতুন block scope, নতুন j)
  }, 100);
}

// সমাধান 2: IIFE (Immediately Invoked Function Expression) দিয়ে new scope বাধ্য করা
for (var k = 1; k <= 3; k++) {
  (function (currentK) {
    setTimeout(function () {
      console.log(currentK); // 1 2 3 (currentK parameter-টা আলাদা copy)
    }, 100);
  })(k);
}

//* 5. Closure & Memory Leak Awareness:
// Closure powerful কিন্তু অপ্রয়োজনে অনেক ভারী object closure-এ রেখে দিলে memory leak হতে পারে।
// যেসব DOM element বা বড় data closure-এ unintentional reference রাখলে সেগুলো manually null করে দেওয়া উচিত।

function heavyData() {
  let bigObject = { data: new Array(1000000).fill('*') };
  return function () {
    console.log('I keep bigObject alive');
    // যদি bigObject use নাও করি, reference থাকার কারণে garbage collected হবে না।
  };
}
const hold = heavyData(); // bigObject memory-তে রয়ে গেল
// hold = null; // করলে memory free হবে

//* 6. Closure with Parameters & Returned Function Chain:
function multiply(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiply(2);
const triple = multiply(3);
console.log(double(5)); // 10 (5 * 2)
console.log(triple(5)); // 15 (5 * 3)

/*
multiply(2) call হলে factor=2 সহ anonymous function return করে।
double-এর [[Scope]]-এ factor=2 store থাকে।
যখন double(5) call, number=5, factor=2 ব্যবহার, return 10.
একইভাবে triple-এর নিজস্ব factor=3।
Function factory pattern.
*/

//* 7. Closure & Execution Context Visualisation:
function outerFunc(outerParam) {
  let outerLet = 'outerLet';
  const outerConst = 'outerConst';

  function innerFunc(innerParam) {
    let innerLet = 'innerLet';
    console.log(outerParam, outerLet, outerConst, innerParam, innerLet);
  }
  return innerFunc;
}

const innerRef = outerFunc('param');
innerRef('innerParam'); // output: param outerLet outerConst innerParam innerLet

/*
GEC:
  CP: outerFunc, innerRef (TDZ)
  EP: outerFunc("param") -> outerFunc FEC

outerFunc FEC:
  CP:
    outerParam: undefined -> later "param" (parameter memory allocate, then assign in EP)
    outerLet: TDZ
    outerConst: TDZ
    innerFunc: function body ([[Scope]] -> outerFunc FEC)
  EP:
    outerParam = "param"
    outerLet = "outerLet"
    outerConst = "outerConst"
    return innerFunc -> innerRef = innerFunc

outerFunc FEC execution শেষ, call stack থেকে remove.
কিন্তু innerRef এখনো innerFunc-কে hold করে, তার [[Scope]] outerFunc FEC কে reference করে,
তাই outerParam, outerLet, outerConst এখনো মেমোরিতে আছে।

innerRef("innerParam") -> innerFunc FEC:
  CP:
    innerParam: undefined -> later "innerParam"
    innerLet: TDZ
    scope chain: innerFunc FEC -> outerFunc FEC (lexical) -> GEC
  EP:
    innerParam = "innerParam"
    innerLet = "innerLet"
    console.log(...) outerParam, outerLet, outerConst scope chain দিয়ে খুঁজে পায়।
*/

//! সংক্ষেপে Closure মনে রাখার পয়েন্ট:
/*
- Closure = function + তার surrounding lexical environment (outer scope)।
- Inner function outer function-এর variable access করতে পারে, outer return/execution শেষ হবার পরেও।
- Closure তৈরি হয় যখন inner function কে return করা হয় বা অন্যত্র reference রাখা হয়।
- প্রতিটি function call-এর নিজস্ব closure environment স্বাধীন (multiple instances)।
- Closure use case: data privacy, function factory, module pattern, callbacks, event handlers, currying।
- let vs var: loop closure এ let ব্যবহার করলে প্রতিটি iteration নতুন block scope পায়, var দিলে একটাই।
- Performance: অপ্রয়োজনীয় closure memory leak করতে পারে, দরকার শেষে reference null করা ভালো।
*/

//! Java Script Memory Managemant

//* Definition:
// Memory management মানে হচ্ছে কিভাবে JS engine (V8, SpiderMonkey etc.)
// প্রোগ্রামের জন্য memory allocate করে, ব্যবহার করে, এবং যখন আর দরকার নেই
// তখন release করে। JS একটি high-level garbage-collected ভাষা,
// অর্থাৎ ডেভেলপারকে manually malloc/free করতে হয় না।
// কিন্তু engine-এর internal process বুঝতে পারলে memory leak avoid করা সহজ হয়।

//* 1. Memory Lifecycle (তিনটা ধাপ)
/*
ধাপ ১: Allocation (বরাদ্দ) → Engine variable declaration, function, object এর জন্য
          memory allocate করে (creation phase এইটা করে).
ধাপ ২: Usage (ব্যবহার) → Execution phase-এ variable read/write হয়.
ধাপ ৩: Release (মুক্তি) → যখন data আর reachable না, তখন Garbage Collector
          memory free করে দেয়।
*/

//* 2. Stack বনাম Heap (কোথায় কী থাকে?)
// JavaScript-এ memory প্রধানত দুই জায়গায় জমা হয়:

// ✅ Stack:
// - Fixed size, fast access (LIFO structure like plates).
// - Primitive values (string, number, boolean, null, undefined, symbol, bigint) store হয়।
// - Function call-এর execution context (local variables, references) stack-এ থাকে।
// - Static memory allocation (size compile-time জানা).

// ✅ Heap:
// - Dynamic size, slower access (unstructured, large pool).
// - Reference types (objects, arrays, functions) এখানে store হয়।
// - Dynamic memory allocation (size runtime-এ বাড়তে পারে)।
{
  let myName = 'Safa'; // Stack-এ "Safa" (primitive)
  let age = 25; // Stack-এ 25
  let user = {
    // Heap-এ { name: "Nirob", age: 30 }, user ভেরিয়েবল Stack-এ reference ধরে
    name: 'Nirob',
    age: 30,
  };

  /*
  Stack:
    myName -> "Safa"
    age -> 25
    user -> 0x001 (heap address)
  Heap:
    0x001: { name: "Nirob", age: 30 }
  */

  // যখন user object copy করি:
  let anotherUser = user; // anotherUser stack-এ নতুন reference, কিন্তু heap-এ সেই একই object point করে
  anotherUser.age = 31;
  console.log(user.age); // 31 (mutation, because same reference)

  // Primitive copy করে সম্পূর্ণ নতুন value:
  let newAge = age;
  newAge = 26;
  console.log(age); // 25 (unchanged)
}
//* 3. Execution Context & Memory
// প্রতিটি execution context creation phase-এ memory allocation করে।
// এইটা আমরা আগের নোটে detail দেখেছি।
// Stack-এ প্রতিটি function call-এর জন্য একটা frame push হয়, return-এ pop হয়।
// Call stack overflow যখন infinite recursion হয়।

function eat() {
  let food = 'Biriyani'; // stack-এ food variable, heap-এ "Biriyani" (string primitive stack-এই থাকে আসলে)
  eat(); // infinite recursion (stack overflow)
}
// eat();  // আনকমেন্ট করলে Maximum call stack size exceeded

//* 4. Garbage Collection (GC) – Automatic Cleanup
// JavaScript মেমোরি থেকে ডাটা সরায় যখন সেটা unreachable হয়ে যায়।
// দুটি প্রধান algorithm:

// 4.1 Mark-and-Sweep (আধুনিক engine-এ standard)
/*
🌳 বাগানের গল্প (Garden Analogy)

মনে করো তুমি একটা বাগানের মালিক। বাগানে অনেক গাছপালা আছে। হঠাৎ দেখলে কিছু গাছের শেকড় মাটিতে নেই, সেগুলো মরে গেছে। তুমি চাও শুধু **জীবন্ত গাছগুলো** রেখে বাকিগুলো উপড়ে ফেলতে।

এখন কাজটা করবে কীভাবে?

1. **Roots চিহ্নিত করো** — যেসব গাছের শেকড় মাটির সাথে লেগে আছে, সেগুলো বেস।  
2. **একটা মার্কার দিয়ে** প্রতিটা শেকড় থেকে শুরু করে সেই গাছের ডালপালা, লতাপাতা (অর্থাৎ সেটার সাথে যুক্ত সব কিছু) "Mark" করো।  
3. **Sweep করো** — যেসব জিনিসে মার্ক লাগেনি, সেগুলো তো শেকড়হীন, মরে গেছে। তাই সেগুলোকে টেনে তুলে ফেলে দাও। বাগান পরিষ্কার!

ঠিক একই কাজ করে JavaScript-এর Garbage Collector (GC)।

---

### 🧠 প্রোগ্রামিং ভাষায় Step-by-Step

- **Roots** মানে হলো সেই সব references যা প্রোগ্রাম এখনও ব্যবহার করতে পারে:
  - Global object (window)
  - Call Stack-এ থাকা local variables এবং function arguments
  - Closure-এ আটকে থাকা বাইরের variable

- GC প্রথমে এই roots থেকে শুরু করে **reachability graph** (কোনটা কার সাথে connect) বানায়।  
- যত object এই roots থেকে "পাওয়া যাবে" (reachable), সেগুলোকে `marked` ধরে।  
- বাকি যত object unmarked, সেগুলোকে "কেউ দেখছে না" — মেমোরি ফ্রি করে দেয়।

*/

let person = { name: 'Rahim' }; // 'person' variable global scope-এ root
let friend = person; // friend একই object point করে
person = null; // person root থেকে সরছে, কিন্তু object টা এখনো friend দিয়ে reachable

/*
**এখন GC আসবে:**  
- Roots: global scope-এর `friend` (আর `person` null হয়ে গেছে, সেটা আর root না)  
- `friend` → Object { name:"Rahim" } reachable → মার্কড।  
- তাহলে object টা sweep হবে না। কারণ এখনো reachable।
*/
let car = { brand: 'Toyota' };
car = null;

/*
- Root: global scope-এ `car` null হয়ে গেছে। Object-টার কাছে এখন আর কোনো রাস্তা নেই (unreachable)।  
- GC-এর পরের চক্রে object টা mark পাবে না, sweep হয়ে মেমোরি খালি হবে।

*/

/* 🧩 Circular Reference আর Mark-and-Sweep-এর জাদু

Reference counting (পুরনো পদ্ধতি) মারাত্মক একটা সমস্যা ছিল: **circular reference**। দুইটা object একে অপরকে reference করে রাখলেও যদি বাইরের কেউ তাদের use না করে, তবুও count শূন্য হয় না → মেমোরি লিক।

কিন্তু Mark-and-Sweep এই সমস্যা একদম ফ্রি করে দেয়, কারণ সে **reachability দেখে, reference count না**।
*/

function createCircle() {
  let a = {};
  let b = {};
  a.friend = b;
  b.friend = a;
  // function শেষ, a আর b নামের local variable আর স্ট্যাক নেই
  // কিন্তু দুইটা object এখনও loop করে reference ধরে।
}
createCircle();

/*
**এখন:**
- function কল শেষ, call stack থেকে `a`, `b` নামের local root চলে গেছে।
- এখন global root বা অন্য কোনো root থেকে কি ওই object-গুলো খুঁজে পাওয়া যাবে? না।
- সুতরাং GC তাদের mark করবে না → sweep হয়ে যাবে। মেমোরি clean!

যদি reference counting থাকত, তাহলে count কখনো 0 হতো না, তাই মেমোরিতে থেকে যেত = leak.


### ✅ মনে রাখার পয়েন্ট

- **Mark Phase:** Roots থেকে start করে সব reachable object-এ "mark" করা।
- **Sweep Phase:** Unmarked objects মেমোরি থেকে সরিয়ে ফেলা।
- এটা **automatic**, developer-কে explicitly free করতে হয় না (C/C++ এর মতো না)।
- তবে developer **unreachable but unintentionally retained** করার ভুল করলে (যেমন global variable, timer, closure misuse) সেগুলো mark হয়ে যায়, sweep হয় না — এইটাই memory leak।
*/

// 4.2 Reference Counting (পুরানো, কদাচিৎ)
/*
প্রত্যেক object-এর একটা count থাকে কতগুলো reference তাকে point করছে।
Reference count 0 হলে object garbage collect হয়।
কিন্তু circular reference-এ সমস্যা: দুইটা object একে অপরকে reference করলে count কখনো 0 হয় না → memory leak।
Mark-and-sweep এই সমস্যার সমাধান করে কারণ reachability check করে, count না।
*/
function circularRef() {
  let obj1 = {};
  let obj2 = {};
  obj1.ref = obj2; // obj2 reference count +1
  obj2.ref = obj1; // obj1 reference count +1
  // function শেষে obj1, obj2 local variables destroy, কিন্তু তারা পরস্পরকে reference করছে।
  // Reference counting-এ leak, কিন্তু modern GC mark-and-sweep-এ তাদের sweep করবে কারণ তারা roots থেকে unreachable.
}

//* 5. Memory Leak Patterns (কি থেকে সাবধান থাকবা)
// GC থাকলেও ডেভেলপারের ভুলে memory leak হয়।

// 5.1 Accidental Global Variables
function leak1() {
  accidental = 'I am global'; // no var/let/const, window.accidental হয়ে গেল, application শেষ না হওয়া পর্যন্ত থাকবে
}
// solution: use "use strict"; or let/const

// 5.2 Forgotten Timers / Callbacks

/* let bigData = { huge: new Array(1000000).fill('*') };
let intervalId = setInterval(() => {
  console.log(bigData.huge.length); // bigData reference hold করে রেখেছে
}, 1000); */

// clearInterval(intervalId) না করলে bigData কখনো GC হবে না। timer live থাকলে তার callback-এর closure-এ সব variable reachable থাকে।

// 5.3 Detached DOM Elements (JavaScript reference-এ রেখে দিলে)
let button = document.getElementById('myButton');
// ধরো button DOM থেকে remove করা হলো

//document.body.removeChild(button);

// কিন্তু button variable এখনো reference ধরে রেখেছে, তাই button object এবং তার সাথে থাকা DOM element heap-এ রয়ে যাবে, GC হবে না।
button = null; // solution: reference null

// 5.5
/*
  parent element-এ click listener যুক্ত করি, যা child element-কে DOM থেকে সরিয়ে দেয়।
  কিন্তু listener function তার closure-এ child variable-কে reference ধরে রেখেছে।
  তাই child element DOM থেকে remove হবার পরও, যতক্ষণ parent-এ listener active,
  ততক্ষণ child element garbage collector remove করতে পারে না।
  কারণ parent live এবং listener-এর closure-এ child এখনো reachable!
*/

let parent = document.getElementById('parent');
let child = document.getElementById('child');

/*parent.addEventListener('click', function handler() {
  child.remove(); // child DOM থেকে gone, কিন্তু child variable এখনো closure-এ
  // child = null; // immediate solution if you don't need listener again
});*/

/*
  এখন child DOM-এ নেই, কিন্তু মেমোরিতে (heap) এখনো জায়গা দখল করে আছে।
  কারণ parent-এর event listener এখনো চালু এবং তার closure child-কে reference করে রেখেছে।
  Screenshot নিলে heap-এ child element দেখাবে।

  Solution 1: একবার কাজ শেষে listener সরিয়ে ফেলা।
    parent.removeEventListener('click', handler); // একই named function ব্যবহার
  Solution 2: child remove করার সাথে সাথে child variable-কে null করে দেওয়া (যদি listener পুনরায় ব্যবহার হবে না)।*/

let parentEl = document.getElementById('parent');
let childEl = document.getElementById('child');
function clickHandler() {
  childEl.remove();
  parentEl.removeEventListener('click', clickHandler); // listener clean
  childEl = null; // reference nullify
}
//parentEl.addEventListener('click', clickHandler);

// 5.5 Closure Misuse (অপ্রয়োজনে বড় ডাটা retain)
function createHeavyFunction() {
  let largeData = new Array(10000000).fill('data'); // বিশাল array
  return function () {
    console.log('I am small but I keep largeData alive');
    // large Data reference না করলেও closure পুরো outer environment pack করে রাখে? (V8 optimizes unused vars, but best practice is to avoid this)
  };
}
let heavy = createHeavyFunction();
// heavy = null; // করলে largeData-ও sweep হবে

// 5.5 Unremoved Event Listeners (SPA তে বড় issue)
// যদি element remove করি কিন্তু event listener remove না করি, listener-এর closure parent scope ধরে রাখে।

//* 6. WeakMap & WeakSet (GC-Friendly Data Structures)
/*
Map/Set-এ key হিসেবে object দিলে strong reference থাকে। GC ওই object সরাতে পারে না যতক্ষণ Map/Set exist করছে।
WeakMap/WeakSet-এ key হিসেবে object দিলে weak reference থাকে। 
GC object কে sweep করতে পারে যদি আর কোনো strong reference না থাকে।
Use case: caching, private data, DOM element metadata.
*/
let visitedMap = new WeakMap();
function track(obj) {
  if (!visitedMap.has(obj)) {
    visitedMap.set(obj, Date.now());
  }
}
let element = { id: 1 };
track(element);
// element = null; করলে visitedMap-এ থাকা entry-ও GC-র মাধ্যমে auto remove হবে, because weak reference.

// WeakSet শুধু object store করে, weak reference-এ। আমরা check করতে পারি কোনো object present কিনা।

//* 7. Performance & Memory Profiling in DevTools
/*
Browser DevTools > Memory tab:
- Heap snapshot: current memory state capture, দুই snapshot-এর comparison দিয়ে leak ধরা।
- Allocation instrumentation on timeline: time-এর সাথে memory usage দেখতে, leak pattern identify।
- Allocation sampling: function-level memory allocation recording।
Chrome-এ "Performance" tab-এ "Memory" checkbox enable করলে time-এর সাথে heap graph দেখতে পারি।
Practice: একটা loop-এ DOM element create করে remove না করলে memory বেড়ে যাওয়া observe করা।
*/

//* 8. Best Practices for Memory Management
/*
- let/const use করো accidental global avoid করতে।
- Timer, interval, event listener clean up করো (componentWillUnmount, useEffect return).
- Closures-এ অপ্রয়োজনীয় বড় variable reference avoid করো, বা null সেট করো।
- DOM references null সেট করো removeChild-এর পর।
- WeakMap/WeakSet use করো temporary metadata-র জন্য।
- Large data set নিয়ে কাজ করলে pagination/virtual scrolling/stream ব্যবহার করো।
- Circular reference intentionally না রাখাই ভালো, যদিও modern GC সামলাতে পারে।
- Performance test করার সময় DevTools-এর memory profiler দিয়ে leak চেক করো।
*/

//! Summary (মুখস্থ করার মতো পয়েন্ট)
/*
✅ Stack: primitive + reference, Heap: objects.
✅ GC: Mark-and-Sweep (reachability check).
✅ Unreachable objects automatically swept.
✅ Memory leak-এর কারণ: global var, forgotten timer, detached DOM, closure overuse, uncleaned listeners.
✅ WeakMap/WeakSet weak reference দিয়ে GC-কে সহযোগিতা করে।
✅ DevTools memory profiler দিয়ে diagnosis করো।
✅ Clean up after yourself – JS GC-র উপর অন্ধ বিশ্বাস না রেখে deterministic cleanup practice করো।
*/
