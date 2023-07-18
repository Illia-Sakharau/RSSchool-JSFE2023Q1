import './styles/styles.scss';
import { router } from './router/router';

document.body.innerHTML = `<h1>123</h1><a class="link" href="#garage">garage</a></br><a class="link" href="#winners">Winners</a>`;

router();
//перенесте в хэдер
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement && target.className === 'link') {
    event.preventDefault();
    history.pushState(null, '', target.href);
    router();
  }
});
