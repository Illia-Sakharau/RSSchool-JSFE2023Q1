import './styles.scss';
import Cell from '../cell/index'


export default function createField(x, y, bombs) {
  const area = document.createElement('div');
  const statBar = document.createElement('div');
  const field = document.createElement('div');

  const iconClick = require('../../assets/icons/click.svg');
  const iconClock = require('../../assets/icons/clock.svg');
  const iconBomb = require('../../assets/icons/bomb.svg');
  const iconFlag = require('../../assets/icons/flag.svg');

  area.classList.add('area');
  statBar.classList.add('stat-bar');
  field.classList.add('field');


  statBar.innerHTML = `
    <div class="stat-bar__line">
      <div class="stat-bar__item">
        ${iconFlag}
        <span class="stat-bar__text" id="flags">0</span>
      </div>
      <div class="stat-bar__item">
        ${iconClick}
        <span class="stat-bar__text" id="clicks">0</span>
      </div>
      <div class="stat-bar__item">
        ${iconClock}
        <span class="stat-bar__text" id="times">00 : 00</span>
      </div>
    </div>
    <div class="stat-bar__line">
      <div class="stat-bar__item">
        ${iconBomb}
        <span class="stat-bar__text" id="bomb">${bombs}</span>
        <input type="range" min="10" max="99" step="1" value="${bombs}" class="stat-bar__input" id="bombRange">
      </div>
      
      <button class="stat-bar__button">
        Restart
      </button>
    </div>
  `

  for (let i = 0; i < x; i++) {
    const fieldLine = document.createElement('div');
    fieldLine.classList.add('field__line');
    for (let j = 0; j < y; j++){
      const newCell = new Cell(j, i);
      const cell = newCell.getCell();

      fieldLine.appendChild(cell);
    }
    field.appendChild(fieldLine);
  }

  area.appendChild(statBar);
  area.appendChild(field);

  return area;
}