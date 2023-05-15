import './styles.scss';
import results from '../results/index' 

const menu = document.createElement('div');
menu.classList.add('menu');

menu.appendChild(results);

export default menu;