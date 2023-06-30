import './editors.scss';
import createElement from '../../../../utils/createElement';
import htmlToElement from '../../../../utils/htmlToElement';
import { CURRENT_LEVEL, LEVELS_STATES } from '../../../../data/constants';
import { parserArrayToHTMLeditor } from '../../../function/parsers';
import linkedHover from '../../../function/linkedHover';
import checkSelectors from '../../../function/checkSelectors';
import correctAnswerHandler from '../../../function/correctAnswerHandler';
import wrongAnswerHandler from '../../../function/wrongAnswerHandler';

export default class Editor {
  private strAmount: number = 20;
  private editorsEl: HTMLElement = createElement({ tag: 'section', classes: ['editors'] });
  private inputEl: HTMLElement = createElement({ tag: 'input', classes: ['text-input'] });
  private enterBtn: HTMLElement = createElement({ tag: 'button', classes: ['button', 'button-enter'], content: 'Enter' });
  private helpBtn: HTMLElement = createElement({ tag: 'button', classes: ['button', 'button-help'], content: '?' });

  constructor() {
    // checking answer
    const handler = () => {
      if (this.inputEl instanceof HTMLInputElement) {
        if (checkSelectors(CURRENT_LEVEL.getHtmlMap(), this.inputEl.value.toString())) {
          this.inputEl.value = '';
          correctAnswerHandler();
        } else {
          wrongAnswerHandler();
        }
      }
    };
    this.enterBtn.addEventListener('click', handler);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') handler();
    });
    document.addEventListener('wrongAnswer', () => {
      this.editorsEl.classList.add('wrong');
      this.editorsEl.addEventListener('animationend', () => this.editorsEl.classList.remove('wrong'));
    });

    //help typing
    this.helpBtn.addEventListener('click', () => {
      if (this.inputEl instanceof HTMLInputElement) {
        const currentLevel = CURRENT_LEVEL.getLevel();
        const answer = CURRENT_LEVEL.getAnswer();
        const inputEl = this.inputEl;
        const speed = 30;
        let count = 0;

        LEVELS_STATES[currentLevel] = 'completed_help';
        localStorage.setItem(`ily-level${currentLevel}`, 'completed_help');

        inputEl.value = '';
        inputEl.focus();

        let typeChar = setTimeout(function type() {
          if (count < answer.length) {
            inputEl.value += answer[count];
            count++;
            typeChar = setTimeout(type, speed);
          } else {
            clearTimeout(typeChar);
          }
        }, speed);
      }
    });

    document.addEventListener('levelChanget', () => {
      if (this.inputEl instanceof HTMLInputElement) {
        this.inputEl.value = '';
      }
    });
  }

  public draw(): HTMLElement {
    const editorsEl: HTMLElement = this.editorsEl;
    const editorsWrapperEl: HTMLElement = createElement({ tag: 'div', classes: ['editors-wrapper'] });
    const cssEditorEl: HTMLElement = this.createEditor('CSS Editor', 'style.css', this.createCSStextArea());
    const htmlEditorEl: HTMLElement = this.createEditor('HTML Viewer', 'index.html', this.createHTMLtextArea());

    editorsEl.innerHTML = '';
    editorsWrapperEl.append(cssEditorEl, htmlEditorEl);
    editorsEl.append(editorsWrapperEl);

    return editorsEl;
  }

  private createEditor(editorName: string, fileName: string, textArea: HTMLElement): HTMLElement {
    const editorEl: HTMLElement = createElement({ tag: 'div', classes: ['editor'] });
    const titleTemplate = `<div class="title">
      <h6>${editorName}</h6>
      <span>${fileName}</span>
    </div>
    `;
    const titleEl: HTMLElement = htmlToElement(titleTemplate);
    const innerEl: HTMLElement = createElement({ tag: 'div', classes: [`editor-inner-${editorName.slice(0, 4).trim()}`] });
    innerEl.append(this.createCouterStr(), textArea);
    editorEl.append(titleEl, innerEl);
    return editorEl;
  }

  private createCSStextArea(): HTMLElement {
    const areaEl: HTMLElement = createElement({ tag: 'div', classes: ['css-area'] });
    const inputEl: HTMLElement = this.inputEl;
    const comment: string = `{<br>/* Styles would go here. */<br>}
    <br><br>
    /* <a href="${CURRENT_LEVEL.getLinkToInfo()}" target="_blank">${CURRENT_LEVEL.getSelector()}</a> 
    is recommended to use to complete the level. */`;
    const commentEl: HTMLElement = createElement({ tag: 'div', classes: ['comment'], content: comment });
    const buttonsBarEl: HTMLElement = createElement({ tag: 'div', classes: ['button-bar'] });
    const enterBtn: HTMLElement = this.enterBtn;
    const helpBtn: HTMLElement = this.helpBtn;

    buttonsBarEl.append(enterBtn, helpBtn);

    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('placeholder', 'Type in a CSS selector');

    areaEl.append(inputEl, commentEl, buttonsBarEl);
    return areaEl;
  }

  private createHTMLtextArea(): HTMLElement {
    const prepareCode = parserArrayToHTMLeditor(CURRENT_LEVEL.getMap());

    const areaEl: HTMLElement = createElement({ tag: 'div', classes: ['html-area'] });
    areaEl.append(prepareCode);

    // linked hover
    areaEl.addEventListener('mouseover', linkedHover);
    areaEl.addEventListener('mouseout', linkedHover);

    return areaEl;
  }

  private createCouterStr(): HTMLElement {
    let strCount: string = '';
    for (let i = 0; i < this.strAmount; i += 1) {
      strCount = strCount.concat(`${i + 1}<br>`);
    }
    return createElement({ tag: 'div', classes: ['counter'], content: strCount });
  }
}
