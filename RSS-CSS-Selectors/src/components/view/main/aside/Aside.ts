import './aside.scss';
import createElement from '../../../../utils/createElement';
import levels from '../../../../data/levels';
import { CURRENT_LEVEL, LEVELS_STATES } from '../../../../data/constants';
import resetLevelsHandler from '../../../function/resetLevelsHandler';

export default class Aside {
  private asideEl: HTMLElement = createElement({ tag: 'aside' });

  constructor() {
    // open/close aside meny
    document.addEventListener('toggleMenu', () => {
      this.asideEl.classList.toggle('visible');
    });
    document.addEventListener('closeMenu', () => {
      this.asideEl.classList.remove('visible');
    });

    //choose level
    this.asideEl.addEventListener('click', this.chooseLevelHandler);
  }

  public draw(): HTMLElement {
    const asideEl = this.asideEl;
    const title: HTMLElement = createElement({ tag: 'h6', content: 'Levels' });
    const levelWrapperel: HTMLElement = this.createLevelsList();
    const resetButtonEl: HTMLElement = createElement({ tag: 'button', classes: ['button'], content: 'Reset progress' });

    asideEl.innerHTML = '';
    resetButtonEl.addEventListener('click', resetLevelsHandler);
    asideEl.append(title, levelWrapperel, resetButtonEl);

    return asideEl;
  }

  private createLevelsList(): HTMLElement {
    const levelWrapperel: HTMLElement = createElement({ tag: 'div', classes: ['levels-wrapper'] });
    const currentLevel = CURRENT_LEVEL.getLevel();

    levels.forEach((_, ind) => {
      const classes = ['level-btn'];
      const state = LEVELS_STATES[ind];
      if (state) {
        classes.push(state);
      }
      if (currentLevel === ind) {
        classes.push('active');
      }
      const levelEl = createElement({ tag: 'button', classes: classes, content: `Level ${ind + 1}` });
      levelEl.dataset.level = `${ind}`;
      levelWrapperel.appendChild(levelEl);
    });
    return levelWrapperel;
  }

  private chooseLevelHandler(event: MouseEvent): void {
    const target = event.target;
    const closeMenu = new Event('closeMenu');
    const levelChanged = new Event('levelChanged');
    if (target instanceof HTMLElement) {
      const closest = target.closest('.level-btn');
      if (closest instanceof HTMLElement && closest.dataset.level !== `${CURRENT_LEVEL.getLevel()}`) {
        const nextLvl = Number(closest.dataset.level);
        CURRENT_LEVEL.setCurentLvl(nextLvl);
        localStorage.setItem('ily-currentLvl', `${nextLvl}`);
        document.dispatchEvent(levelChanged);
      }
      document.dispatchEvent(closeMenu);
    }
  }
}
