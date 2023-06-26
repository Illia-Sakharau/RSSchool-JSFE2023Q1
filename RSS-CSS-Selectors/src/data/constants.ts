import { parserMapToArray } from '../components/parser/parsers';
import levels from './levels';

export const LEVEL_INFO = {
  currentLevel: 0,
  map: parserMapToArray(levels[0].htmlMap),
};
