// JavaScript is Synchronous
// There can be async behaviours
// - With Browser APIs/Web APIs - setTimeout, setInterval
// - With Promises
// - With Event Handlers

// Event Loop
// - Call Stack
// - Web APIs
// - Callback Queue:
// - MicroTask Queue/Job Queue:
// - Event Loop:
//!Ex-1
//*Look all Excute in Visual so Watch https://youtu.be/4IYcwOfW3BM?si=E8A3ymGBrqZYbsdL&t=1532
/* {
  function f1() {
    console.log('f1');
  }

  function f2() {
    console.log('f2');
  }

  function main() {
    console.log('main');
    setTimeout(f1, 0);
    new Promise((resolve, reject) => {
      resolve('I am a promise!');
    }).then(res => console.log(res));
    f2();
  }
  main();
} */
//!Ex-2
/*{
  function f1() {
    console.log('f1');
  }

  function f2() {
    console.log('f2');
  }
  function f3() {
    console.log('f3');
  }

  function main() {
    console.log('main');
    setTimeout(f1, 0);
    setTimeout(f2, 0);
    new Promise((resolve, reject) => {
      resolve('P1');
    }).then(resolve => console.log(resolve));
    new Promise((resolve, reject) => {
      resolve('P2');
    }).then(resolve => console.log(resolve));
    f3();
  }
  main();
}*/
//! Task

//*1
/* {
  function f1() {
    console.log('f1');
  }

  function f2() {
    console.log('f2');
  }

  function f3() {
    console.log('f3');
  }

  function f4() {
    console.log('f4');
  }

  console.log("Let's do it!");

  setTimeout(function () {
    f1();
  }, 0);

  f4();

  setTimeout(function () {
    f2();
  }, 5000);

  setTimeout(function () {
    f3();
  }, 3000);
  //* [Let's do it!,f4,f1,f3,f2]
} */

//*2
/* {
  function f1() {
    console.log('f1');
  }

  console.log("Let's do it!");

  setTimeout(function () {
    console.log('in settimeout');
  }, 0);

  f1();
  f1();
  f1();
  f1();
  //*[Let's do it!,f1,f1,f1,f1,in settimeout]
} */

//*5
/* {
  const tom = () => console.log('Tom');

  const jerry = () => console.log('Jerry');

  const cartoon = () => {
    console.log('Cartoon');

    setTimeout(tom, 5000);

    new Promise((resolve, reject) =>
      resolve('should it be right after Tom, before Jerry?')
    ).then(resolve => console.log(resolve));

    jerry();
  };

  cartoon();
  //*[Cartoon,Jerry,should it be right after Tom, before Jerry?,Tom]
} */
//*6
/* {
  const tom = () => console.log('Tom');
  const jerry = () => console.log('Jerry');
  const doggy = () => console.log('Doggy');

  const cartoon = () => {
    console.log('Cartoon');

    setTimeout(tom, 50);
    setTimeout(doggy, 30);

    new Promise((resolve, reject) =>
      resolve('I am a Promise, right after tom and doggy! Really?')
    ).then(resolve => console.log(resolve));
    new Promise((resolve, reject) =>
      resolve('I am a Promise after Promise!')
    ).then(resolve => console.log(resolve));

    jerry();
  };

  cartoon();
  //*[Cartoon,Jerry,I am a Promise, right after tom and doggy! Really?,I am a Promise after Promise!,Doggy,Tom]
} */
//*7
{
  /*
  const f1 = () => console.log('f1');
  const f2 = () => console.log('f2');
  const f3 = () => console.log('f3');
  const f4 = () => console.log('f4');

  f4();

  setTimeout(f1, 0);

  new Promise((resolve, reject) => {
    resolve('Boom');
  }).then(result => console.log(result));

  setTimeout(f2, 2000);

  new Promise((resolve, reject) => {
    resolve('Sonic');
  }).then(result => console.log(result));

  setTimeout(f3, 0);

  new Promise((resolve, reject) => {
    resolve('Albert');
  }).then(result => console.log(result));
  */
  //*[f4,Boom,Sonic,Albert,f1,f3,f2]
}

//*8
{
  /*   const f1 = () => {
    console.log('f1');
    f2();
  };
  const f2 = () => console.log('f2');
  const f3 = () => console.log('f3');
  const f4 = () => console.log('f4');

  f4();

  setTimeout(f1, 0);

  new Promise((resolve, reject) => {
    resolve('Sonic');
  }).then(result => console.log(result));

  setTimeout(f3, 0);

  new Promise((resolve, reject) => {
    resolve('Albert');
  }).then(result => console.log(result)); */
  //*[f4,Sonic,Albert,f1,f2,f3]
}
