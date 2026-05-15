//! Write function After Call
function fn1() {
  console.log('Hello');
}
fn1(); //* Call
fn1();

function fn2() {
  return 'Hello';
}
console.log(fn2());

//! Use Parameter
function fn3(name) {
  console.log(`My name is ${name}`);
}
//*Call With Parameter
fn3('UNKNOWN');

function fn4(name) {
  return `My name is ${name}`;
}
//*Call With Parameter
console.log(fn4('UNKNOWN'));

//* Multiple Parameter Use
function fn5(name, age, familyMember) {
  return `My name is ${name} and My age is ${age} Years Old . My Family ${familyMember} `;
}
console.log(fn5('Ali', 32, 8));
console.log(fn5('NIROB', 17, 'Only' + ' ' + 3 + ' ' + 'Member'));

//* Default Parameters

function calc(a = 0, b = 0) {
  return 2 * (a + b);
}

const resVar = calc();
console.log(resVar);

//* Rest Parameter
function calculateThis(x, y, ...rest) {
  console.log(x, y, rest);
}

calculateThis(1, 2, 3, 4, 5, 6, 7, 8, 9);

//! Use Function
let select = document.querySelector('button');
function isSubscribe() {
  select.innerText = 'SUBSCRIBED';
  select.style.background = 'red';
}
select.addEventListener('click', isSubscribe);

//! Auto Call
(function () {
  console.log('I am Self Call Function');
})();

//* Auto call use Parameter
(function (name) {
  console.log(`I am auto call function ${name}`);
})('parameter');

//! Function Stotre In Varriable
let storeFunction = function (x, y) {
  console.log(x * y);
};
storeFunction(5, 6);
storeFunction(2, 50);

let storeFunction1 = function (x, y) {
  console.log('Working');
  return x * y;
  console.log('Not_Working'); //Return এর পরে কনকিছু কাজ করবে না
};
console.log(storeFunction1(10, 5));

//! Arrow Function
let shortFunction = (x, y) => x + y;
console.log(shortFunction(5, 6));

//! Nasted Function
function names(name, x, y) {
  console.log(`It is String number in ${x * y}`);
  function say(age) {
    console.log(`My name is ${name} My age ${age} number ${x + y}`);
  }
  return say(20);
}
names('NIROB', 5, 6);

//! Recursion Function
function countDown(n) {
  // Base case
  if (n === 0) {
    return;
  }
  console.log(n);
  // Recursive call
  countDown(n - 1);
}
countDown(5);

//! Call Back function

toCall = true;

function fnx(parameter) {
  console.log('Call fn1');

  if (toCall) {
    parameter();
  }
}
fnx(function () {
  console.log('Call fn2');
});

//!Higher Order function
function newFunc() {
  return function () {
    console.log('Higher order function is run');
  };
}
const refunc = newFunc();
refunc();

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
