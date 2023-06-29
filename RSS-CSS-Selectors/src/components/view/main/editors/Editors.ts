import './editors.scss';
import createElement from '../../../../utils/createElement';
import htmlToElement from '../../../../utils/htmlToElement';
import { CURRENT_LEVEL } from '../../../../data/constants';
import { parserArrayToHTMLeditor } from '../../../function/parsers';
import linkedHover from '../../../function/linkedHover';
import checkSelectors from '../../../function/checkSelectors';
import win from '../../../function/win';
import lose from '../../../function/lose';

export default class Editor {
  private strAmount: number = 20;

  public draw(): HTMLElement {
    const editorsEl: HTMLElement = createElement({ tag: 'section', classes: ['editors'] });
    const editorsWrapperEl: HTMLElement = createElement({ tag: 'div', classes: ['editors-wrapper'] });
    const cssEditorEl: HTMLElement = this.createEditor('CSS Editor', 'style.css', this.createCSStextArea());
    const htmlEditorEl: HTMLElement = this.createEditor('HTML Viewer', 'index.html', this.createHTMLtextArea());

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
    const inputEl: HTMLElement = createElement({ tag: 'input', classes: ['text-input'] });
    const comment: string = `{<br>/* Styles would go here. */<br>}`;
    const commentEl: HTMLElement = createElement({ tag: 'div', classes: ['comment'], content: comment });
    const buttonsBarEl: HTMLElement = createElement({ tag: 'div', classes: ['button-bar'] });
    const enterBtn: HTMLElement = createElement({ tag: 'button', classes: ['button', 'button-enter'], content: 'Enter' });
    const helpBtn: HTMLElement = createElement({ tag: 'button', classes: ['button', 'button-help'], content: '?' });

    // checking answer
    function handler() {
      if (inputEl instanceof HTMLInputElement) {
        const result: boolean = checkSelectors(CURRENT_LEVEL.getHtmlMap(), inputEl.value);
        if (result) {
          win();
        } else {
          lose();
        }
      }
    }
    enterBtn.addEventListener('click', handler);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') handler();
    });

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
