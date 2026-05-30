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
      
