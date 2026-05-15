//* যেকনো CSS প্রপার্টি পরিবর্তন করতে চাইলে সেটি setProperty() মেথড ব্যবহার করতে হবে। এবং প্রথম প্যারামিটার হিসেবে CSS প্রপার্টির Varriable এর নাম এবং দ্বিতীয় প্যারামিটার হিসেবে নতুন মান দিতে হবে।
let btn = document.querySelector('button');

let yes = true;
let cloneStore;

btn.onclick = function run() {
  let btnx = document.querySelector('button');

  if (yes) {
    cloneStore = btnx.cloneNode(true);

    btnx.style.setProperty('--nirob', '90%');
    btnx.style.setProperty('--color', 'green');
    btnx.style.boxShadow =
      '0 0 10px red, 0 0 20px red, 0 0 40px red, 0 0 80px red,0 0 160px red';
    btnx.innerText = 'Why you clicked me?';
    btnx.style.transition = '0.5s';
  } else {
    let newCloneStore = cloneStore.cloneNode(true);
    newCloneStore.onclick = run;
    btnx.replaceWith(newCloneStore);
  }
  yes = !yes;
};
