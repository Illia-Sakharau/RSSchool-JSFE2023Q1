import './styles.scss';
import menu from './components/menu/index';
import createField from './components/createField/index';
import toggleMenu from './functions/toggleMeny';
import toggleTheme from './functions/toggleTheme';
import selectLevel from './functions/selectLevel';
import Maps from './functions/generateMaps';

const body = document.querySelector('body');
const wrapper = document.createElement('div');
const playzone = document.createElement('div');
const iconBurger = require('./assets/icons/burger.svg');
const maps = new Maps(5,5,10,3,1);

maps.getBombMap();

const fieldParams = {
  width: 10,
  height: 10,
  bombs: 10,
};

if (localStorage.getItem('level')){
  switch (localStorage.getItem('level')) {
    case 'easy':
      fieldParams.width = 10;
      fieldParams.height = 10;
      fieldParams.bombs = 10;
      break;
    case 'medium':
      fieldParams.width = 15;
      fieldParams.height = 15;
      fieldParams.bombs = 25;
      break;
    case 'hard':
      fieldParams.width = 20;
      fieldParams.height = 20;
      fieldParams.bombs = 50;
      break;
  }
}

if (!localStorage.getItem('results')) {
  localStorage.setItem('results', JSON.stringify([]));
}

playzone.classList.add('playzone');

playzone.innerHTML = `
  <header class="header">
    <h1 class="header__title">Minesweeper</h1>
    <button class="header__burger">
      ${iconBurger}
    </button>
  </header>
`;
playzone.appendChild(createField(fieldParams.height, fieldParams.width));


wrapper.classList.add('wrapper');
wrapper.appendChild(menu);
wrapper.appendChild(playzone);

body.appendChild(wrapper);




toggleMenu();
toggleTheme();
selectLevel();

