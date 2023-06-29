import { CURRENT_LEVEL, LEVELS_STATES } from '../../data/constants';
import winHandler from './winHandler';

export default () => {
  // [data-target="true"]
  const targetsElems = document.querySelectorAll('.target');
  const currentLevel = CURRENT_LEVEL.getLevel();
  let nextLvl = currentLevel < LEVELS_STATES.length - 1 ? currentLevel + 1 : 0;

  if (LEVELS_STATES.every((lvl) => !!lvl)) {
    winHandler();
  } else {
    while (LEVELS_STATES[nextLvl] !== null) {
      nextLvl = nextLvl < LEVELS_STATES.length - 1 ? nextLvl + 1 : 0;
    }
  }

  LEVELS_STATES[currentLevel] = 'completed';
  localStorage.setItem(`ily-level${currentLevel}`, 'completed');

  CURRENT_LEVEL.setCurentLvl(nextLvl);
  localStorage.setItem('ily-currentLvl', `${nextLvl}`);

  targetsElems.forEach((el) => el.classList.add('correctAnswer'));
  targetsElems[0].addEventListener(
    'animationend',
    () => {
      const levelChanget = new Event('levelChanget');
      document.dispatchEvent(levelChanget);
      return;
    },
    false,
  );
  return;
};
