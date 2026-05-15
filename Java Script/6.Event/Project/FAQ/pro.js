const main = document.querySelector('.faq');
main.addEventListener('click', e => {
  if (e.target.classList.contains('question')) {
    e.stopPropagation();
    let parent = e.target.parentNode;
    console.log(parent);
    //console.log(e.target);

    let ansChild = parent.querySelector('.answer');

    ansChild.classList.toggle('show');
  }
});

//Way-2 js
document.addEventListener('click', e => {
  const ans = document.querySelectorAll('.answer');
  ans.forEach(re => re.classList.remove('show'));
  console.log(ans);
});
