//! - 1. What is fetch() API and Syntax
/*
fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
*/

//! - 2. Using async/await with fetch()
/*
async function fetchData(url) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log(error);
    }
}
*/

//! - 3. HTTP Methods

/*
Check this out: https://www.youtube.com/watch?v=Qf2BBZVaAg8

- GET: Fetch data from the server. It does not change anything.
- POST: Send data to the server to create a new resource.
- PUT: Update an entire resource. Replaces the existing data.
- PATCH: Partially update a resource. Only change specific fields.
- DELETE: Delete a resource from the server.
- HEAD: Like GET, but only retrieves the headers (no body). Useful to check if a resource exists or to check metadata.
- OPTIONS: Returns the allowed HTTP methods on a resource (CORS and debugging).
- TRACE: Echoes back the received request to help in debugging or testing — mostly disabled for security reasons.
- CONNECT: Establishes a tunnel to the server, typically for SSL (HTTPS) connections through an HTTP proxy. It’s mostly used for secure communication via a proxy.
*/

//! - 4.fetch() Usage: Creating Resource /POST
async function postData(postData) {
  let API_URL = 'http://localhost:3000/posts';
  let response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(postData),
  });
  let data = await response.json();
  console.log(data);
}
let postDatas = {
  id: '1',
  title: 'THIS UD NIROB BACKEND SERVER',
  views: 500,
};

document.getElementById('post').onclick = () => {
  postData(postDatas);
};

//! - 5. fetch() Usage: Getting Resources
async function getPosts() {
  let api_url = 'http://localhost:3000/posts';
  let response = await fetch(api_url);
  let data = await response.json();
  console.log(data);
}
getPosts();

//! - 6. fetch() Usage: Query Params
async function quaryPar() {
  let API_URL = 'http://localhost:3000/posts';
  let quearParms = {
    views: 500,
  };

  let quearyString = new URLSearchParams(quearParms).toString();
  console.log(quearyString);

  const main_url = `${API_URL}?${quearyString}`;
  let response = await fetch(main_url);
  let data = await response.json();
  console.log(data);
}
quaryPar();

//! - 7. fetch() Usage: Updating an Entire Resource /PUT
async function update(udata, ID) {
  let API_URL = `http://localhost:3000/posts/${ID}`;
  let response = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-type': 'application/Jjson' },
    body: JSON.stringify(udata),
  });
  let data = await response.json();
  console.log(data);
}
let updateData = {
  title: 'THIS UD NIROB FRONTEND SERVER',
  views: 123,
};
document.getElementById('update').onclick = () => update(updateData, '2');

//! - 9. fetch() Usage: Updating a Part of the Resource /PATCH
async function updateP(udata, ID) {
  let API_URL = `http://localhost:3000/posts/${ID}`;
  let response = await fetch(API_URL, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/Jjson' },
    body: JSON.stringify(udata),
  });
  let data = await response.json();
  console.log(data);
}
let updatePartData = {
  views: 323,
};
document.getElementById('update1').onclick = () => updateP(updatePartData, '2');

//! - 10. fetch() Usage: Deleting Resource /DELETE
async function deleteResource(ID) {
  let API_URL = `http://localhost:3000/posts/${ID}`;
  let response = await fetch(API_URL, {
    method: 'DELETE',
  });
  let data = await response.json();
  console.log(data);
}
document.getElementById('delete').onclick = () => deleteResource('1');

//! - 11. fetch() Usage: Custom Headers

async function login() {
  const API_URL = 'http://localhost:3000/login';
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer secret-token',
        'Custom-Header': 'learn 40 days of JS',
      },
      body: JSON.stringify({ username: 'SAFA', password: 1234 }),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

//! - 11. Creating a Request Object
const req1 = new Request('http://localhost:3000/posts', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    name: 'Ud Nirob',
    age: 18,
    career: 'MERN Stact Web Developer',
    views: 0,
  }),
});

const req2 = new Request(req1.clone(), {
  body: JSON.stringify({
    name: 'Safa',
    age: 16,
    career: 'Frontend Web Developer',
    views: 0,
  }),
});

async function posts(request) {
  let response = await fetch(request);
  let data = await response.json();
  console.log(data);
}

document.getElementById('post1').onclick = () => posts(req1);
document.getElementById('post2').onclick = () => posts(req2);

//! Handle Response
async function hr() {
  try {
    let api_url = 'http://localhost:3000/posts';
    let response = await fetch(api_url);

    if (!response.ok) {
      throw new Error(`Response Status ${response.status}`);
    }

    let contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError(`Oops, we havent got JSON`);
    }

    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
hr();
//! Cancel Promise and Download
const url =
  'https://i.ytimg.com/vi/IbKjb8HNKpo/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLBuMedvPzVeyuYZidx7QCaDEReSzw';

let controller;

document.querySelector('.downlod').onclick = download;
document.querySelector('.abort').onclick = abortFu;

function abortFu() {
  controller.abort('User Aborted');
  console.log('Aborted');
}

async function download() {
  controller = new AbortController();
  let signal = controller.signal;

  setTimeout(async () => {
    let response = await fetch(url, { signal });
    const data = await response.blob();
    const objectUrl = URL.createObjectURL(data);

    const crea = document.createElement('a');
    crea.href = objectUrl;
    crea.download = 'cuty.jpg';
    crea.click();
  }, 2000);
}

//!! Task
//1
async function f1() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    //console.log(data.forEach(val => console.log(val.name)));
  } catch (error) {
    console.error(error);
  }
}
f1();
//2
async function f2() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=1`
  );
  const data = await res.json();
  const re = document.querySelector('.result');
  data.forEach(va => {
    const crp = document.createElement('p');
    crp.innerText = va.title;
    re.append(crp);
  });
  console.log(data);
}
f2();
//3
async function f3() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      title: 'Wish',
      body: 'Hello!How are You Safa',
      usweId: 0,
    }),
  });
  const data = await res.json();

  //console.log(data);
}
f3();
//4
async function f4() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      title: 'Propose',
      body: 'I love you Safa',
    }),
  });
  let da = await response.json();
  // console.log(da);
}
f4();
//5
async function f5() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      title: 'hi!',
    }),
  });
  let da = await response.json();
  // console.log(da);
}
f5();
//6
async function f6() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE',
  });
  //console.log(response.status);
}
f6();
//7
async function f7() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      title: 'hi!',
    }),
  });
  //console.log(await response.json());
}
f7();
//8

async function request(url, options) {
  let response = await fetch(url, options);
  let data = await response.json();
  return data;
}

// ১. GET users
request('https://jsonplaceholder.typicode.com/users').then(users =>
  console.log('Users:', users)
);

// ২. POST new post
request('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    title: 'Earning',
    body: 'I hate Haram Earning',
  }),
}).then(newPost => console.log('New Post:', newPost));

//9
async function f8() {
  try {
    const r = await fetch(
      'https://jsonplaceholder.typicode.com/thisurldoesnotexist'
    );
    if (!r.ok) throw new Error('Sorry This site not avilable this time');
  } catch (error) {
    console.error(error);
  }
}
f8();
//10
let control;
document.getElementById('ab').onclick = () => {
  console.log('ok');
  control.abort('User Aboted');
};
async function f9() {
  control = new AbortController();
  let signal = control.signal;
  setTimeout(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      signal,
    });
    console.log(await res.json());
  }, 3000);
}
f9();
