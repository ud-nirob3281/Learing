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

