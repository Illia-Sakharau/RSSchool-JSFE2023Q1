import { ISourse } from '../../types/index';
import './sources.css';

class Sources {
    public sourceElem = document.querySelector('.sources');

    public draw(data: ISourse[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp !== null) {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
                const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
                const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');

                if (sourceItemName !== null) {
                    sourceItemName.textContent = item.name;
                }
                if (sourceItem !== null) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            }
        });

        this.sourceElem?.append(fragment);
    }

    public toggle(): void {
        if (this.sourceElem) {
            this.sourceElem.classList.toggle('visible');
        }
    }
}

export default Sources;
