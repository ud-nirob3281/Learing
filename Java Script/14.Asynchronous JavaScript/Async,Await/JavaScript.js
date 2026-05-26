//! Async/Await (বাংলা+English গভীর ব্যাখ্যা)

/*
Async/Await কী?
================
Async/Await হল Promise handle করার আরও সহজ ও clean syntax।
এটা asynchronous code-কে synchronous-এর মতো দেখতে ও পড়তে সুবিধা দেয়।

Syntax:
  async function functionName() {
    await promiseReturningFunction();
  }

- async: function-কে async function বানায়, যা সবসময় Promise return করে।
- await: Promise resolve হওয়া পর্যন্ত অপেক্ষা করে, তারপর তার value return করে।
- await শুধুমাত্র async function-এর ভেতরে ব্যবহার করা যায়।
*/

//* ========================
//* ১. Basic Async Function
//* ========================

async function fu() {
  // return 'Hello';                      // একই জিনিস
  return Promise.resolve('Hello');        // Same — auto wrap হয়ে Promise.resolve হয়
}

console.log(fu());                         // Promise {<fulfilled>: 'Hello'}
/*
Output:
  Promise {<fulfilled>: 'Hello'}
*/

fu().then(res => console.log(res));        // Hello
/*
Output:
  Hello
*/

//* ========================
//* ২. Await ব্যবহার
//* ========================

// Global level-এ await কাজ করে না (unless module type)
// let result = await fu();  // SyntaxError: await is only valid in async functions
// console.log(result);

// async function-এর ভেতরে await ব্যবহার
async function fu1() {
  let result = await fu();                // fu() resolve হওয়া পর্যন্ত অপেক্ষা করবে
  console.log(result);                     // Hello
}
fu1();
/*
Output:
  Hello
*/

//* ========================
//* ৩. Execution Context Flow (Async/Await কিভাবে কাজ করে)
//* ========================

/*
Step by step:
  1. async function call হলে নতুন execution context তৈরি হয়।
  2. Normal synchronous code execute হতে থাকে।
  3. await পেলে function execution সেখানেই pause হয়।
  4. Promise resolve না হওয়া পর্যন্ত function বাকি অংশ microtask queue-তে যায়।
  5. Engine অন্য synchronous code execute করে।
  6. Promise resolve হলে paused function resume হয়, await-এর পরে execution চলতে থাকে।
  7. Function শেষে implicit Promise resolve হয় return value নিয়ে।

এটা Generator function আর Promise-এর combination-এর মতো আচরণ করে।
*/

// উদাহরণ: Execution flow বোঝার জন্য
async function demo() {
  console.log('1: Start');
  const result = await new Promise(resolve => {
    setTimeout(() => {
      console.log('2: Timeout done');
      resolve('Data');
    }, 1000);
  });
  console.log('3:', result);
  console.log('4: End');
}
console.log('0: Before call');
demo();
console.log('5: After call');

/*
Output:
  0: Before call
  1: Start
  5: After call
  2: Timeout done
  3: Data
  4: End

Flow:
  - '0' log, demo() call → execution context তৈরি
  - '1' log, await পাওয়ায় pause
  - '5' log (synchronous continue)
  - Call stack খালি, 1s পর timeout resolve
  - '2' log, await resolve → paused execution resume
  - '3', '4' log, function resolve
*/

//* ========================
//* ৪. Error Handling (Async/Await-এ)
//* ========================

const errorPromise = new Promise((res, rej) => {
  rej('Error occurred');
});

// Way-1: .catch() দিয়ে handle (old way)
errorPromise.catch(err => console.error(err));  // Error occurred
/*
Output:
  Error occurred
*/

// Way-2: try-catch দিয়ে handle (async function-এ)
async function handleErrorFu() {
  try {
    await errorPromise;                   // Promise reject করবে
    console.log('This will not run');
  } catch (err) {
    console.error(err);                   // Error occurred
  }
}
handleErrorFu();
/*
Output:
  Error occurred
*/

/*
Error Handling Best Practice:
  - async/await-এ try-catch block ব্যবহার করো।
  - .catch() chain-এর শেষে দিতে পারো, তবে try-catch cleaner।
  - catch block-এ error log বা user-friendly message দেখাও।
*/

//* ========================
//* ৫. Real-life Example (API Call Simulation)
//* ========================

function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 0) {
        reject('User not found');
      } else {
        resolve({ id: userId, name: `User${userId}` });
      }
    }, 1000);
  });
}

async function getUserDetails(id) {
  try {
    console.log('Fetching user...');
    const user = await fetchUserData(id);
    console.log('User:', user);           // { id: 1, name: 'User1' }
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error); // User not found
    return null;
  } finally {
    console.log('Fetch attempt finished');
  }
}

// getUserDetails(1);  // success
// getUserDetails(0);  // error

/*
Output (getUserDetails(1)):
  Fetching user...
  (1s pause)
  User: { id: 1, name: 'User1' }
  Fetch attempt finished

Output (getUserDetails(0)):
  Fetching user...
  (1s pause)
  Failed to fetch user: User not found
  Fetch attempt finished
*/

//* ========================
//* ৬. Multiple Await (Serial vs Parallel)
//* ========================

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Serial execution (একটার পর একটা) — slow
async function serial() {
  console.log('Serial start');
  await delay(1000);
  console.log('First done');
  await delay(1000);
  console.log('Second done');
  // Total: 2 seconds
}

// Parallel execution (একসাথে) — fast
async function parallel() {
  console.log('Parallel start');
  const p1 = delay(1000);
  const p2 = delay(1000);
  await Promise.all([p1, p2]);  // দুটোই একসাথে চলবে
  console.log('Both done');
  // Total: 1 second
}

// Mixed: কিছু serial, কিছু parallel
async function loadUserData(userId) {
  // Parallel — profile আর posts একসাথে fetch
  const [profile, posts] = await Promise.all([
    fetchUserData(userId),
    delay(500).then(() => ['Post1', 'Post2'])  // mock posts
  ]);
  console.log('Profile:', profile);
  console.log('Posts:', posts);
}

//* ========================
//* ৭. Async/Await vs Promise.then()
//* ========================

/*
| Aspect             | Promise.then()                | Async/Await                     |
|--------------------|-------------------------------|---------------------------------|
| Readability        | Chain (.then().then())        | Synchronous-like, clean         |
| Error Handling     | .catch()                      | try-catch                       |
| Debugging          | Stack trace complex           | Better stack trace              |
| Parallel execution | Promise.all()                 | Promise.all() + await           |
| Use case           | Functional style preferred    | Procedural style preferred      |
*/

//* ========================
//* ৮. Common Mistakes
//* ========================

// Mistake 1: top-level await without module
// let x = await fu(); // SyntaxError in normal script

// Mistake 2: async ছাড়া await use
// function test() { await fu(); } // SyntaxError

// Mistake 3: forget to await
async function forgotAwait() {
  const result = fu(); // result Promise object, value না
  console.log(result); // Promise {<fulfilled>: 'Hello'}
}

// Mistake 4: unnecessary serial execution
async function slow() {
  const a = await fetchUserData(1);   // wait 1s
  const b = await fetchUserData(2);   // wait another 1s → total 2s
  // Better: const [a, b] = await Promise.all([fetchUserData(1), fetchUserData(2)]);
}

//* ========================
//* ৯. IIFE (Immediately Invoked Async Function)
//* ========================
// Top-level await-এর alternative
(async () => {
  const result = await fu();
  console.log('IIFE result:', result);  // Hello
})();
/*
Output:
  IIFE result: Hello
*/

//* ========================
//* ১০. সংক্ষেপে
//* ========================
/*
- async: function-কে Promise-returning function বানায়।
- await: Promise resolve-এর জন্য অপেক্ষা করে, resolve value ফেরত দেয়।
- Error handle: try-catch with await।
- finally: cleanup কাজ, error হোক বা না হোক execute হয়।
- Parallel execution: Promise.all() with await।
*/


//Task
//1
function wait(ms) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('This Promish Resolve');
    }, ms);
  });
}

async function my() {
  // console.log('Pending');
  let retFu = await wait(2000);
  // console.log(retFu);
  // console.log('Complete');
}
my();
//2
function myPro() {
  return new Promise((res, rej) => {
    res('One');
  });
}
async function myProResolve() {
  let re = await myPro();
  // console.log(re);
  let re2 = await new Promise(res =>
    setTimeout(() => {
      res('two');
    }, 1000)
  );
  // console.log(re2);
  let re3 = await new Promise(res =>
    setTimeout(() => {
      res('Three');
    }, 2000)
  );
  // console.log(re3);
}
myProResolve();
//3
async function myda() {
  let response = await fetch('data.json');
  let data = await response.json();
  // console.log(data);
}
myda();
//4
const div = document.getElementById('showData');

async function callAPI() {
  try {
    // let response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    let response = await fetch('https://jsonplaceholder.ypicode.com/users/1');
    let data = await response.json();
    console.log(data);

    const userAdress = data.address;

    const creDiv = document.createElement('div');
    creDiv.innerHTML = `Name:${data.name}`;
    div.appendChild(creDiv);

    const creDiv1 = document.createElement('div');
    creDiv1.innerHTML = `Email:${data.email}`;
    div.appendChild(creDiv1);

    const creDiv2 = document.createElement('div');
    creDiv2.innerHTML = `Adress: City-${userAdress.city}, Street-${userAdress.street}`;
    div.appendChild(creDiv2);
  } catch (error) {
    div.innerHTML = `<p>Sorry Server isnot responding, Please Try Again</p><br/>Bowser Error is${error}`;
  }
}
callAPI();
