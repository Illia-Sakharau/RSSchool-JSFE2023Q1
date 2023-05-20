import audioWinResource from '../assets/sounds/win.wav';
const audioWinGame = new Audio(audioWinResource);

  

export default function winGame(level, clicks, times) {
  const resultsList = JSON.parse(localStorage.getItem('ily-results'));
  const resultValue = {
    level: level,
    clicks: clicks,
    times: times,
  };

  if (localStorage.getItem('ily-sound') === 'on') {
    audioWinGame.play();
  }

  resultsList.push(resultValue);
  if (resultsList.length > 10) {
    resultsList.shift();
  }

  localStorage.setItem('ily-results', JSON.stringify(resultsList))





  setTimeout(() => {
    window.alert("You Win! Play again!");
    location.reload();
  }, 100)
  
  
}


