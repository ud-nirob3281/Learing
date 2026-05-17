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
