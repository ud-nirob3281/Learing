/*
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
    - `Function` - Code that can be executed
  */
//TODO Primitive Data Types
//! String
let firstName = 'NIROB';
//console.log(typeof firstName);

//* Single Cotation('')এর মধ্য Cotation('') Use
let names = "My name is nirob'Nirob'U";
//console.log(names);

//* একটি Varriable এর মধ্য অন্ন Varriable Use করতে হলে
let fName = `My name is ${firstName}`;
//console.log(fName);

//* Line Break
const data =
  "I'am Nirob\nMy age 17 years old\nI am a student and Web Developer Learner";
//console.log(data);

//* Word and Word Position see
let data2 = 'UD NIROB';
//console.log(data2.charAt(1));
//console.log(data2.indexOf('N'));

//* Letter Case Change
let data3 = 'Ud Nirob';
//console.log(data2.toLowerCase());
//console.log(data3.toUpperCase());

//* পরিবর্তন করতে চাইলে
let data4 = 'UNKNOWN DEVELOPER2023 NIROB';
//console.log(data4.replace('2023', '2024'));

//* একটা string কে নির্দিষ্ট সংখ্যক বার রিপিট করতে চাইলে
let str = 'Hello ';
let repeatedStr = str.repeat(3);
console.log(repeatedStr); // Output: Hello Hello Hello

//* Split
let data5 = 'I am a Web Developer';
let allWordArray = data5.split(' '); //*Word by Word
let allWordArray1 = data5.split(''); //*Letter by Letter
console.log(allWordArray);
console.log(allWordArray1);

//Trim (Extra Space Remove)
let data6 = '   Hello World   ';
console.log(data6.trim()); // "Hello World"

//*Word Access
let namess = 'nirob';
console.log(namess[0]);

//*substring
//substring(start, end)
let str1 = 'ABCDEFGHIJ';
// Index: 0=A, 1=B, 2=C, 3=D, 4=E, 5=F, 6=G, 7=H, 8=I, 9=J
console.log(str1.substring(2, 5)); // "CDE"

//*Slice
// ৩. slice(start, end) - negative index support করে
console.log(str1.slice(2, 5)); // "CDE"

//! Number
let age = 17;
//console.log(typeof age);

//* দশমিক এ পর নিদিষ্ট সংখ্যা ঘর সংখ্যা লাগলে
let num = 44.445454445;
//console.log(num.toFixed(2));

//*Number convert to String
console.log(num.toString());

//* String convert to Number
/* console.log(Number('56.78'));
console.log(parseInt('56.78')); /
console.log(parseFloat('56.78'));  */

//* কোন কিছু নাম্বার নাকি না তা চেক করতে
//? isFinite
console.log(isFinite(123)); // true, কারণ 123 একটি বৈধ সংখ্যা
console.log(isFinite('abc')); // false, কারণ 'abc' কোনো সংখ্যা নয়
console.log(isFinite(true)); // true, কারণ true কে 1-এ রূপান্তর করা যায়
console.log(isFinite(false)); // true, কারণ false কে 0-এ রূপান্তর করা যায়
console.log(isFinite(undefined)); // false, কারণ undefined কে NaN হিসাবে গণ্য করা হয়
//? isNan
console.log(isNaN(123)); // false, কারণ 123 একটি বৈধ সংখ্যা
console.log(isNaN('abc')); // true, কারণ 'abc' কোনো সংখ্যা নয়
console.log(isNaN(true)); // false, কারণ true কে 1-এ রূপান্তর করা যায়
console.log(isNaN(false)); // false, কারণ false কে 0-এ রূপান্তর করা যায়
console.log(isNaN(undefined)); // true, কারণ undefined কে NaN হিসাবে গণ্য করা হয়
//* Convert
let num2 = 248;
//console.log(num2.toString(2)); // Decimal to Binary
//console.log(num2.toString(8)); // Decimal to Octal
//console.log(num2.toString(16)); // Decimal to Hexadecimal

//* সংখ্যা কয় ঘরে দেখাবে
let num3 = 56;
//console.log(num3.toPrecision(1));
//console.log(num3.toPrecision(2));
//console.log(num3.toPrecision(3));
//console.log(num3.toPrecision(4));

//! Bigint
let bigNumber = 9999999999999999n;
//let bigNumbe2 = 9999999999999999n;
//এভাবেও লেখা যায়
let bigNumbe2 = BigInt(9999999999999999);

//console.log(bigNumber * bigNumbe2);
//console.log(typeof bigNumber);

//! Boolean
// true false কে Boolean বলা হয়
let ifAdult = true;
//console.log(typeof ifAdult);

//! Undefined
let someInfo;
//console.log(someInfo);
//console.log(typeof someInfo);

//TODO Non-Primitive Data Types
//! Array
let fruit = ['Apple', 'Orange', 'mango'];
//console.log(typeof fruit);

//! Object
let mobil = {
  name: 'Samsung',
  model: 'S24 Ultra',
  price: 124000,
};
//console.log(typeof mobil);
