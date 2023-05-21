import createField from '../components/createField/index';
import popup from '../components/popup/index';

export default function loadGame(map) {
  const saveGame = localStorage.getItem('ily-save');
  const flagsText = document.querySelector('#flags');
  const clicksText = document.querySelector('#clicks');
  const bombsText = document.querySelector('#bomb');
  const bombRange = document.querySelector('#bombRange');
  const restartBtn = document.querySelector('.stat-bar__button');
  const field = document.querySelector('.field');
    
  if (saveGame) {
    const gameInfo = JSON.parse(saveGame);

    flagsText.textContent = gameInfo.flags;
    clicksText.textContent = gameInfo.clicks;
    bombsText.textContent = gameInfo.fieldParams.bombs - gameInfo.flags;

    bombRange.classList.add('stat-bar__input_unvisible');
    restartBtn.classList.add('stat-bar__button_visible');

    field.textContent = '';
    field.innerHTML = createField(gameInfo.fieldParams.height, gameInfo.fieldParams.width, gameInfo.fieldParams.bombs).querySelector('.field').innerHTML;

    gameInfo.openedCellsMap.forEach((row, indX) => {
      row.forEach((cellValue, indY) => {
        const cell = document.querySelector(`[data-corx="${indX}"][data-cory="${indY}"]`);

        if (cellValue === null) {
          cell.classList.add('cell_close');
        } else if (cellValue === 'flag') {
          cell.classList.add('cell_flag');
        } else if (cellValue === 0) {
          cell.classList.add('cell_num');
        } else {
          cell.classList.add('cell_num');
          cell.textContent = cellValue;
          cell.dataset.color = cellValue;
        }  
        
      });
    });

    return gameInfo;
  } else {
    document.body.appendChild(popup(`You don't have any saved games!`, false, 'Ok'));
    return false;
  }
  
}
