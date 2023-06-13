import { IArticles } from '../../types/index';
import './news.css';


class News {
    public draw(data: IArticles[]): void {
        const news: IArticles[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        const newsElem: HTMLElement | null = document.querySelector('.news');

        news.forEach((item: IArticles, idx: number) => {
            
            if (newsItemTemp !== null) {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');
                const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
                const newsMetaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
                const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
                const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
                const newsDescriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
                const newsDescriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
                const newsReadMore: HTMLElement | null = newsClone.querySelector('.news__read-more a');

                if (newsItem !== null) {
                    if (idx % 2) newsItem.classList.add('alt');
                }
                if (newsMetaPhoto !== null) {
                    newsMetaPhoto.style.backgroundImage = `url(${
                        item.urlToImage || 'https://pbs.twimg.com/media/DjXghcHXoAABdPe.png'
                    })`;
                }
                if (newsMetaAuthor !== null) {
                    newsMetaAuthor.textContent = item.author || item.source.name;
                }
                if (newsMetaDate !== null) {
                    newsMetaDate.textContent = item.publishedAt
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');
                }
                if (newsDescriptionTitle !== null) {
                    newsDescriptionTitle.textContent = item.title;
                }
                if (newsDescriptionSource !== null) {
                    newsDescriptionSource.textContent = item.source.name;
                }
                if (newsDescriptionContent !== null) {
                    newsDescriptionContent.textContent = item.description;
                }
                if (newsReadMore !== null) {
                    newsReadMore.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
                }
            
        });

        if (newsElem !== null) {
            if (data[0]) {
                newsElem.innerHTML = `<h3>News by ${data[0].source.name}</h3>`;
            } else {
                newsElem.innerHTML = `<h3>News not found</h3>`;
            }
            
            newsElem.appendChild(fragment);
        }
    }
}

export default News;
