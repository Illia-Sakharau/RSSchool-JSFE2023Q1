import './aside.scss';
import createElement from '../../../../utils/createElement';
import levels from '../../../../data/levels';

export default class Aside {
  public draw(): HTMLElement {
    const asideEl: HTMLElement = createElement({ tag: 'aside' });
    const title: HTMLElement = createElement({ tag: 'h6', content: 'Levels' });
    const levelWrapperel: HTMLElement = createElement({ tag: 'div', classes: ['levels-wrapper'] });
    const buttonEl: HTMLElement = createElement({ tag: 'button', classes: ['button'], content: 'Reset progress' });

    const activeLevel = localStorage.getItem(`ily-active`) || 0;

    asideEl.appendChild(title);

    levels.forEach((lev, ind) => {
      const classes = ['level-btn'];
      const state = localStorage.getItem(`ily-level${ind}`);
      if (state) {
        classes.push(state);
      }
      if (+activeLevel === ind) {
        classes.push('active');
      }
      const levelEl = createElement({ tag: 'button', classes: classes, content: `Level ${ind + 1}` });
      levelWrapperel.appendChild(levelEl);

      levelEl.addEventListener('click', () => console.log(`Level ${ind + 1}`));
    });
    asideEl.appendChild(levelWrapperel);

    buttonEl.addEventListener('click', () => console.log(`Reset progress`));
    asideEl.appendChild(buttonEl);

    // open/close aside meny
    document.addEventListener('toggleMenu', () => {
      console.log(asideEl);
      asideEl.classList.toggle('visible');
    });

    return asideEl;
  }
}
