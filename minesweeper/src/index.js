import './styles.scss';
import menu from './components/menu/index';
import createField from './components/createField/index';

const body = document.querySelector('body');
const wrapper = document.createElement('div');
const playzone = document.createElement('div');

if (!localStorage.getItem('results')) {
  localStorage.setItem('results', JSON.stringify([]));
}

playzone.classList.add('playzone');
playzone.innerHTML = `
  <h1 class="playzone__title">Minesweeper</h1>
`;
playzone.appendChild(createField(10,10));


wrapper.classList.add('wrapper');
wrapper.appendChild(menu);
wrapper.appendChild(playzone);

body.appendChild(wrapper);



