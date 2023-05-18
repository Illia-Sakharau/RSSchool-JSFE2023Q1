import './styles.scss';
import menu from './components/menu/index';
import createField from './components/createField/index';
import toggleMenu from './functions/toggleMeny';
import toggleTheme from './functions/toggleTheme';
import selectLevel from './functions/selectLevel';
import Maps from './functions/generateMaps';
import winGame from './functions/winGame';
import loseGame from './functions/loseGame';

const body = document.querySelector('body');
const wrapper = document.createElement('div');
const playzone = document.createElement('div');
const field = document.getElementsByClassName('field');
const level = localStorage.getItem('ily-level');


const iconBurger = require('./assets/icons/burger.svg');


const fieldParams = {
  width: 10,
  height: 10,
  bombs: 10,
};

let isFirstClick = true;
let clicksCount = 0;
let flagCount = 0;
let stop = true;

if (level){
  switch (level) {
    case 'easy':
      fieldParams.width = 10;
      fieldParams.height = 10;
      fieldParams.bombs = 10;
      break;
    case 'medium':
      fieldParams.width = 15;
      fieldParams.height = 15;
      fieldParams.bombs = 2;
      break;
    case 'hard':
      fieldParams.width = 20;
      fieldParams.height = 20;
      fieldParams.bombs = 50;
      break;
  }
}

const MAPS = new Maps(fieldParams.width, fieldParams.height);

if (!localStorage.getItem('ily-results')) {
  localStorage.setItem('ily-results', JSON.stringify([]));
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

  if (cellValue === 'bomb') {
    element.classList.add('cell_bomb');
    loseGame(MAPS.getFieldMap());
  } else if (cellValue === 0) {
    element.classList.add('cell_num');
    MAPS.setValueOpenedCellsMap(corx, cory, 0);
    openEmptyCells(corx, cory);
  } else {
    element.classList.add('cell_num');
    element.textContent = cellValue;
    element.dataset.color = cellValue;
    MAPS.setValueOpenedCellsMap(corx, cory, MAPS.getValueFieldMap(corx, cory));
  }  

  if(stop && fieldParams.bombs === MAPS.getOpenedCellsMap().flat().reduce(
    (accumulator, currentValue) => (currentValue === null || currentValue === 'flag') ? accumulator + 1 : accumulator, 0)) {
      stop = false;
      winGame(level, clicksCount, '00:15');
    }
}


function openEmptyCells(corx, cory) {

  if (corx > 0 && cory > 0){
    const cell_1 = document.querySelector(`[data-corx="${corx-1}"][data-cory="${cory-1}"]`);
    if ((MAPS.getValueOpenedCellsMap(corx-1, cory-1) === null)){
      openedCell(cell_1);
    }
  }
  if (cory > 0){
    const cell_2 = document.querySelector(`[data-corx="${corx}"][data-cory="${cory-1}"]`);
    if ((MAPS.getValueOpenedCellsMap(corx, cory-1) === null)){
      openedCell(cell_2);
    }
  }
  if (corx < fieldParams.width - 1 && cory > 0){
    const cell_3 = document.querySelector(`[data-corx="${corx+1}"][data-cory="${cory-1}"]`);
    if ((MAPS.getValueOpenedCellsMap(corx+1, cory-1) === null)){
      openedCell(cell_3);
    }
  }
  
  if (corx > 0){
    const cell_4 = document.querySelector(`[data-corx="${corx-1}"][data-cory="${cory}"]`);
    if ((MAPS.getValueOpenedCellsMap(corx-1, cory) === null)){
      openedCell(cell_4);
    }
  }
  if (corx < fieldParams.width - 1){
    const cell_5 = document.querySelector(`[data-corx="${corx+1}"][data-cory="${cory}"]`);
    if ((MAPS.getValueOpenedCellsMap(corx+1, cory) === null)){
      openedCell(cell_5);
    }
  }

  if (corx > 0 && cory < fieldParams.height - 1){
    const cell_6 = document.querySelector(`[data-corx="${corx-1}"][data-cory="${cory+1}"]`);
    if ((MAPS.getValueOpenedCellsMap(corx-1, cory+1) === null)){
      openedCell(cell_6);
    }
  }
  if (cory < fieldParams.height - 1){
    const cell_7 = document.querySelector(`[data-corx="${corx}"][data-cory="${cory+1}"]`);
    if ((MAPS.getValueOpenedCellsMap(corx, cory+1) === null)){
      openedCell(cell_7);
    }
  }
  if (corx < fieldParams.width - 1 && cory < fieldParams.height - 1){
    const cell_8 = document.querySelector(`[data-corx="${corx+1}"][data-cory="${cory+1}"]`);
    if ((MAPS.getValueOpenedCellsMap(corx+1, cory+1) === null)){
      openedCell(cell_8);
    }
  }
}

function flagedCell(element) {
  const flagText = document.querySelector('#flags');
  if (flagCount === fieldParams.bombs) {
    window.alert(`The number of flags cannot exceed the number of bombs.\nThe set number of bombs for the current game is ${fieldParams.bombs}`);
  } else {
    const corx = Number(element.dataset.corx);
    const cory = Number(element.dataset.cory);

    if(MAPS.getValueOpenedCellsMap(corx, cory) === 'flag') {
      MAPS.setValueOpenedCellsMap(corx, cory, null)
    } else {
      MAPS.setValueOpenedCellsMap(corx, cory, 'flag')
    }

    element.classList.toggle('cell_close');
    element.classList.toggle('cell_flag');

    flagCount++;
    flagText.textContent = flagCount;
  }

  
}

field[0].addEventListener('click', (event) => {
  event. preventDefault();
  if(!Object.values(event.target.classList).includes('cell_close')) return;  
  const clicksText = document.querySelector('#clicks');
  clicksCount++;
  clicksText.textContent = clicksCount;
  openedCell(event.target);
})

field[0].addEventListener('contextmenu', (event) => {
  event. preventDefault();
  const classArray = Object.values(event.target.classList);
  if(!classArray.includes('cell_close') && !classArray.includes('cell_flag')) return;  
  flagedCell(event.target);
})