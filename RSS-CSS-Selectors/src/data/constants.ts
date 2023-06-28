import createrCurentLevel from './createrCurentLevel';

export const CURRENT_LEVEL = new createrCurentLevel(Number(localStorage.getItem('ily-currentLvl')));
