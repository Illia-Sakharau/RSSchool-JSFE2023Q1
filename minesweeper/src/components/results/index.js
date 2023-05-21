import './styles.scss';


const resultsValue = JSON.parse(localStorage.getItem('ily-results'));

const results = document.createElement('div');
results.classList.add('results');

results.innerHTML = '<h3 class="results__title">Latest 10 results:</h3>';

if (resultsValue) {
  for (let i = 1; i <= 10; i++){
    if (resultsValue[i-1]){
      results.appendChild(createRow(i, resultsValue[i-1].level, resultsValue[i-1].clicks, resultsValue[i-1].times));
    } else {
      results.appendChild(createRow(i, '---', '---', '---'));
    }  
  }
} else {
  for (let i = 1; i <= 10; i++){
    results.appendChild(createRow(i, '---', '---', '---'));
  }
}


function createRow(pos, level, clicks, time) {
  const iconLevel = require('../../assets/icons/level.svg');
  const iconClick = require('../../assets/icons/click.svg');
  const iconClock = require('../../assets/icons/clock.svg');

  const row = document.createElement('div'); 

  const template = `
    <div class="results__pos">${pos}</div>
    <div class="results__item">
      <div class="results__icon">${iconLevel}</div>
      <div class="results__text">${level}</div>
    </div>
    <div class="results__item">
      <div class="results__icon">${iconClick}</div>
      <div class="results__text">${clicks}</div>
    </div>
    <div class="results__item">
      <div class="results__icon">${iconClock}</div>
      <div class="results__text">${time}</div>
    </div>
  `

  row.classList.add('results__row');  

  row.innerHTML = template;

  return row;
};

export default results;