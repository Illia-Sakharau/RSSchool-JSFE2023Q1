export interface ICreateElementParam {
  tag: string;
  classes?: string[];
  content?: string;
  id?: string;
}

export interface IRoute {
  path: string;
  text: string;
  view: () => void;
}

export interface IButtonParams {
  priority: 'primary' | 'secondary' | 'negative' | 'positive';
  type: 'filled' | 'bordered' | 'icon';
  text?: string;
  icon?: string;
  handler: () => void;
}

export interface ICarPropsInputParams {
  inputText: string;
  color: string;
  btnText: string;
  btnHandler(props: ICar): void;
}

export interface IPaginationParams {
  currentPage: number;
  pagesAmount: number;
  prevBtnHandler: () => void;
  nextBtnHandler: () => void;
}

export interface ICar {
  name: string;
  color: string;
  id?: number;
}
export interface IWinners {
  wins: number;
  time: number;
  id: number;
}
