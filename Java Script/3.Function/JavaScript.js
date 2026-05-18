//! JavaScript Functions 
/*
Function is a reusable block of code.
Steps:
  1. Define/Declare
  2. Call/Invoke
  3. May receive parameters & return a value
Function is a callable object (Reference Type).
*/

//* 1. Basic Function Declaration & Call
function fn1() {
  console.log('Hello');
}
fn1(); // Call: output "Hello"
fn1(); // পুনরায় call

//* 2. Return Value
function fn2() {
  return 'Hello';
}
console.log(fn2()); // "Hello"

// Return-এর পরের code execute হয় না
function testReturn() {
  return 'done';
  console.log('Never runs');
}

//* 3. Parameters & Arguments
function fn3(name) {
  console.log(`My name is ${name}`);
}
fn3('UNKNOWN'); // argument pass

function fn4(name) {
  return `My name is ${name}`;
}
console.log(fn4('UNKNOWN'));

// Multiple Parameters
function fn5(name, age, familyMember) {
  return `My name is ${name} and My age is ${age} Years Old. My Family ${familyMember}`;
}
console.log(fn5('Ali', 32, 8));
console.log(fn5('NIROB', 17, 'Only ' + 3 + ' Member'));

//* 4. Default Parameters
// যদি argument না দেওয়া হয় তবে default value ব্যবহার হবে
function calc(a = 0, b = 0) {
  return 2 * (a + b);
}
console.log(calc());     // 0  (a=0,b=0)
console.log(calc(2, 3)); // 10

//* 5. Rest Parameter (...rest)
// অসংখ্য argument-কে array হিসেবে পেতে
function calculateThis(x, y, ...rest) {
  console.log(x, y, rest); // rest array of remaining arguments
}
calculateThis(1, 2, 3, 4, 5, 6, 7, 8, 9);
// Output: 1 2 [3,4,5,6,7,8,9]

//* 6. Function Expression (Anonymous Function in Variable)
// Function-কে variable-এ store করা যায়। Hoisting এ শুধু variable-ই hoist হয় (var=undefined, let/const=TDZ)
const storeFunction = function (x, y) {
  console.log(x * y);
};
storeFunction(5, 6);  // 30

const storeFunction1 = function (x, y) {
  return x * y;
};
console.log(storeFunction1(10, 5)); // 50

//* 7. Arrow Functions (=>)
// Short syntax, lexical `this` (নিজস্ব `this` নেই), constructor হিসেবে ব্যবহার করা যায় না।
// Single expression-এ implicit return
let shortFunction = (x, y) => x + y;
console.log(shortFunction(5, 6)); // 11

// Multi-statement body { } দিতে হবে, return স্পষ্ট করতে হবে
let multiArrow = (x, y) => {
  let result = x * y;
  return result;
};

//* 8. IIFE (Immediately Invoked Function Expression)
// Declare & execute একসাথে, private scope তৈরি করতে ব্যবহার হয়।
(function () {
  console.log('I am Self Call Function');
})();

// Parameter সহ
(function (name) {
  console.log(`I am auto call function ${name}`);
})('parameter');

//* 9. Nested Functions & Closure
// ভেতরের function বাইরের function-এর variable access করতে পারে (closure)।
function names(name, x, y) {
  console.log(`It is String number in ${x * y}`);
  function say(age) {
    console.log(`My name is ${name} My age ${age} number ${x + y}`);
  }
  return say(20);
}
names('NIROB', 5, 6);
// Output: "It is String number in 30"
//         "My name is NIROB My age 20 number 11"

//* 10. Callback Function
// একটা function-কে আরেকটা function-এ argument হিসেবে pass করা হয়।
let toCall = true;
function fnx(parameter) {
  console.log('Call fn1');
  if (toCall) {
    parameter(); // callback invoke
  }
}
fnx(function () {
  console.log('Call fn2');
});

// Real-life callback (Event Listener)
const select = document.querySelector('button');
function isSubscribe() {
  select.innerText = 'SUBSCRIBED';
  select.style.background = 'red';
}
select.addEventListener('click', isSubscribe);
// এখানে isSubscribe হলো callback, click-এ call হবে।

//* 11. Higher-Order Function (HOF)
// যে function অন্য function return করে বা parameter হিসেবে পায়।
function newFunc() {
  return function () {
    console.log('Higher order function is run');
  };
}
const refunc = newFunc();
refunc(); // "Higher order function is run"

//* 12. Recursion (Self-calling function)
function countDown(n) {
  if (n === 0) return;     // Base case
  console.log(n);
  countDown(n - 1);        // Recursive call
}
countDown(5); // 5 4 3 2 1

//* 13. Important Notes
/*
- Function Declaration: Hoisted (আগে call করা যায়)।
- Function Expression / Arrow Function: Variable hoisting rules মেনে চলে।
- Arrow function: constructor নয়, `arguments` object নেই, lexical `this`।
- Parameters vs Arguments: parameter হলো variable (definition এ), argument হলো value (call এ)।
- Default parameter: argument undefined holei default নেয়; null দিলে null-ই থাকে।
- Rest parameter সবসময় শেষে দিতে হয়, ...rest array return করে।
- Return: function execution শেষ করে এবং value return করে।
- Callback: Asynchronous ও synchronous দুই ক্ষেত্রেই ব্যবহার হয়।
*/;
//! Interview questions 
/*
=============================================
Topic: Functions in JavaScript (Basic to Advanced)
============================================

=============================================
📌 QUESTION 1
=============================================
Question (English):
"What is a function in JavaScript? Why do we use functions?"

প্রশ্নের অর্থ (Bangla):
JavaScript-এ function কী? আমরা function কেন ব্যবহার করি?

🔰 Explanation (Bangla+English mix):
Function হলো একটা reusable code block যা একটা নির্দিষ্ট কাজ করার জন্য তৈরি করা হয়।
আমরা function ব্যবহার করি:
  - Code reuse (একই code বারবার না লিখে)
  - Modularity (বড় problem-কে ছোট ছোট ভাগে ভাগ করা)
  - Readability & maintainability
  - Abstraction (complexity hide করা)
JavaScript-এ function first-class citizen, অর্থাৎ variable-এ রাখা যায়, argument হিসেবে pass করা যায়, return করা যায়।

🎤 Answer in English (speak this):
"A function in JavaScript is a reusable block.
We use functions to avoid code repetition, improve readability, and make our code modular and maintainable.
Functions allow us to encapsulate logic, accept parameters, and return values.
In JavaScript, functions are first-class objects — they can be assigned to variables, passed as arguments to other functions,
and returned from functions. 
This makes JavaScript suitable for functional programming."

=============================================
📌 QUESTION 2
=============================================
Question (English):
"What are the different ways to define a function in JavaScript?
Explain the differences between a function declaration, function expression, and arrow function."

প্রশ্নের অর্থ (Bangla):
JavaScript-এ function define করার বিভিন্ন উপায় কী কী?
Function declaration, function expression, arrow function এর মধ্যে পার্থক্য কী?
(Explanation already given earlier — I'll keep it but add more clarity)

🔰 Explanation (Bangla+English mix):
তিনটি way:
1. Function Declaration:
   - function greet() {}
   - পুরো function hoisted হয়, তাই ডিক্লেয়ার করার আগেও call করা যায়।
2. Function Expression:
   - const greet = function() {};
   - শুধু variable hoisted (let/const এর ক্ষেত্রে TDZ), function body assign হয় execution phase-এ। আগে call করলে TypeError।
3. Arrow Function:
   - const greet = () => {};
   - Hoisting behaviour expression-এর মতোই — আগে call করা যাবে না।
   - নিজস্ব this নেই, lexical this নেয়।
   - Constructor হিসেবে ব্যবহার করা যায় না, prototype নেই।
   - arguments object নেই (rest parameter use করতে হবে)।

🎤 Answer in English:
"There are three primary ways: function declarations, function expressions, and arrow functions.
Function declarations use the 'function' keyword and are fully hoisted, so you can call them anywhere before definition.
Function expressions assign a function to a variable; only the variable declaration is hoisted,
 so you can't call them anywhere we try to calling before the line results in TypeError.
Arrow functions have a shorter syntax, share the hoisting behavior of function expressions,
but most importantly they do not have their own 'this' — they inherit 'this' from the surrounding lexical scope.
They also cannot be used as constructors and lack the 'arguments' object."

=============================================
📌 QUESTION 3
=============================================
Question (English):
"What is hoisting in JavaScript? How does hoisting affect functions?"

প্রশ্নের অর্থ (Bangla):
Hoisting কী? Function-এর ক্ষেত্রে hoisting কিভাবে কাজ করে?

🔰 Explanation (Bangla+English mix):
Hoisting হলো JavaScript engine-এর একটা default behavior যেখানে declarations (variable এবং function) memory-তে আগে চলে যায় compilation phase-এ।
Function declaration: পুরো function body hoisted হয়, তাই আগে call করলেও কাজ করে।
Function expression/Arrow: কেবল variable declaration hoisted (var হলে undefined, let/const হলে TDZ-এ), function body hoisted হয় না। তাই আগে call করলে error (TypeError বা ReferenceError)।
🎤 Answer in English:
Hoisting is JavaScript engine default behavior of moving declarations to the top of their scope during the compilation phase.  their declaration varriable, function go to memory first in creation phase.That function declaration function full body is go to memory mean function full body is hoisted so we call function anywhere but variable 
declaration time variable name go to memory not variable value so function expression or Arrow function variable hoisted not function full body hoisted so we can't call function before variable declaration line.


=============================================
📌 QUESTION 4
=============================================
Question (English):
"What is the difference between parameters and arguments?"

প্রশ্নের অর্থ (Bangla):
Parameter আর argument এর মধ্যে পার্থক্য কী?

🔰 Explanation (Bangla+English mix):
Parameter: function definition-এ যে variable নাম লেখা হয় (placeholder).
function add(a, b) — এখানে a, b হলো parameters.
Argument: function call করার সময় যে actual value পাঠানো হয়।
add(5, 10) — এখানে 5, 10 হলো arguments.

🎤 Answer in English:
"Parameters are the named variables listed in the function's definition, acting as placeholders.
Arguments are the actual values passed into the function when it is invoked.
For example, in function sum(x, y) { return x + y; }, x and y are parameters. When we call sum(3, 4), 3 and 4 are the arguments."

=============================================
📌 QUESTION 5
=============================================
Question (English):
"What are default parameters in JavaScript? How do they work?"

প্রশ্নের অর্থ (Bangla):
Default parameter কী? কিভাবে কাজ করে?

🔰 Explanation (Bangla+English mix):
ES6 থেকে আমরা function parameter-এ default value set করতে পারি। যদি argument না পাঠানো হয় বা undefined পাঠানো হয়, তখন default value টি ব্যবহার হবে।
Syntax: function greet(name = "Guest") { ... }
greet(); // "Guest"
greet("Sakib"); // "Sakib"
এটা function expression ও arrow function-এই কাজ করে।
পেছনের parameters পরবর্তী parameters-এ ব্যবহার করা যেতে পারে (e.g., function sum(a, b = a * 2))

🎤 Answer in English:
"Default parameters allow us to initialize function parameters with default values if no argument or undefined is passed.
Introduced in ES6, they make our code more robust and reduce the need for manual checks.
For example, function multiply(a, b = 1) returns a * b. If b is omitted, it defaults to 1.
We can also use previous parameters as defaults, like function createArray(length, value = length)."

=============================================
📌 QUESTION 6
=============================================
Question (English):
"What is the 'arguments' object in JavaScript? How is it different from rest parameters?"

প্রশ্নের অর্থ (Bangla):
Arguments object কী? Rest parameter থেকে এটা কিভাবে আলাদা?

🔰 Explanation (Bangla+English mix):
arguments হলো regular function (arrow function নয়) এর ভেতরে automatic একটি array-like object যেখানে সব passed arguments থাকে।
এটা array-like কিন্তু আসল array না, তাই map, forEach ইত্যাদি ব্যবহার করতে প্রথমে array-তে convert করতে হয়।
Arrow function-এ arguments object নেই।
Rest parameter (...args) ES6-এ এসেছে, এটা actual array, এবং arrow function-এই কাজ করে। এটি named parameter, arguments এর মতো implicit না।

🎤 Answer in English:
"The 'arguments' object is an array-like object available inside regular functions (not arrow functions) that contains all the arguments passed to the function.
However, it's not a real array, so array methods can't be used directly.
Rest parameters, introduced in ES6, collect remaining arguments into a genuine array, and they work in both regular and arrow functions.
Rest parameters are named explicitly, making code more readable, whereas 'arguments' is implicitly available."

=============================================
📌 QUESTION 7
=============================================
Question (English):
"What is an IIFE and why would you use it?"

প্রশ্নের অর্থ (Bangla):
IIFE কী এবং কেন ব্যবহার করা হয়?

🔰 Explanation (Bangla+English mix):
IIFE = Immediately Invoked Function Expression.
একটা function define করার সাথে সাথেই invoke করা হয়।
Syntax: (function() { ... })();
Use cases:
  - গ্লোবাল scope pollution avoid করতে (variable গুলো locally থাকে)
  - Private scope তৈরি করতে
  - Async/await পুরনো style-এ use করতে (though now modules do this)
  - Module pattern implement করতে
Arrow function দিয়েও করা যায়: (() => { ... })();

🎤 Answer in English:
"IIFE stands for Immediately Invoked Function Expression — a function that is defined and executed immediately.
It's used to create a private scope, preventing variables from leaking into the global scope.
Before ES6 modules, IIFE was a common pattern for modularity and data privacy.
The syntax typically involves wrapping a function in parentheses and then invoking it, like (function() { /* code */ })();.
Arrow functions also work: (() => { ... })();"

=============================================
📌 QUESTION 8
=============================================
Question (English):
"What is a callback function? What is a higher-order function?"

প্রশ্নের অর্থ (Bangla):
Callback function কী? Higher-order function কী?

🔰 Explanation (Bangla+English mix):
Callback function: একটা function যে অন্য function-এর argument হিসেবে pass করা হয় এবং পরবর্তীতে call করা হয়। JavaScript asynchronous operation-এ callback very common (e.g., setTimeout, event listener, array methods).
Higher-order function: একটা function যে অন্য function-কে parameter হিসেবে নেয় অথবা return করে function। Array.map, filter, reduce সব higher-order function।
Callback function আসলে higher-order function-এর হাত ধরে কাজ করে।

🎤 Answer in English:
"A callback function is a function passed as an argument to another function, which is then invoked inside the outer function to complete some action or routine.
A higher-order function is a function that takes one or more functions as arguments, or returns a function.
For example, Array.prototype.map is a higher-order function that takes a callback to transform each element.
Callbacks are fundamental for handling asynchronous operations like API calls and event handling."

=============================================
📌 QUESTION 9 (Slightly Advanced)
=============================================
Question (English):
"What is a closure in JavaScript? How is it created and where is it useful?"

প্রশ্নের অর্থ (Bangla):
Closure কী? এটা কিভাবে তৈরি হয় এবং কোথায় কাজে লাগে?
(এটা function topic-এর একটু advanced অংশ)

🔰 Explanation (Bangla+English mix):
Closure তখন তৈরি হয় যখন একটা inner function তার outer function-এর variables access করতে পারে, এমনকি outer function return করার পরেও।
Example:
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer(); // outer execute, count variable return-এর পরও alive থাকে inner-এর জন্য।
counter(); // 1
counter(); // 2
Use cases: data privacy (private variables), module pattern, currying, event handlers, loops-এ async-এ সঠিক value ধরে রাখতে।

🎤 Answer in English:
"A closure is a combination of a function bundled with references to its surrounding state (the lexical environment).
In JavaScript, closures are created every time a function is created, at function creation time.
When an inner function accesses variables from its outer function, and the outer function has finished executing,
the inner function still retains access to those variables via closure.
Closures are powerful for data encapsulation, creating private variables, functional programming patterns like currying, 
  and solving problems with asynchronous code inside loops."

=============================================
📌 QUESTION 10
=============================================
Question (English):
"What is the 'this' keyword in JavaScript functions? How does it behave differently in regular functions vs arrow functions?"

প্রশ্নের অর্থ (Bangla):
Regular function আর arrow function-এ 'this' keyword-এর behavior কীভাবে আলাদা?

🔰 Explanation (Bangla+English mix):
Regular function-এ this dynamic, call site-এর উপর নির্ভর করে। কে call করছে তার উপর ভিত্তি করে this নির্ধারিত হয়।
  - Global scope-এ call করলে this হবে global object (strict mode-এ undefined)
  - Object method হিসেবে call করলে this সেই object
  - new keyword দিয়ে constructor কল দিলে this new instance
  - call/apply/bind দিয়ে explicit set করা যায়।
Arrow function-এ this lexical — অর্থাৎ যে scope-এ arrow function define করা হয়েছে সেই scope-এর this ধরে নেয়, change করা যায় না। তাই arrow function method বা constructor হিসেবে উপযুক্ত নয়।

🎤 Answer in English:
"In a regular function, the value of 'this' is determined by how the function is called — dynamically. If called as a method of an object,
'this' refers to that object; if called standalone, 'this' defaults to the global object (undefined in strict mode).
Arrow functions, on the other hand, do not have their own 'this';
they lexically capture 'this' from the enclosing context at the time they are defined. This makes them great for callbacks where we want to preserve the surrounding 'this', 
but they cannot be used as constructors or as methods that rely on dynamic context."

=============================================
📌 QUESTION 11
=============================================
Question (English):
"Explain call, apply, and bind methods. When would you use them?"

প্রশ্নের অর্থ (Bangla):
call, apply, bind methods কী? কখন এগুলো ব্যবহার করবেন?

🔰 Explanation (Bangla+English mix):
এই তিনটি method ব্যবহার করে function-এর this manually set করা যায়।
- call(thisArg, arg1, arg2, ...): function অবিলম্বে invoke হয়, arguments comma দিয়ে pass করে।
- apply(thisArg, [arg1, arg2]): function invoke হয়, arguments array আকারে pass করতে হয়।
- bind(thisArg, arg1, arg2...): নতুন function return করে যেখানে this permanently bind করা থাকে, পরে call করা যায়। Partial application-এও কাজে লাগে।
Use: ধার নেওয়া methods, explicit context set করা, callback-এ this ধরে রাখা।

🎤 Answer in English:
"Call, apply, and bind are methods on Function.prototype that allow us to explicitly set the 'this' value for a function.
Call invokes the function immediately with a given 'this' and arguments passed individually.
Apply does the same but takes arguments as an array.
Bind returns a new function with 'this' permanently bound, which can be called later.
Common use cases include borrowing methods from another object, setting context in event handlers, and function partial application."

=============================================
📌 QUESTION 12
=============================================
Question (English):
"What is a constructor function and how does the 'new' keyword work?"

প্রশ্নের অর্থ (Bangla):
Constructor function কী এবং new keyword কিভাবে কাজ করে?

🔰 Explanation (Bangla+English mix):
Constructor function হলো regular function যা new keyword-সহ call করলে নতুন object তৈরি করে।
new যা করে:
  1. নতুন empty object তৈরি করে
  2. সেই object-এর prototype হিসেবে constructor function-এর prototype set করে
  3. নতুন object-কে this হিসেবে bind করে function execute করে
  4. যদি function কিছু return না করে, তাহলে নতুন object টি return করে।
Constructor function-এর নাম Capital letter দিয়ে শুরু করা convention.
Arrow function constructor হিসেবে ব্যবহার করা যায় না কারণ এর নিজস্ব this আর prototype নেই।

🎤 Answer in English:
"A constructor function is a regular JavaScript function intended to be called with the 'new' keyword to create objects.
When we use 'new', four things happen: a new empty object is created, the prototype of that object is set to the constructor's prototype,
the constructor function is executed with 'this' pointing to the new object, and unless the function returns its own object, the new object is returned.
Constructor functions conventionally start with a capital letter. Arrow functions cannot be used as constructors because they lack their own 'this'
and a prototype property."

=============================================
📌 QUESTION 13
=============================================
Question (English):
"What is recursion in functions? Can you give an example?"

প্রশ্নের অর্থ (Bangla):
Recursion কী? একটা উদাহরণ দিন।

🔰 Explanation (Bangla+English mix):
Recursion তখন হয় যখন একটা function নিজেকে call করে। যেকোনো recursive function-এর base case থাকা জরুরি, না হলে infinite loop হয়ে stack overflow হবে।
Example: factorial calculation.
function factorial(n) {
  if (n <= 1) return 1; // base case
  return n * factorial(n - 1);
}
Use: tree traversal, data structure, mathematical problem, divide-and-conquer।

🎤 Answer in English:
"Recursion is a technique where a function calls itself to solve smaller instances of the same problem.
A recursive function must have a base case to stop the chain, otherwise it will cause a stack overflow.
For example, to calculate factorial: function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }
Recursion is widely used in algorithms like tree traversal, sorting, and when dealing with recursive data structures."

=============================================
📌 QUESTION 14
=============================================
Question (English):
"What are pure functions and side effects? Why do we value pure functions?"

প্রশ্নের অর্থ (Bangla):
Pure function আর side effect কী? Pure function কেন গুরুত্বপূর্ণ?

🔰 Explanation (Bangla+English mix):
Pure function:
  - Same input দিলে সবসময় same output দেয় (deterministic)
  - কোনো external state change করে না (no side effects)
Side effect: console log করা, DOM modify করা, network call, global variable change করা ইত্যাদি।
Pure function testable, predictable, maintainable। React-এ pure function strongly encouraged।

🎤 Answer in English:
"A pure function is a function that, given the same inputs, always returns the same output and has no side effects — meaning it doesn't modify any external state, 
mutate input arguments, or interact with the outside world like logging or network requests.
Pure functions are valued because they are predictable, easy to test, and make code easier to reason about.
Functional programming paradigms and libraries like React heavily encourage pure functions to prevent bugs and improve performance."

=============================================
📌 QUESTION 15
=============================================
Question (English):
"What is the difference between function scope and block scope in JavaScript? How do var, let, and const behave in functions?"

প্রশ্নের অর্থ (Bangla):
Function scope আর block scope-এর মধ্যে পার্থক্য কী? Function-এর ভিতরে var, let, const-এর আচরণ কী?

🔰 Explanation (Bangla+English mix):
var: function-scoped. Function-এর ভিতরে declare করলে সেই পুরো function-এ accessible। Block (if, for) এর ভিতরে declare করলেও function-এর বাইরে leak হতে পারে।
let/const: block-scoped. {} এর ভিতরে থাকলে কেবল ওই block-এই accessible। Function-এর ভিতরে থাকলেও যেকোনো block মেনে চলে।
Function example:
function test() {
  var x = 1;
  if(true) {
    var y = 2; // y function scoped, বাইরে পাওয়া যাবে
    let z = 3; // block scoped, বাইরে পাওয়া যাবে না
  }
  console.log(y); // 2 (var)
  // console.log(z); // ReferenceError (let block-scoped)
}
var function-scoped হওয়ায় closure বা loop-এ সমস্যা তৈরি করতে পারে, solve করে let।

🎤 Answer in English:
"In JavaScript, var is function-scoped, meaning it is accessible anywhere within the function it is declared in, 
regardless of blocks. let and const are block-scoped, confined to the nearest enclosing curly braces.
Inside a function, if you declare a var inside an if block, it still leaks to the rest of the function. 
let and const won't leak outside the block. This block scoping helps avoid unintended variable access and issues in loops, making let and c





//! Task
//*1
let temunCel = 36;
function celToFah(cel) {
  let fah = (cel * 9) / 5 + 32;
  console.log(fah);
}
celToFah(temunCel);

//*2
let num1 = 50;
let num2 = 10;

function largestNum(num1, num2) {
  if (num1 > num2) {
    console.log(num1);
  } else {
    console.log(num2);
  }
}
largestNum(num1, num2);

//*3
function st(string) {
  console.log(string[0]);
  console.log(string[string.length - 1]);
  if (
    string[0] === string[string.length - 1] &&
    string[1] === string[string.length - 2] &&
    string[2] === string[string.length - 3]
  ) {
    console.log('It is Palindrome');
  } else {
    console.log('It is Not Palindrome');
  }
}
st('kborobk');

//*4
//Way-1
let factorial = 1;
function fac(n) {
  let ourVal = 1;
  while (ourVal <= n) {
    factorial = ourVal * factorial;
    ourVal++;
  }
}
fac(3);
console.log(factorial);

//Way-2
let factorial1 = 1;
function fac1(n) {
  for (let i = 1; i <= n; i++) {
    factorial1 = i * factorial1;
  }
}
fac1(3);
console.log(factorial1);
//Way-3
function factorial2(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial2(n - 1);
  }
}

console.log(factorial2(3)); // 120

//*5 //! Hard
//way-1
const vowel = ['a', 'e', 'i', 'o', 'u'];
let count = 0;

function countVowel(stra) {
  let str = stra.toLowerCase();
  for (let i = 0; i <= str.length - 1; i++) {
    for (let j = 0; j <= vowel.length - 1; j++) {
      if (str[i] === vowel[j]) {
        count++;
      }
    }
  }
}
countVowel('hello wrOld earth');
console.log(count);
//way-2
let count1 = 0;
function vowelCount(stra) {
  let str = stra.toLowerCase();
  for (let i = 0; i <= str.length - 1; i++) {
    if (
      str[i] === 'a' ||
      str[i] === 'e' ||
      str[i] === 'i' ||
      str[i] === 'o' ||
      str[i] === 'u'
    ) {
      count1++;
    }
  }
}
vowelCount('hello wrOld earth');
console.log(count1);
//way-3
let count2 = 0;
function vowelCount1(str) {
  for (let i = 0; i <= str.length - 1; i++) {
    if ('aeiou'.includes(str[i].toLowerCase())) {
      count2++;
    }
  }
}
vowelCount1('hello wrld earth');
console.log(count2);

//*6
//All Word First Letter Capitalize
function capitalize(str) {
  const word = str.split(' ');
  let all = '';
  for (let i = 0; i < word.length; i++) {
    // word[i].charAt(0).toUpperCase() + word[i].slice(1);
    finalWord = word[i].charAt(0).toUpperCase() + word[i].slice(1);
    all = all + ' ' + finalWord;
  }
  console.log(all.trim());
}
capitalize('i am web developer');

//Only First Letter Capitalize
function string(str) {
  let firstletter = str.charAt(0);
  console.log(firstletter.toUpperCase() + str.slice(1));
}
string('hello world');

//*7
