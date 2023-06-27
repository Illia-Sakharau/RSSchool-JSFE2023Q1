import { parserMapToArray } from '../components/parser/parsers';
import { ICurrentLevel } from '../types/types';
import levels from './levels';

export const CURRENT_LEVEL_INFO: ICurrentLevel = {
  currentLevel: Number(localStorage.getItem('ily-currentLvl')),
  ...levels[Number(localStorage.getItem('ily-currentLvl'))],
  map: parserMapToArray(levels[Number(localStorage.getItem('ily-currentLvl'))].htmlMap),
};
