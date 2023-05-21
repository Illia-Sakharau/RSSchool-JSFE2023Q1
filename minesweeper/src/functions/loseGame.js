import popup from '../components/popup/index';
import audioLoseResource from '../assets/sounds/lose.mp3';

const audioLoseGame = new Audio(audioLoseResource);

export default function loseGame(map, bombSound) {
  if (localStorage.getItem('ily-sound') === 'on') {
    audioLoseGame.play();
  }

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
      clearInterval(openBomb);
      document.body.appendChild(popup(`Game over!`, false, 'Try again', () => {location.reload()}));
    }
    
  }, 1000/bombCells.length);
}