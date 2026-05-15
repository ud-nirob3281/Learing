//!Copy to Clipboard
const textArea = document.getElementById('ta');
const button = document.getElementById('btn');
const result = document.getElementById('notify');

button.addEventListener('click', async () => {
  if (!navigator.clipboard) {
    console.log('Clipboard not suppot this Browser');
    return;
  }
  const text = textArea.value;
  await navigator.clipboard.writeText(text);
  //console.log(await navigator.clipboard.readText()); //Read Text
  result.innerText = 'Successfylly Copyed';
});
