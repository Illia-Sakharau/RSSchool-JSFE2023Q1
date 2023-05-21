import popup from '../components/popup/index';
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

  localStorage.setItem('ily-results', JSON.stringify(resultsList));

  document.body.appendChild(popup(`Hooray!`, `You found all mines in ${times} and ${clicks} moves!`, 'Play again', () => {location.reload()}));
}


