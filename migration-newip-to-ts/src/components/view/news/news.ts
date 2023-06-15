import { IArticles } from '../../types/index';
import './news.css';
import img from '../../../img/empty.jpg';
import { CLASSES } from '../../constant';

class News {
    public draw(data: IArticles[]): void {
        const amountArticlesOnPage: number = 10;
        const news: IArticles[] =
            data.length >= amountArticlesOnPage ? data.filter((_item, idx) => idx < amountArticlesOnPage) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        const newsElem: HTMLElement | null = document.querySelector(CLASSES.news);

        news.forEach(({ urlToImage, author, source, publishedAt, title, description, url }: IArticles, idx: number) => {
            if (newsItemTemp !== null) {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                const newsItem: HTMLElement | null = newsClone.querySelector(CLASSES.newsItem);
                const newsMetaPhoto: HTMLElement | null = newsClone.querySelector(CLASSES.newsMetaPhoto);
                const newsMetaAuthor: HTMLElement | null = newsClone.querySelector(CLASSES.newsMetaAuthor);
                const newsMetaDate: HTMLElement | null = newsClone.querySelector(CLASSES.newsMetaDate);
                const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector(CLASSES.newsDescrTitle);
                const newsDescriptionSource: HTMLElement | null = newsClone.querySelector(CLASSES.newsDescrSource);
                const newsDescriptionContent: HTMLElement | null = newsClone.querySelector(CLASSES.newsDescrContent);
                const newsReadMore: HTMLElement | null = newsClone.querySelector(CLASSES.newsReadMore);

                const amountDatesChars: number = 10;

                if (newsItem !== null) {
                    if (idx % 2) newsItem.classList.add('alt');
                }
                if (newsMetaPhoto !== null) {
                    newsMetaPhoto.style.backgroundImage = `url(${urlToImage || img})`;
                }
                if (newsMetaAuthor !== null) {
                    newsMetaAuthor.textContent = author || source.name;
                }
                if (newsMetaDate !== null) {
                    newsMetaDate.textContent = publishedAt.slice(0, amountDatesChars).split('-').reverse().join('-');
                }
                if (newsDescriptionTitle !== null) {
                    newsDescriptionTitle.textContent = title;
                }
                if (newsDescriptionSource !== null) {
                    newsDescriptionSource.textContent = source.name;
                }
                if (newsDescriptionContent !== null) {
                    newsDescriptionContent.textContent = description;
                }
                if (newsReadMore !== null) {
                    newsReadMore.setAttribute('href', url);
                }

                fragment.append(newsClone);
            }
        });

        if (newsElem !== null) {
            const firstArticle: IArticles = data[0];
            if (firstArticle) {
                newsElem.innerHTML = `<h3>News by ${firstArticle.source.name}</h3>`;
            } else {
                newsElem.innerHTML = `<h3>News not found</h3>`;
            }

            newsElem.appendChild(fragment);
        }
    }
}

export default News;
