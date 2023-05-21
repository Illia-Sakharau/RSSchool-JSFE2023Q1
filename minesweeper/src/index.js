import './styles.scss';
import menu from './components/menu/index';
import createField from './components/createField/index';
import popup from './components/popup/index';
import toggleMenu from './functions/toggleMeny';
import {setTheme, toggleTheme} from './functions/toggleTheme';
import selectLevel from './functions/selectLevel';
import Maps from './functions/generateMaps';
import winGame from './functions/winGame';
import loseGame from './functions/loseGame';
import changeBombCount from './functions/changeBombCount';
import toggleSound from './functions/toggleSound';
import saveGame from './functions/saveGame';
import loadGame from './functions/loadGame';

import audioClickResource from './assets/sounds/click1.mp3';
import audioFlagResource from './assets/sounds/flag.wav';
import audioBombResource from './assets/sounds/bomb1.mp3';
import audioEmptyResource from './assets/sounds/empty.mp3';

const body = document.querySelector('body');
const wrapper = document.createElement('div');
const playzone = document.createElement('div');
const field = document.getElementsByClassName('field');
const restartBtn = document.getElementsByClassName('stat-bar__button');

const audioClick = new Audio(audioClickResource);
const audioFlag = new Audio(audioFlagResource);
const audioBomb = new Audio(audioBombResource);
const audioEmpty = new Audio(audioEmptyResource);

const iconBurger = require('./assets/icons/burger.svg');

const fieldParams = {
  width: 10,
  height: 10,
  bombs: 10,
};

let level = localStorage.getItem('ily-level');
let isFirstClick = true;
let clicksCount = 0;
let flagCount = 0;
let imagineBombCount;
let stop = true;
let timer;
let timePassed = 0;

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
      fieldParams.bombs = 35;
      break;
    case 'hard':
      fieldParams.width = 25;
      fieldParams.height = 25;
      fieldParams.bombs = 99;
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
playzone.appendChild(createField(fieldParams.height, fieldParams.width, fieldParams.bombs));
wrapper.classList.add('wrapper');
wrapper.appendChild(menu);
wrapper.appendChild(playzone);
body.appendChild(wrapper);




toggleMenu();
setTheme();
toggleTheme();
selectLevel();
changeBombCount();
toggleSound();




// click to cell

function openedCell(element) {

  const corx = Number(element.dataset.corx);
  const cory = Number(element.dataset.cory);
  

  if (isFirstClick) {
    fieldParams.bombs = +document.querySelector('#bombRange').value;
    const width = fieldParams.width;
    const height = fieldParams.height;
    const bombs = fieldParams.bombs;
    const emptyX = corx + 1;
    const emptyY = cory + 1;    
    MAPS.generateMaps(width, height, bombs, emptyX, emptyY);

    isFirstClick = false;

    clearInterval(timer);
    timer = setInterval(() => {
      const timerText = document.querySelector('#times');
      let sec = timePassed % 60;
      let min = (timePassed - sec)/60;
      if (sec < 10) sec = '0'+ sec;
      if (min < 10) min = '0'+ min;
      timerText.textContent = `${min} : ${sec}`;
      timePassed++;
    },1000);

    document.querySelector('#bombRange').classList.add('stat-bar__input_unvisible');
    restartBtn[0].classList.add('stat-bar__button_visible');
    imagineBombCount = document.querySelector('#bombRange').value - MAPS.getOpenedCellsMap().flat().reduce(
      (accumulator, currentValue) => (currentValue === 'flag') ? accumulator + 1 : accumulator, 0);
    document.querySelector('#bomb').textContent = imagineBombCount;
  }

  const cellValue = MAPS.getValueFieldMap(corx, cory);

  element.classList.remove('cell_close');

  if (cellValue === 'bomb') {
    if (localStorage.getItem('ily-sound') === 'on') {
      audioBomb.currentTime = 0;
      audioBomb.play();
    }    
    element.classList.add('cell_bomb');
    loseGame(MAPS.getFieldMap(), audioBomb);
  } else if (cellValue === 0) {
    if (localStorage.getItem('ily-sound') === 'on') {
      audioEmpty.currentTime = 0;
      audioEmpty.play();
    }
    element.classList.add('cell_num');
    MAPS.setValueOpenedCellsMap(corx, cory, 0);
    openEmptyCells(corx, cory);
  } else {
    if (localStorage.getItem('ily-sound') === 'on') {
      audioClick.currentTime = 0;
      audioClick.play();
    }
    element.classList.add('cell_num');
    element.textContent = cellValue;
    element.dataset.color = cellValue;
    MAPS.setValueOpenedCellsMap(corx, cory, MAPS.getValueFieldMap(corx, cory));
  }  

  
  if(stop && fieldParams.bombs === MAPS.getOpenedCellsMap().flat().reduce(
    (accumulator, currentValue) => (currentValue === null || currentValue === 'flag') ? accumulator + 1 : accumulator, 0)) {
      stop = false;
      clearInterval(timer);
      const sec = (timePassed % 60 < 10) ? '0' + timePassed % 60 : timePassed % 60;
      const min = ((timePassed - sec)/60 < 10) ? '0' + (timePassed - sec)/60 : (timePassed - sec)/60;
      winGame(level, clicksCount, `${min}:${sec}`);
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
  const bombText = document.querySelector('#bomb');
  if (flagCount === fieldParams.bombs) {
    body.appendChild(popup(`Number of flags cannot exceed the number of bombs.`, `Set number of bombs for the current game is ${fieldParams.bombs}.`, 'Ok'));
  } else {
    if (localStorage.getItem('ily-sound') === 'on') {
      audioFlag.currentTime = 0;
      audioFlag.play();
    }
    const corx = Number(element.dataset.corx);
    const cory = Number(element.dataset.cory);

    if(MAPS.getValueOpenedCellsMap(corx, cory) === 'flag') {
      MAPS.setValueOpenedCellsMap(corx, cory, null);
      flagCount--;
      imagineBombCount++;
    } else {
      MAPS.setValueOpenedCellsMap(corx, cory, 'flag');
      flagCount++;
      imagineBombCount--;
    }

    element.classList.toggle('cell_close');
    element.classList.toggle('cell_flag');

    
    flagText.textContent = flagCount;
    if (!isFirstClick){
      bombText.textContent = imagineBombCount;
    }
    

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

// restart without reload page
restartBtn[0].addEventListener('click', () => {
  isFirstClick = true;
  clicksCount = 0;
  flagCount = 0;
  imagineBombCount = fieldParams.bombs;
  stop = true;
  
  clearInterval(timer);
  timePassed = 0;

  field[0].textContent = '';
  field[0].innerHTML = createField(fieldParams.height, fieldParams.width, fieldParams.bombs).querySelector('.field').innerHTML;

  MAPS.generateClearOpenedCellsMap(fieldParams.height, fieldParams.width);
  document.querySelector('#bombRange').classList.remove('stat-bar__input_unvisible');
  restartBtn[0].classList.remove('stat-bar__button_visible');
  
  document.querySelector('#flags').textContent = flagCount;
  document.querySelector('#bomb').textContent = fieldParams.bombs;
  document.querySelector('#clicks').textContent = clicksCount;
  document.querySelector('#times').textContent = '00 : 00';
})


// save game
const saveBtn = document.querySelector('#save');
saveBtn.addEventListener('click', () => {
  saveGame(isFirstClick, flagCount, clicksCount, timePassed, fieldParams, MAPS.getBombMap(), MAPS.getFieldMap(), MAPS.getOpenedCellsMap());
})

//load game
const loadBtn = document.querySelector('#load');
loadBtn.addEventListener('click', () => {
  const gameInfo = loadGame();
  if (gameInfo) {
    fieldParams.bombs = gameInfo.fieldParams.bombs;
    fieldParams.width = gameInfo.fieldParams.width;
    fieldParams.height = gameInfo.fieldParams.height;
    
    isFirstClick = false;
    clicksCount = gameInfo.clicks;
    flagCount = gameInfo.flags;
    imagineBombCount = fieldParams.bombs - flagCount;
    timePassed = gameInfo.time;
    level = gameInfo.level;
    localStorage.setItem('ily-level', gameInfo.level);

    

    MAPS.setBombMap(gameInfo.bombMap);
    MAPS.setFieldMap(gameInfo.fieldMap);
    MAPS.setOpenedCellsMap(gameInfo.openedCellsMap);

    clearInterval(timer);
    timer = setInterval(() => {
      const timerText = document.querySelector('#times');
      let sec = timePassed % 60;
      let min = (timePassed - sec)/60;
      if (sec < 10) sec = '0'+ sec;
      if (min < 10) min = '0'+ min;
      timerText.textContent = `${min} : ${sec}`;
      timePassed++;
    },1000);
  }
  
})
