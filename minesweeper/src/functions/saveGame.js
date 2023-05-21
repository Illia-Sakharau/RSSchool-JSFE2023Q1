import popup from '../components/popup/index';

export default function saveGame(isFirstClick,flags, clicks, time, fieldParams, bombMap, fieldMap, openedCellsMap) {
  
  if (isFirstClick) {
    document.body.appendChild(popup(`Start the game to save!`, false, 'Ok'));
  } else {
    const gameInfo = {
      level: localStorage.getItem('ily-level'),
      flags: flags,
      clicks: clicks,
      time: time,
      fieldParams: fieldParams,
      bombMap: bombMap,
      fieldMap: fieldMap,
      openedCellsMap: openedCellsMap,
    }
    localStorage.setItem('ily-save', JSON.stringify(gameInfo));

    document.body.appendChild(popup(`The game is saved!`, false, 'Ok'));
  }
  
}