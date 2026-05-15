const tabHead = document.querySelector('.tab-headers');
const contentHead = document.querySelectorAll('.content');

tabHead.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    tabHead
      .querySelectorAll('button')
      .forEach(btn => btn.classList.remove('activeColor'));

    e.target.classList.add('activeColor');
    console.log(`Tab changed to: ${e.target.textContent}`);

    contentHead.forEach(value => {
      if (value.id === e.target.id) {
        value.classList.add('active');
      } else {
        value.classList.remove('active');
      }
    });
  }
});

document.addEventListener('keypress', e => {
  tabHead.querySelectorAll('button').forEach(btn => {
    if (e.key === btn.id) {
      btn.click();
    }
  });
});

/* contentHead.forEach(val => {
  tabHead.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      if (val.id === e.target.id) {
        val.classList.add('active');
        e.target.classList.add('activeColor');
      } else {
        val.classList.remove('active');
        e.target.classList.remove('activeColor');
      }
      console.log(val.id);
      console.log(e.target.id);
    }
  });
}); */
