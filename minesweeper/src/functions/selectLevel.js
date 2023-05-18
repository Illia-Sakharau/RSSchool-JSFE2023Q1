export default function selectLevel() {
  const easyBtn = document.querySelector('#easy');
  const mediumBtn = document.querySelector('#medium');
  const hardBtn = document.querySelector('#hard');

  easyBtn.addEventListener('click', () => {
    localStorage.setItem('level', 'easy');
    location.reload();
  })
  mediumBtn.addEventListener('click', () => {
    localStorage.setItem('level', 'medium');
    location.reload();
  })
  hardBtn.addEventListener('click', () => {
    localStorage.setItem('level', 'hard');
    location.reload();
  })
}