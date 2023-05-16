import './styles.scss';

export default class Cell {
  constructor(corX, corY) {
    this.cell = document.createElement('div');
    this.cell.setAttribute('data-corX', corX);
    this.cell.setAttribute('data-corY', corY);
    this.cell.classList.add('cell', 'cell_close');
  }

  getCell() {
    return this.cell;
  }
}