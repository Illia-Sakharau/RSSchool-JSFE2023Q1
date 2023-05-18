export default function loseGame(map) {

  const bombCells = [];

  map.forEach((subarray, i) => {
    subarray.forEach((cell, j) => {
      if (cell === 'bomb') { 
        bombCells.push([i, j]);
      }
    })
  });

  const openBomb = setInterval(() => {

    const bombCell = document.querySelector(`[data-corx="${bombCells[0][0]}"][data-cory="${bombCells[0][1]}"]`);
    bombCell.classList.remove('cell_close', 'cell_flag');
    bombCell.classList.add('cell_bomb');
    bombCells.shift();
    if (bombCells.length === 0) {
      // window.alert("You lose! Try again!");
      clearInterval(openBomb);
      // location.reload();
    }
    
  }, 1000/bombCells.length);
}