
//! JavaScript Data Types 

/*
Primitive Data Types (immutable, stored directly in stack):
- **Primitive Data Types:**
    - `String` - Text values ("Hello")
    - `Number` - Numeric values (25, 3.14)
    - `Boolean` - True/False (true, false)
    - `Undefined` - A variable declared but not assigned (let x;)
    - `Null` - Represents "nothing" (let y = null;)
    - `BigInt` - Large numbers (BigInt(12345678901234567890))
    - `Symbol` - Unique identifiers (Symbol("id"))
- **Non-Primitive (Reference) Data Types:**
    - `Object` - Collection of key-value pairs
    - `Array` - Ordered list of values
    - `Function` - Code that can be executed)
*/

//* typeof operator দিয়ে টাইপ চেক করা যায়
console.log(typeof "hello");  // "string"
console.log(typeof 42);       // "number"
console.log(typeof true);     // "boolean"
console.log(typeof undefined);// "undefined"
console.log(typeof null);     // "object"  (ভাষার পুরনো bug)
console.log(typeof 10n);      // "bigint"
console.log(typeof Symbol());// "symbol"
console.log(typeof {});       // "object"
console.log(typeof []);       // "object"  (array ও object)
console.log(typeof function(){});// "function"

//=============================
//! 1. String (স্ট্রিং)
//=============================
let firstName = 'NIROB';

//* String লেখার ৩টা উপায়
let singleQuote = 'Hello';
let doubleQuote = "My name is 'Nirob'";     // ভেতরে single quote use করতে পেরেছি
let templateLiteral = `My name is ${firstName}`; // variable embed, multi-line

//* Escape characters
const multiLine = "I'am Nirob\nMy age 17 years old\nI am a Web Developer Learner";
console.log(multiLine);

//* Character access ও position
let word = 'UD NIROB';
console.log(word.charAt(1));      // "D" (0-index)
console.log(word.indexOf('N'));   // 3
console.log(word[0]);             // "U"

//* Case change
console.log(word.toLowerCase());  // "ud nirob"
console.log(word.toUpperCase());  // "UD NIROB"

//* Replace
let data4 = 'UNKNOWN DEVELOPER2023 NIROB';
console.log(data4.replace('2023', '2024')); // "UNKNOWN DEVELOPER2024 NIROB"

//* Repeat
let str = 'Hello ';
console.log(str.repeat(3)); // "Hello Hello Hello "

//* Split (স্ট্রিং থেকে অ্যারে)
let data5 = 'I am a Web Developer';
console.log(data5.split(' '));  // ['I','am','a','Web','Developer']  (word by word)
console.log(data5.split(''));   // ['I',' ','a','m',' ',...] (letter by letter)

//* Trim (দুইপাশের স্পেস বাদ)
let data6 = '   Hello World   ';
console.log(data6.trim()); // "Hello World"

//* substring(start, end) → end index included না
let str1 = 'ABCDEFGHIJ'; // index: 0=A,1=B,...,9=J
console.log(str1.substring(2, 5)); // "CDE"

//* slice(start, end) → negative index support
console.log(str1.slice(2, 5));     // "CDE"
console.log(str1.slice(-3));      // "HIJ" (last 3)

//* includes, startsWith, endsWith
console.log(str1.includes('DEF'));    // true
console.log(str1.startsWith('ABC')); // true
console.log(str1.endsWith('HIJ'));   // true

//=============================
//! 2. Number (সংখ্যা)
//=============================
let age = 17;
console.log(typeof age); // "number"

//* দশমিকের পর নির্দিষ্ট ঘর
let num = 44.445454445;
console.log(num.toFixed(2)); // "44.45"  (স্ট্রিং রিটার্ন)

//* Number → String
console.log(num.toString()); // "44.445454445"

//* String → Number
console.log(Number('56.78'));    // 56.78
console.log(parseInt('56.78'));  // 56
console.log(parseFloat('56.78'));// 56.78
console.log(+'56.78');           // 56.78 (unary plus)

//* NaN ও Finite চেক
console.log(isNaN('abc'));       // true  (Not a Number?)
console.log(isFinite(123));      // true
console.log(isFinite('abc'));    // false
console.log(isFinite(undefined));// false

//* বিভিন্ন base-এ রূপান্তর (toString(base))
let num2 = 248;
console.log(num2.toString(2));  // "11111000" (binary)
console.log(num2.toString(8));  // "370"      (octal)
console.log(num2.toString(16)); // "f8"       (hexadecimal)

//* toPrecision (total significant digits)
let num3 = 56;
console.log(num3.toPrecision(1)); // "6e+1"  (1 digit + exponent)
console.log(num3.toPrecision(2)); // "56"
console.log(num3.toPrecision(4)); // "56.00"

//=============================
//! 3. BigInt (বড় ইন্টিজার)
//=============================
let bigNumber = 9999999999999999n;            // n suffix
let bigNumber2 = BigInt(9999999999999999);    // constructor (সংখ্যা বড় হলে string pass করা ভালো)
console.log(bigNumber * bigNumber2);          // 99999999999999980000000000000001n
console.log(typeof bigNumber);                // "bigint"
// BigInt আর Number mixed করা যায় না (TypeError)

//=============================
//! 4. Boolean (বুলিয়ান)
//=============================
let isAdult = true;
let isChild = false;
console.log(typeof isAdult); // "boolean"
// Truthy / Falsy values: false, 0, "", null, undefined, NaN → false; বাকি সব true.

//=============================
//! 5. Undefined (অসংজ্ঞায়িত)
//=============================
let someInfo;
console.log(someInfo);      // undefined
console.log(typeof someInfo); // "undefined"

//=============================
//! 6. Null (খালি)
//=============================
let emptyValue = null;
console.log(emptyValue);        // null
console.log(typeof emptyValue); // "object" (ভাষার ত্রুটি, আসলে null একটা primitive)
// Null intentionally empty; Undefined মানে এখনো কিছু দেওয়া হয়নি।

//=============================
//! 7. Symbol (সিম্বল)
//=============================
let sym1 = Symbol('id');
let sym2 = Symbol('id');
console.log(sym1 === sym2);       // false (প্রতিটি Symbol ইউনিক)
console.log(typeof sym1);         // "symbol"
// ব্যবহার: object property key হিসাবে যাতে collision না হয়।

//=============================
// Non-Primitive (Reference) Types
//=============================

//! Array (তালিকা)
let fruits = ['Apple', 'Orange', 'Mango'];
console.log(typeof fruits); // "object" (Array.isArray দিয়ে চেক করো)
console.log(Array.isArray(fruits)); // true
console.log(fruits.length);  // 3
console.log(fruits[1]);      // "Orange"
// array methods: push, pop, shift, unshift, splice, forEach, map, filter... (অন্য note)

//! Object (অবজেক্ট)
let mobile = {
  name: 'Samsung',
  model: 'S24 Ultra',
  price: 124000,
};
console.log(typeof mobile); // "object"
console.log(mobile.name);   // "Samsung"
console.log(mobile['price']);// 124000

//! Function (ফাংশন)
function greet() {
  return 'Hello';
}
console.log(typeof greet); // "function" (আসলে callable object)
// function ও object-এর মতোই reference type, পাশ করে reference.
