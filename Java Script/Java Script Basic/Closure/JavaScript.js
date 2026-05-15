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
