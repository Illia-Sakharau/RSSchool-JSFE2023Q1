import { parserMapToArray } from '../components/function/parsers';
import { ICurrentLevel } from '../types/types';
import levels from './levels';

export default class {
  private curentLvlInfo: ICurrentLevel = {
    currentLevel: 0,
    map: [],
    description: '',
    answer: '',
    htmlMap: '',
  };
  constructor(private currentLvl: number) {
    this.setCurentLvl(currentLvl);
  }
  public setCurentLvl(currentLvl: number) {
    this.currentLvl = currentLvl;
    this.setCurrentLvlInfo(currentLvl);
  }
  private setCurrentLvlInfo(currentLvl: number) {
    this.curentLvlInfo.currentLevel = currentLvl;
    this.curentLvlInfo.map = parserMapToArray(levels[currentLvl].htmlMap);
    this.curentLvlInfo.description = levels[currentLvl].description;
    this.curentLvlInfo.answer = levels[currentLvl].answer;
    this.curentLvlInfo.htmlMap = levels[currentLvl].htmlMap;
  }
  public getAllInfo() {
    return this.curentLvlInfo;
  }
  public getLevel() {
    return this.curentLvlInfo.currentLevel;
  }
  public getMap() {
    return this.curentLvlInfo.map;
  }
  public getDescription() {
    return this.curentLvlInfo.description;
  }
  public getHtmlMap() {
    return this.curentLvlInfo.htmlMap;
  }
  public getAnswer() {
    return this.curentLvlInfo.answer;
  }
}
