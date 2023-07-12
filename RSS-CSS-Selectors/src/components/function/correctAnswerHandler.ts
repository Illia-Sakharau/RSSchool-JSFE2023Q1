import { CURRENT_LEVEL, LEVELS_STATES } from '../../data/constants';
import winHandler from './winHandler';

export default () => {
  const targetsElems = document.querySelectorAll('.target');
  const currentLevel = CURRENT_LEVEL.getLevel();
  let nextLvl = currentLevel < LEVELS_STATES.length - 1 ? currentLevel + 1 : 0;
  let isWin = false;

  if (!LEVELS_STATES[currentLevel]) {
    LEVELS_STATES[currentLevel] = 'completed';
    localStorage.setItem(`ily-level${currentLevel}`, 'completed');
  }

  if (LEVELS_STATES.every((lvl) => !!lvl)) {
    isWin = true;
  } else {
    while (LEVELS_STATES[nextLvl] !== null) {
      nextLvl = nextLvl < LEVELS_STATES.length - 1 ? nextLvl + 1 : 0;
    }
  }

  CURRENT_LEVEL.setCurentLvl(nextLvl);
  localStorage.setItem('ily-currentLvl', `${nextLvl}`);

  targetsElems.forEach((el) => el.classList.add('correctAnswer'));
  targetsElems[0].addEventListener(
    'animationend',
    () => {
      if (isWin) winHandler();
      const levelChanged = new Event('levelChanged');
      document.dispatchEvent(levelChanged);
      return;
    },
    false,
  );
};
