import { Elements, ICreateElementParam, ICurrentLevel, ILevels } from '../src/types/types';

const levels: ILevels[] = [
  {
    title: 'Test title',
    answer: 'pot',
    selector: 'test',
    linkToInfo: '#',
    htmlMap: `
      <shelf>
        <rack></rack>
        <pot data-target="true"></pot>      
        <chamomile></chamomile>
        <tulip></tulip>
      </shelf>
    `,
  },
];

const currentLevel: ICurrentLevel = {
  currentLevel: 0,
  map: [
    {
      tag: Elements.rack,
      classes: [],
      isTarget: false,
      id: '',
    },
    {
      tag: Elements.pot,
      classes: [],
      isTarget: true,
      id: '',
    },
    {
      tag: Elements.chamomile,
      classes: [],
      isTarget: false,
      id: '',
    },
    {
      tag: Elements.tulip,
      classes: [],
      isTarget: false,
      id: '',
    },
  ],
  title: 'Test title',
  answer: 'pot',
  selector: 'test',
  linkToInfo: '#',
  htmlMap: `
      <shelf>
        <rack></rack>
        <pot data-target="true"></pot>      
        <chamomile></chamomile>
        <tulip></tulip>
      </shelf>
    `,
};

const elemInfo: ICreateElementParam = {
  tag: 'div',
  classes: ['test'],
  content: 'test',
};

const template: string = `<div class="test">test</div>`;

const referenceElem = document.createElement('div');
referenceElem.classList.add('test');
referenceElem.innerHTML = 'test';

export { levels, currentLevel, elemInfo, template, referenceElem };
