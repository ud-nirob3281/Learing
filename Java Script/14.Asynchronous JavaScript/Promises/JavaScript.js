//! Promise By Ali Vai

//Stntex
let promisw = new Promise(function (resolve, reject) {
  //Logic
  resolve();
  reject();
  resolve();
});
{
  //* 1
  /* //? Style 1
let myPromise = new Promise((resolve, reject) => {
  if (true) {
    return resolve();
  } else {
    return reject();
  }
});
myPromise
  .then(() => {
    console.log('Promise is Relolve');
  })
  .catch(() => {
    console.log('Promise is Rejected');
  });
//? Style 2
let myPromises = new Promise((res, rej) => {
  if (false) {
    return res('Resolved');
  } else {
    return rej('Rejected');
  }
});
myPromises
  .then(resolve => {
    console.log(resolve);
  })
  .catch(reject => {
    console.log(reject);
  });
 */
  //* 2
  /* let myPromise2 = new Promise((resolve, reject) => {
  let randomNumber = Math.floor(Math.random() * 10);
  console.log(randomNumber);
  if (randomNumber <= 5) {
    return resolve();
  } else {
    return reject();
  }
});
myPromise2
  .then(() => {
    console.log('Number is less than or equal to 5');
  })
  .catch(() => {
    console.log('Number is greater than 5');
  });
 */

  //* Chaining Promises
  let myPromise3 = new Promise((res, rej) => {
    return res('First Step Done');
  })
    .then(val => {
      // console.log(val);
      return new Promise(function (rs, rj) {
        return rs('Second Step Done');
      });
    })
    .then(function (vle) {
      //console.log(vle);
      return new Promise((res, rej) => {
        return res('Third Step Done');
      });
    });
  myPromise3.then(ve => {
    // console.log(ve);
  });
}
//! Promise By Tapas Vai
{
  //* .then()
  const promise1 = new Promise(function (resolve, reject) {
    resolve('I am resolve..');
    //reject('I am Reject..');
  });
  promise1.then(
    result => {
      // console.log(result);
    }, //Reslove Case
    error => {
      console.error(error);
    } //Reject Case
  );

  //*.catch()
  const promise2 = new Promise(function (resolve, reject) {
    reject('I am Reject..');
  });
  promise2.catch(result => {
    // console.error(result);
  });

  //* .finally
  let loading = false;
  const promise3 = new Promise(function (resolve, reject) {
    loading = true;
    resolve('Resolved..');
  });
  promise3
    .then(re => {
      //console.log(re);
    })
    .finally(() => (loading = false));

  //* Chaining Promises
  // - Promise Chain

  // Rule 1: Every promise gives you a .then() handler method. Every rejected promise provides you a .catch() handler.

  // Rule 2: You can do mainly three valuable things from the .then() method. You can return another promise(for async operation). You can return any other value from a synchronous operation. Lastly, you can throw an error.

  // Return a promise from the .then() handler

  // Create a Promise
  let getUser = new Promise(function (resolve, reject) {
    const user = {
      name: 'John Doe',
      email: 'jdoe@email.com',
      password: 'jdoe.password',
      permissions: ['db', 'dev'],
    };
    resolve(user);
  });

  getUser
    .then(function (user) {
      //console.log(`Got user ${user.name}`);

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('Bangalore');
        }, 1000);
      });
    })
    .then(address => {
      // console.log(`User address is ${address}`);
    });

  // Return a simple value from the .then() handler

  getUser
    .then(function (user) {
      // console.log(`Got user ${user.name}`);
      return user.email;
    })
    .then(function (email) {
      //console.log(`User email is ${email}`);
    });

  // Throw an error from the .then() handler

  getUser
    .then(function (use) {
      if (!use.permissions.includes('ad')) {
        throw new Error('You are not allowed to access as module');
      } else {
        return use.email;
      }
    })
    .then(em => {
      //console.log(em);
    })
    .catch(err => {
      //console.error(err);
    });
  // Rule 3: You can rethrow from the .catch() handler to handle the error later. In this case, the control will go to the next closest .catch() handler.
  let promise401 = new Promise((res, rej) => {
    rej(401);
  });

  promise401
    .catch(v => {
      //console.log(v);
      if (v === 401) {
        throw v;
      } else {
        //some
      }
    })
    .then(re => {
      //  console.log(re);
    })
    .catch(err => {
      // console.log(err);
    });

  // Rule 4 - Unlike .then() and .catch(), the .finally() handler doesn't process the result value or error. It just passes the result as is to the next handler.
  let promiseFinnaly = new Promise((res, rej) => {
    res('Testing Resolvrd');
  });
  promiseFinnaly
    .finally(function () {
      // console.log('Running Finnaly');
    })
    .then(val => {
      // console.log(val);
    });
  // Rule 5 - Calling the .then() handler method multiple times on a single promise is NOT chaining.

  //TODO Chin
  /*   promise
    .then(result => {
      // Do Something
      return 101;
    })
    .then(result => {
      // result // 101
      // throw error
    })
    .catch(error => {
      //error
    });*/

  //TODO Not Chin
  /*
  promise.then(result => {
    // Do Something
    return 101;
  });
  promise.then(result => {
    // result // 101
    // throw error
  });
  promise.catch(error => {}); 
*/
  let promise = new Promise(function (resolve, reject) {
    resolve(10);
  });

  // Calling the .then() method multiple times
  // on a single promise - It's not a chain

  //* Chin
  promise
    .then(function (value) {
      value++;
      return value;
    })
    .then(function (value) {
      value = value + 10;
      return value;
    })
    .then(function (value) {
      value = value + 20;
      // console.log(value);
      return value;
    });

  //* Not Chin
  promise.then(function (value) {
    value++;
    return value;
  });
  promise.then(function (value) {
    value = value + 10;
    return value;
  });
  promise.then(function (value) {
    value = value + 20;
    // console.log(value);
    return value;
  });

//! Promise Combinators (একাধিক Promise Handle করার পদ্ধতি)

/*
যখন একাধিক Promise একসাথে handle করতে চাই, তখন এই methods ব্যবহার হয়।
এগুলোকে Promise Combinators বলে।

প্রত্যেকটির behaviour আলাদা। নিচে detail বুঝিয়ে দিচ্ছি।
*/

// Sample Promises (প্রত্যেকটি example-এ ব্যবহারের জন্য)
let step1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Step 1 Completed');
  }, 1000);
});

let step2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Step 2 Completed');
  }, 1500);
});

let step3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Step 3 Failed');
  }, 500);
});

//* ========================
//* ১. Promise.all([promises])
//* ========================
/*
বৈশিষ্ট্য:
- সবগুলো Promise resolve হলে তবেই resolve হয়।
- সবগুলোর resolved value একটি array-তে দেয়।
- যেকোনো একটি Promise reject হলে সাথেসাথে reject হয়,
  এবং বাকিগুলোর result ignore হয়।

Use Case: যখন সবগুলো asynchronous operation সম্পন্ন হওয়া দরকার।
  যেমন: user profile + user posts + user friends একসাথে load করা।
*/

Promise.all([step1, step2])
  .then(res => {
    console.log('Promise.all result:', res);
    // Output (1.5s পরে): ['Step 1 Completed', 'Step 2 Completed']
  })
  .catch(err => {
    console.log('Promise.all error:', err);
  });

// reject সহ example
Promise.all([step1, step3])
  .then(res => console.log(res))
  .catch(err => console.log('Promise.all with reject:', err));
  // Output (500ms পরে): "Promise.all with reject: Step 3 Failed"


//* ========================
//* ২. Promise.any([promises])
//* ========================
/*
বৈশিষ্ট্য:
- যেকোনো একটি Promise resolve হলেই resolve হয়।
- শুধুমাত্র resolve value return করে, array না।
- যদি সবগুলো Promise reject হয়, তাহলে AggregateError দেয়।

Use Case: দ্রুততম source থেকে data আনা।
  যেমন: multiple CDN থেকে একই image load, যেটা আগে load হবে সেটাই use।
*/

Promise.any([step1, step2])
  .then(res => {
    console.log('Promise.any result:', res);
    // Output (1s পরে): "Step 1 Completed"
  })
  .catch(err => {
    console.log('Promise.any error:', err);
  });


//* ========================
//* ৩. Promise.allSettled([promises])
//* ========================
/*
বৈশিষ্ট্য:
- সবগুলো Promise complete হওয়া পর্যন্ত অপেক্ষা করে (resolve বা reject যাই হোক)।
- প্রতিটি Promise-এর result object array return করে।
  প্রতিটি object-এ:
    { status: 'fulfilled', value: ... }  অথবা
    { status: 'rejected',  reason: ... }

Use Case: সবগুলো operation-এর result জানা দরকার, কিছু fail হলেও বাকিগুলো process করতে হবে।
  যেমন: batch file upload, কিছু fail করলেও বাকিগুলোর status দেখানো।
*/

Promise.allSettled([step1, step2, step3])
  .then(res => {
    console.log('Promise.allSettled result:', res);
    // Output (1.5s পরে):
    // [
    //   { status: 'fulfilled', value: 'Step 1 Completed' },
    //   { status: 'fulfilled', value: 'Step 2 Completed' },
    //   { status: 'rejected',  reason: 'Step 3 Failed' }
    // ]
  });


//* ========================
//* ৪. Promise.race([promises])
//* ========================
/*
বৈশিষ্ট্য:
- যেই Promise সবার আগে complete হবে (resolve বা reject), সেটার result নিয়ে resolve/reject হয়।
- Array return করে না, single value/error।

Use Case: timeout implement করা।
  যেমন: API call-এর সাথে timeout Promise race করানো;
  API 5 সেকেন্ডের মধ্যে response না দিলে timeout reject করবে।
*/

Promise.race([step1, step2])
  .then(res => {
    console.log('Promise.race result:', res);
    // Output (1s পরে): "Step 1 Completed"
  })
  .catch(err => {
    console.log('Promise.race error:', err);
  });

// resolve/reject mixed
Promise.race([step3, step1])
  .then(res => console.log('Race mixed:', res))
  .catch(err => console.log('Race mixed error:', err));
  // Output (500ms পরে): "Race mixed error: Step 3 Failed"



//* ========================
//* ৬. Real-life Example (API Call Simulation)
//* ========================

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 999) reject('User not found');
      else resolve({ id, name: `User${id}` });
    }, Math.random() * 2000);
  });
}

const user1 = fetchUser(1);
const user2 = fetchUser(2);
const user3 = fetchUser(999); // will reject

// Promise.all: সব user দরকার
Promise.all([user1, user2])
  .then(users => console.log('All users:', users))
  .catch(err => console.log('Failed to fetch all:', err));

// Promise.allSettled: reject হলেও status চাই
Promise.allSettled([user1, user2, user3])
  .then(results => {
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') console.log(`User${i+1}:`, r.value.name);
      else console.log(`User${i+1} failed:`, r.reason);
    });
  });

// Promise.race: দ্রুততম user
Promise.race([user1, user2])
  .then(fastest => console.log('Fastest user:', fastest));

// Promise.any: দ্রুততম successful user (reject skip)
Promise.any([user1, user3, user2])
  .then(firstSuccess => console.log('First success:', firstSuccess));


//* ========================
//* ৭. সংক্ষেপে Comparison Table
//* ========================
/*
| Method           | কখন resolve/reject?                           | Return Value               |
|------------------|-----------------------------------------------|----------------------------|
| Promise.all      | সব resolve হলে resolve, একটাও reject হলে reject | Array of all results       |
| Promise.any      | যেকোনো একটি resolve হলে resolve                | Single first resolve value |
| Promise.allSettled| সব complete (resolve/reject) হলে resolve       | Array of {status,value/reason} |
| Promise.race     | প্রথম complete (resolve/reject) হলে            | Single first value/error   |
*/



//!Task
{
  //1
  let promise1 = new Promise(function (res, rej) {
    res('Hello');
  });
  promise1.then(val => {
    setTimeout(function () {
      // console.log(val);
    }, 1000);
  });

  //2
  let promise2 = new Promise(function (res, rej) {
    rej('Something went wrong!');
  });
  promise2.catch(va => {
    // console.log(va);
  });
  //3
  let coin = ['Head', 'Tail'];
  let promise3 = new Promise((res, rej) => {
    let rdn = Math.floor(Math.random() * 2);
    // console.log(rdn);
    setTimeout(() => {
      res(coin[rdn]);
    }, 1000);
  });
  promise3.then(val => {
    // console.log(val);
  });
  //3
  function chekAge(age) {
    return new Promise((res, rej) => {
      if (age >= 18) {
        res();
      } else {
        rej();
      }
    });
  }
  chekAge(20);
  //.then(() => console.log('Promise Resloved'))
  // .catch(() => console.log('Promise Reject'));

  //4
  let promise4 = new Promise((res, rej) => {
    res();
  });
  promise4
    .then(() => {
      //console.log('Step 1 Done');
      return new Promise((res, rej) => {
        res('Step 2 Done');
      });
    })
    .then(val => {
      // console.log(val);
    });

  let newPromise4 = promise4.then(() => {
    return new Promise((res, rej) => {
      res();
    });
  });
  //newPromise4.then(() => console.log('Step 3 Done'));

  //5
  let promise5 = new Promise((res, rej) => {
    res(5);
  });
  promise5
    .then(val => {
      return new Promise((res, rej) => {
        res(val * 2);
      });
    })
    .then(val => {
      //console.log(val * val);
    });
  //6
  let promise6 = new Promise((res, rej) => {
    res('Start');
  });
  promise6
    .then(val => {
      // console.log(val);
      let rdn = Math.floor(Math.random() * 100);
      // console.log(rdn);
      if (rdn <= 50) {
        throw new Error(`${val} But It is not continue`);
      } else {
        return val + ' And It is Continue';
      }
    })
    .then(valu => console.log(valu))
    .catch(vall => {
      // console.error(vall);
      return 'End';
    });
  // .then(v => console.log(v));
  //8
  let promise7 = new Promise((res, rej) => {
    res('I Can Do IT!');
  });
  promise7.then(val => {
    let va = val.replace('I', 'You');
    //console.log('Really ' + va);
  });

  promise7.then(va => {
    //console.log(va);
  });
  //9
  let promise8 = new Promise((res, rej) => {
    setTimeout(() => {
      res('First');
    }, 1000);
  });
  promise8
    .then(val => {
      //console.log(val);
      return new Promise((res, rej) => {
        setTimeout(() => {
          res('Second');
        }, 1000);
      });
    })
    .then(val => {
      //console.log(val);
      return new Promise((res, rej) => {
        setTimeout(() => {
          res('Third');
        }, 1000);
      });
    });
  // .then(val => console.log(val));
  //9
  function fakeDBquary() {
    let time = [800, 900, 1000, 1500, 2000];
    let rdn = Math.floor(Math.random() * 4);
    return new Promise((res, rej) => {
      const user = {
        name: 'UD NIROB',
        id: 4744,
        email: 'nirob3281@gmail.com',
      };
      setTimeout(() => {
        res(user);
      }, time[rdn]);
    });
  }
  fakeDBquary()
    .then(us => {
      console.log(us.name);
      return fakeDBquary();
    })
    .then(us1 => console.log(us1.email));
}
