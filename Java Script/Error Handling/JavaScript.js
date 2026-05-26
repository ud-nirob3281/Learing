//! try-catch (Error Handling in JavaScript)

/*
try-catch কী?
==============
try-catch JavaScript-এ error handle করার mechanism.
এটা code crash না করে gracefully error handle করতে দেয়।

Flow:
  1. try block-এর code execute হয়।
  2. কোনো error না থাকলে catch block skip হয়।
  3. error থাকলে try block-এর execution সেখানেই থেমে যায়,
     control সরাসরি catch block-এ চলে যায়।
  4. catch block-এ error details (name, message, stack) পাওয়া যায়।
*/

//* ========================
//* ১. Basic try-catch
//* ========================

try {
  console.log('execution starts here');
  abc; // ReferenceError: abc is not defined
  console.log('execution ends here'); // এই লাইন execute হবে না
} catch (err) {
  console.error('An Error has occured');
  console.log(err.name);    // ReferenceError
  console.log(err.message); // abc is not defined
  console.log(err.stack);   // ReferenceError: abc is not defined at <anonymous>:<line>
}

/*
Output:
  execution starts here
  An Error has occured
  ReferenceError
  abc is not defined
  ReferenceError: abc is not defined
    at ... (stack trace)
*/

//* ========================
//* ২. Nested Object Access Error Handle
//* ========================
const person = {
  name: 'Ud nirob',
  adress: {
    city: 'Earth',
  },
};

function user(user) {
  try {
    console.log(user.adress.all);           // undefined (কাজ করবে)
    console.log(user.adress.country.all);   // TypeError: Cannot read properties of undefined
  } catch (err) {
    console.error('Error is:', err.message); // Error is: Cannot read properties of undefined
  }
}
user(person);

/*
Output:
  undefined
  Error is: Cannot read properties of undefined (reading 'all')
*/

//* ========================
//* ৩. Throw (নিজে Error তৈরি করে ছোঁড়া)
//* ========================
function divideNumbers(a, b) {
  try {
    if (b === 0) {
      const err = new Error('Division by zero is not allowed.');
      throw err; // custom error throw
    }
    const result = a / b;
    console.log(`The result is ${result}`);
  } catch (error) {
    console.error('Got a Math Error:', error.message);
  }
}
divideNumbers(15, 3);  // The result is 5
divideNumbers(15, 0);  // Got a Math Error: Division by zero is not allowed.

/*
Output:
  The result is 5
  Got a Math Error: Division by zero is not allowed.
*/

//* ========================
//* ৪. Rethrow (Error পুনরায় ছোঁড়া)
//* ========================
function validateForm(fromData) {
  try {
    if (!fromData.name) throw new Error('Name is required.');
    if (!fromData.email.includes('@')) throw new Error('Email Email Format.');
  } catch (err) {
    console.error('Validation Error:', err.message);
    throw err; // rethrow — caller-কে error pass করে দেওয়া
  }
}

try {
  validateForm({ name: '', email: 'udnirob.com' });
} catch (erro) {
  console.error('New error:', erro.message);
}

/*
Output:
  Validation Error: Name is required.
  New error: Name is required.
*/

//* ========================
//* ৫. try-catch-finally
//* ========================
/*
finally block সবসময় execute হয় — error হোক বা না হোক।
Cleanup কাজের জন্য ব্যবহার হয় (connection close, file close, loader hide)।
*/

function processInformation(information) {
  try {
    console.log('Processing Information...');
    if (!information) throw new Error('No Information available to process');
    console.log('Information processed');
  } catch (error) {
    console.error('Error:', error.message); // TypeError: console.err is not a function (নিচে note)
  } finally {
    console.log('Cleanup: Closing database connection');
  }
}
processInformation(); // call without argument

/*
Output:
  Processing Information...
  Cleanup: Closing database connection   (finally execute হলো, কিন্তু error ও পাবে)
  (তারপর error হবে কারণ console.err বলে কিছু নেই — console.error হবে)
  
  Note: তোমার কোডে console.err আছে, সেটা ঠিক করে console.error করলে output হবে:
  Processing Information...
  Error: No Information available to process
  Cleanup: Closing database connection
*/

//* ========================
//* ৬. Custom Error (নিজস্ব Error Type)
//* ========================

function ValidationError(messege) {
  this.name = 'ValidationError';
  this.message = messege;
}
// ES6 class way-ও করা যায়: class ValidationError extends Error { ... }

function validstrage(age) {
  if (age < 40) throw new ValidationError('You are not a Senior Citizen');
  else {
    return 'You are a Senior citizen';
  }
}

console.log(validstrage(50)); // You are a Senior citizen

try {
  const mess = validstrage(30);
  console.log(mess); // এই লাইন execute হবে না, কারণ উপরে error throw হয়েছে
} catch (err) {
  console.log(err);             // ValidationError { name: 'ValidationError', message: 'You are not a Senior Citizen' }
  console.error(`${err.name}: ${err.message}`); // ValidationError: You are not a Senior Citizen
}

/*
Output (উপরের সব একসাথে):
  You are a Senior citizen
  ValidationError { name: 'ValidationError', message: 'You are not a Senior Citizen' }
  ValidationError: You are not a Senior Citizen
*/

//* ========================
//* ৭. Execution Context Flow (try-catch-এর ভেতরে)
//* ========================
/*
1. try block-এর code normal execution context-এ চলে।
2. Error পেলে engine একটা new Error object তৈরি করে (যদি throw করা হয়)।
3. Execution context suspended, engine catch block-এ jump করে।
4. catch block শেষে finally থাকলে সেটা execute হয়।
5. সব শেষে finally-র পরের code execute হয়।

Error object properties:
  err.name    → error type (ReferenceError, TypeError, custom)
  err.message → error description
  err.stack   → full trace (debugging-এর জন্য)
*/

//* ========================
//* ৮. Best Practices
//* ========================
/*
- try block-এ শুধু error-prone code রাখো।
- catch block-এ error log/display করো, silent catch avoid করো।
- finally use করো cleanup-এর জন্য (hide loader, close connection).
- Custom error class use করো specific error type-এর জন্য।
- Throw করলে meaningful message দাও।
- Rethrow তখনই করো যখন caller-কে error pass করা দরকার।
*/

//task
//1
try {
  let r = p + 50;
  //console.log(r);
} catch (error) {
  // console.log('An error occurred:', error.name);
}
//error name: ReferenceError

//2
let balance = 5000;
function payment(amount) {
  try {
    if (amount <= 0) throw new Error('Invalid amount');
    if (amount > balance) throw new Error('Insufficient balance');
  } catch (error) {
    // console.log('Payment Error:', error.message);
  }
}
payment(10000);
payment(-500);
//5
function ValidationObj(message) {
  this.name = 'ValidationError';
  this.message = message;
}

function ValidationChek(userInput) {
  if (!userInput.username) throw new ValidationObj('Username cannot be empty');
  if (userInput.age < 1)
    throw new ValidationObj('Age must be a positive number');

  return console.log(userInput.username, userInput.age);
}
try {
  const Input = { username: '', age: -2 };
  ValidationChek(Input);
} catch (err) {
  // console.log('ValidationError:' + err.message);
}
