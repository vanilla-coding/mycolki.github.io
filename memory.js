function removeSquareImg() {
  const $squareImgs = document.querySelectorAll('.square-img');
  $squareImgs.forEach((img) => img.parentNode.removeChild(img));
}