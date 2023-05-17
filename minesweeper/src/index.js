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
const field = document.getElementsByClassName('field');

const iconBurger = require('./assets/icons/burger.svg');
const MAPS = new Maps();

const fieldParams = {
  width: 10,
  height: 10,
  bombs: 10,
};

let isFirstClick = true;

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




// click to cell

function openedCell(element) {

  const corx = Number(element.dataset.corx);
  const cory = Number(element.dataset.cory);

  if (isFirstClick) {
    const width = fieldParams.width;
    const height = fieldParams.height;
    const bombs = fieldParams.bombs;
    const emptyX = corx + 1;
    const emptyY = cory + 1;    
    MAPS.generateMaps(width, height, bombs, emptyX, emptyY);
    isFirstClick = false;
  }

  const cellValue = MAPS.getValueFieldMap(corx, cory);

  element.classList.remove('cell_close');

  if (cellValue === 'B') {
    element.classList.add('cell_bomb');
  } else if (cellValue === 0) {
    element.classList.add('cell_num');
    console.log(cellValue)
  } else {
    element.classList.add('cell_num');
    element.textContent = cellValue;
  }




  



  
}

function flagedCell(element) {
  element.classList.toggle('cell_close');
  element.classList.toggle('cell_flag');
}

field[0].addEventListener('click', (event) => {
  event. preventDefault();
  if(!Object.values(event.target.classList).includes('cell_close')) return;  
  openedCell(event.target);
})

field[0].addEventListener('contextmenu', (event) => {
  event. preventDefault();
  const classArray = Object.values(event.target.classList);
  if(!classArray.includes('cell_close') && !classArray.includes('cell_flag')) return;  
  flagedCell(event.target);
})