import { LEVELS_STATES } from '../../data/constants';

export default () => {
  localStorage.clear();
  LEVELS_STATES.fill(null);
  const levelChanget = new Event('levelChanget');
  document.dispatchEvent(levelChanget);
};
