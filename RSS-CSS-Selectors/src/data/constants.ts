import createrCurentLevel from './createrCurentLevel';
import levels from './levels';

export const CURRENT_LEVEL = new createrCurentLevel(Number(localStorage.getItem('ily-currentLvl')));
export const LEVELS_STATES = levels.map((_, ind) => localStorage.getItem(`ily-level${ind}`));
