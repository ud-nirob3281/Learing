export async function download(filePath) {
  const response = await fetch(filePath);
  const data = await response.blob();
  const ObjUrl = URL.createObjectURL(data);

  let crea = document.createElement('a');
  crea.href = ObjUrl;
  crea.download = 'LMS Code Base';
  setTimeout(() => crea.click(), 1000);
}
