import { ISourse } from '../../types/index';
import './sources.css';

class Sources {
    public draw(data: ISourse[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        const sourceElem = document.querySelector('.sources');

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

        sourceElem?.append(fragment);
    }
}

export default Sources;
