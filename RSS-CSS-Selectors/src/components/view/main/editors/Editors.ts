import './editors.scss';
import createElement from '../../../../utils/createElement';
import htmlToElement from '../../../../utils/htmlToElement';

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
    const innerEl: HTMLElement = createElement({ tag: 'div', classes: ['editor-inner'] });
    innerEl.append(this.createCouterStr(), textArea);
    editorEl.append(titleEl, innerEl);
    return editorEl;
  }

  private createCSStextArea(): HTMLElement {
    const areaEl: HTMLElement = createElement({ tag: 'div', classes: ['css-area'] });
    return areaEl;
  }

  private createHTMLtextArea(): HTMLElement {
    const prepareCode: string = `
      <div class="line"><<span class="tag">div</span>></div>
      <div class="line">< /<span class="tag">div</span>></div>
    `;
    const areaEl: HTMLElement = createElement({ tag: 'div', classes: ['html-area'], content: prepareCode });
    return areaEl;
  }

  private createCouterStr(): HTMLElement {
    let strCount: string = '';
    for (let i = 0; i < this.strAmount; i += 1) {
      strCount = strCount.concat(`${i + 1}\n`);
    }
    console.log(strCount);
    return createElement({ tag: 'div', classes: ['counter'], content: strCount });
  }
}
