export default function toggleMenu() {  
  const menu = document.querySelector('.menu');
  const burgerBtn = document.querySelector('.header__burger');
  const closeBtn = document.querySelector('.top-bar__close-btn');

  burgerBtn.addEventListener('click', () => {
    menu.classList.add('menu_open')
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('menu_open')
  });
}