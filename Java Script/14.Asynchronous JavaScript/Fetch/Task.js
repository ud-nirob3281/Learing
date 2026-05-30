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
