import './styles.scss';
import menu from './components/menu/index' 

const body = document.querySelector('body');
const wrapper = document.createElement('div');

if (!localStorage.getItem('results')) {
  localStorage.setItem('results', JSON.stringify([]));
}

wrapper.classList.add('wrapper');
wrapper.appendChild(menu);

body.appendChild(wrapper);