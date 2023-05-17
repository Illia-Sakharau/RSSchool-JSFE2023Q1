import './styles.scss';
import Cell from '../cell/index'


export default function createField(x, y) {
  const area = document.createElement('div');
  const statBar = document.createElement('div');
  const field = document.createElement('div');

  const iconClick = require('../../assets/icons/click.svg');
  const iconClock = require('../../assets/icons/clock.svg');

  area.classList.add('area');
  statBar.classList.add('stat-bar');
  field.classList.add('field');


  statBar.innerHTML = `
    <div class="stat-bar__item">
      ${iconClick}
      <span class="stat-bar__text" id="clicks">0</span>
    </div>
    <div class="stat-bar__item">
      ${iconClock}
      <span class="stat-bar__text" id="clicks">00 : 00</span>
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