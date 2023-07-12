import { LEVELS_STATES } from '../../data/constants';

export default () => {
  localStorage.clear();
  LEVELS_STATES.fill(null);
  const levelChanged = new Event('levelChanged');
  document.dispatchEvent(levelChanged);
};
