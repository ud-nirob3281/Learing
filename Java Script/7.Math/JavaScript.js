//! Math
//* Number Customization
let num = 90.45645;
console.log(Math.round(num)); //? Round Figar Number

let num1 = 15.00001;
console.log(Math.ceil(num1)); //?দশমিক এর পর যাই থাক 1 Plus হবে

let num2 = 15.99999;
console.log(Math.floor(num2)); //?দশমিক এর পর যাই থাক 1 Plus হবেনা

//*Power Value
let num3 = 4;
console.log(Math.pow(num3, 3));
console.log(Math.pow(2, 4));

//* Root Value
console.log(Math.sqrt(num3));

//* Output Alaways Posative
console.log(Math.abs(-118));

//*Minimun/Maximum Value
console.log(Math.min(2, 3, -18, 99, 10, -33, 54));
console.log(Math.max(2, 3, -18, 99, 10, -33, 54));

//* PIE Value
console.log(Math.PI);

//* Sin,cos,tan.....
console.log(Math.sin((90 * Math.PI) / 180));

//* Ramdom Number Genarator
console.log(Math.random());
console.log(Math.random().toFixed(2));//? দশমিক এর পর নিদিষ্ট ঘর সংখ্যা চাইলে
console.log(Math.floor(Math.random() *100));//? পূর্ণ সংখ্যা চাইলে
