import './styles.scss';
import results from '../results/index';
import topBar from '../topBar/index';

const menu = document.createElement('div');
menu.classList.add('menu');

menu.appendChild(topBar);
menu.appendChild(results);

export default menu;