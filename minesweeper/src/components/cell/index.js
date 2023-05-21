import './styles.scss';

export default class Cell {
  
  constructor(corX, corY) {
    this.cell = document.createElement('div');
    this.cell.setAttribute('data-corX', corX);
    this.cell.setAttribute('data-corY', corY);
    this.cell.classList.add('cell', 'cell_close');

    switch (localStorage.getItem('ily-level')) {
      case 'medium':
        this.cell.classList.add('cell_medium');
        break;
      case 'hard':
        this.cell.classList.add('cell_small');
        break;
      default:
        this.cell.classList.add('cell_large');
        break;
    }
  }

  

  getCell() {
    return this.cell;
  }
}