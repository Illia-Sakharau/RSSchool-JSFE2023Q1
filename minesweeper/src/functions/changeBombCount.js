export default function changeBombCount() {
  const bombRangeElem = document.querySelector('#bombRange');
  const bombTextElem = document.querySelector('#bomb');

  bombRangeElem.addEventListener('input', () => {
    bombTextElem.textContent = bombRangeElem.value;
  })
}