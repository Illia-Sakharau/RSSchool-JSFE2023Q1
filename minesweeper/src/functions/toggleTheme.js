export default function toggleTheme() {
  const themeBtn = document.querySelector('.top-bar__theme-btn');

  const menu = document.querySelector('.menu');
  const area = document.querySelector('.area');
  
  themeBtn.addEventListener('click', () => {
    menu.classList.toggle('menu_light'); 
    area.classList.toggle('area_light');

  });
}