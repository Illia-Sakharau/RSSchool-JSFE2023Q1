export interface ILevels {
  title: string;
  answer: string;
  htmlMap: string;
  selector: string;
  linkToInfo: string;
}
export interface ICurrentLevel extends ILevels {
  currentLevel: number;
  map: ParsedElementsArray;
}

export interface ICreateElementParam {
  tag: string;
  classes?: string[];
  content?: string;
  id?: string;
}

export interface IParsedElem extends ICreateElementParam {
  tag: Elements;
  target: boolean;
}

export type ParsedElementsArray = (IParsedElem | ParsedElementsArray)[];

export enum Elements {
  rack = 'rack',
  pot = 'pot',
  chamomile = 'chamomile',
  tulip = 'tulip',
}
