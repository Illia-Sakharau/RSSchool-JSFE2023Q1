export {setTheme, toggleTheme};

function setTheme() {
  const menu = document.querySelector('.menu');
  const area = document.querySelector('.area');

  if (localStorage.getItem('ily-theme') === 'light') {
    menu.classList.add('menu_light');
    area.classList.add('area_light');
  } else {
    menu.classList.remove('menu_light');
    area.classList.remove('area_light');
    
  }
}

function toggleTheme() {  
  const themeBtn = document.querySelector('.top-bar__theme-btn');
  const menu = document.querySelector('.menu');
  const area = document.querySelector('.area');

  themeBtn.addEventListener('click', () => {
    menu.classList.toggle('menu_light'); 
    area.classList.toggle('area_light');

    if (localStorage.getItem('ily-theme') === 'dark') {
      localStorage.setItem('ily-theme', 'light');
    } else {
      localStorage.setItem('ily-theme', 'dark');
    }
  });
}
