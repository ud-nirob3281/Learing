//! try-catch
try {
  // logic or code
} catch (err) {
  // handle error
}

/*
    1. Code inside try gets executed.
    2. If no error in the try block, the catch block will be ignored and will not be
    executed.
    3. If there is an error in the try block, the execution of the try block will be
    suspended and the control will move to the catch block. In the catch block you
    can find the error details and do the needful.
*/

/* try {
  console.log('execution starts here');
  abc;
  console.log('execution ends here');
} catch (err) {
  console.error('An Error has occured');

  console.log(err.name);
  console.log(err.message);
  console.log(err.stack);
} */

// Real-World Use Cases

const person = {
  name: 'Ud nirob',
  adress: {
    city: 'Earth',
  },
};
function user(user) {
  try {
    // console.log(user.adress.all);
    // console.log(user.adress.country.all);
  } catch (err) {
    // console.error('Error is:', err.message);
  }
}
user(person);

//* Throw
function divideNumbers(a, b) {
  try {
    if (b === 0) {
      const err = new Error('Division by zero is not allowed.');
      throw err;
    }
    const result = a / b;
    //console.log(`The result is ${result}`);
  } catch (error) {
    // console.error('Got a Math Error:', error.message);
  }
}
divideNumbers(15, 3);
divideNumbers(15, 0);

//! Rethrow
function validateForm(fromData) {
  try {
    if (!fromData.name) throw new Error('Name is required.');
    if (!fromData.email.includes('@')) throw new Error('Email Email Format.');
  } catch (err) {
    // console.error('Validation Error:', err.message);
    throw err;
  }
}

try {
  validateForm({ name: '', email: 'udnirob.com' });
} catch (erro) {
  //console.error('New error:', erro.message);
}

//! try-catch-finally

try {
  // Code that may throw an error
} catch (error) {
  // Code to handle the error
} finally {
  // Code that always runs (cleanup actions)
}

function processInformation(information) {
  try {
    console.log('Processing Information...');
    if (!information) throw new Error('No Information available to process');
    console.log('Information processed');
  } catch (error) {
    console.err('Error:', error.message);
  } finally {
    console.log('Cleanup: Closing database connection');
  }
}
//processInformation();
//!Custom Error

function ValidationError(messege) {
  this.name = 'ValidationError';
  this.message = messege;
}

function validstrage(age) {
  if (age < 40) throw new ValidationError('You ar not a Senior Citizen');
  else {
    return 'You are a Senior citizen';
  }
}

//console.log(validstrage(50));

try {
  const mess = validstrage(30);
  console.log(mess);
} catch (err) {
  //console.log(err);
  // console.error(`${err.name}: ${err.message}`);
}

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
