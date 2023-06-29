import './aside.scss';
import createElement from '../../../../utils/createElement';
import levels from '../../../../data/levels';
import { CURRENT_LEVEL, LEVELS_STATES } from '../../../../data/constants';

export default class Aside {
  public draw(): HTMLElement {
    const asideEl: HTMLElement = createElement({ tag: 'aside' });
    const title: HTMLElement = createElement({ tag: 'h6', content: 'Levels' });
    const levelWrapperel: HTMLElement = createElement({ tag: 'div', classes: ['levels-wrapper'] });
    const buttonEl: HTMLElement = createElement({ tag: 'button', classes: ['button'], content: 'Reset progress' });

    const currentLevel = CURRENT_LEVEL.getLevel();

    asideEl.appendChild(title);

    levels.forEach((_, ind) => {
      const classes = ['level-btn'];
      const state = LEVELS_STATES[ind];

      if (state) classes.push(state);
      if (currentLevel === ind) classes.push('active');

      const levelEl = createElement({ tag: 'button', classes: classes, content: `Level ${ind + 1}` });
      levelEl.dataset.level = `${ind}`;
      levelWrapperel.appendChild(levelEl);
    });
    asideEl.appendChild(levelWrapperel);

    buttonEl.addEventListener('click', () => console.log(`Reset progress`));
    asideEl.appendChild(buttonEl);

    // open/close aside meny
    document.addEventListener('toggleMenu', () => {
      asideEl.classList.toggle('visible');
    });
    document.addEventListener('closeMenu', () => {
      asideEl.classList.remove('visible');
    });

    //choose level
    asideEl.addEventListener('click', (event: MouseEvent): void => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const closest = target.closest('.level-btn');
        if (closest instanceof HTMLElement) {
          if (closest.dataset.level !== `${CURRENT_LEVEL.getLevel()}`) {
            const nextLvl = Number(closest.dataset.level);
            CURRENT_LEVEL.setCurentLvl(nextLvl);
            localStorage.setItem('ily-currentLvl', `${nextLvl}`);
            const levelChanget = new Event('levelChanget');
            document.dispatchEvent(levelChanget);
          }
          const toggleMenu = new Event('closeMenu');
          document.dispatchEvent(toggleMenu);
        }
      }
    });

    return asideEl;
  }
}
