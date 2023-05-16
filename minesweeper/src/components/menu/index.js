import './styles.scss';
import results from '../results/index';
import topBar from '../topBar/index';
import createTextBtn from '../textBtn/index';

const menu = document.createElement('div');
const separator = document.createElement('hr');
menu.classList.add('menu');
separator.classList.add('menu__separator');


topBar.classList.add('menu__top-bar');
menu.appendChild(topBar);
menu.appendChild(createTextBtn('Easy'));
menu.appendChild(createTextBtn('Medium'));
menu.appendChild(createTextBtn('Hard'));
menu.appendChild(separator);
menu.appendChild(createTextBtn('Load'));
menu.appendChild(createTextBtn('Save'));
results.classList.add('menu__results');
menu.appendChild(results);

export default menu;