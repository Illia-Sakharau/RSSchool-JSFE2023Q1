import './header.scss';
import htmlToElement from '../../utils/htmlToElement';
import createElement from '../../utils/createElement';
import logoImg from '../../assets/logo.svg';
import gitImg from '../../assets/github.svg';
import schoolLogoImg from '../../assets/rsslogo.svg';
import { ROUTES } from '../../data/constants';
// import { router } from '../../router/router';

function createLogo(): HTMLElement {
  const template: string = `<div class="logo">
      ${logoImg}
      <h1>async-race</h1>
    </div>
  `;
  const logoEl: HTMLElement = htmlToElement(template);

  return logoEl;
}

function createMenu(activeLinkText: string): HTMLElement {
  const menuEl: HTMLElement = createElement({ tag: 'nav', classes: ['menu'] });
  ROUTES.forEach((route) => {
    const classes = activeLinkText === route.text ? ['menu__link', 'menu__link_active'] : ['menu__link'];
    const linkEl: HTMLElement = createElement({ tag: 'a', classes, content: route.text });
    linkEl.setAttribute('href', route.path);
    menuEl.append(linkEl);
  });

  // menuEl.addEventListener('click', (event) => {
  //   const target = event.target;
  //   if (target instanceof HTMLAnchorElement && target.className === 'menu__link') {
  //     event.preventDefault();
  //     history.pushState(null, '', target.href);
  //     router();
  //   }
  // });

  return menuEl;
}

function createInfo(): HTMLElement {
  const template: string = `<div class="info">
      <a href="https://rs.school/js/" target="_blank" class="info__school">
        ${schoolLogoImg}
      </a>
      <div class="info__wrapper">
        <a href="https://github.com/Illia-Sakharau" target="_blank" class="info__author">
          ${gitImg}
          <span>Illia Sakharau</span>
        </a>        
        <div class="info__copyright">
          © 2023
        </div>
      </div>
    </div>
    `;
  const infoEl: HTMLElement = htmlToElement(template);

  return infoEl;
}

export default function createHeader(activeLinkText: string): HTMLElement {
  const headerEl: HTMLElement = createElement({ tag: 'header', classes: ['header'] });
  const logoEl: HTMLElement = createLogo();
  const menuEl: HTMLElement = createMenu(activeLinkText);
  const infoEl: HTMLElement = createInfo();

  logoEl.classList.add('header__logo');
  menuEl.classList.add('header__menu');
  infoEl.classList.add('header__info');

  headerEl.append(logoEl, menuEl, infoEl);

  return headerEl;
}
