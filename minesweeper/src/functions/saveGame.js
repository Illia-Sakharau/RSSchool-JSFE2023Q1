export default function saveGame(isFirstClick,flags, clicks, time, fieldParams, bombMap, fieldMap, openedCellsMap) {
  
  if (isFirstClick) {
    window.alert("Start the game to save!");
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

    window.alert("The game is saved!");
  }
  
}