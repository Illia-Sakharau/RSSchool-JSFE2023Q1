import './styles.scss';
import menu from './components/menu/index';
import createField from './components/createField/index';
import toggleMenu from './functions/toggleMeny';
import toggleTheme from './functions/toggleTheme';

const body = document.querySelector('body');
const wrapper = document.createElement('div');
const playzone = document.createElement('div');
const iconBurger = require('./assets/icons/burger.svg');


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
playzone.appendChild(createField(15,15));


wrapper.classList.add('wrapper');
wrapper.appendChild(menu);
wrapper.appendChild(playzone);

body.appendChild(wrapper);




// delete
const flag = document.querySelector('.cell[data-corx="5"]');
const bomb = document.querySelector('.cell[data-corx="6"]');
const num = document.querySelector('.cell[data-corx="7"]');

flag.className = 'cell cell_flag';
bomb.className = 'cell cell_bomb';
num.className = 'cell cell_num';
num.textContent = '1';
// delete

toggleMenu();
toggleTheme();

