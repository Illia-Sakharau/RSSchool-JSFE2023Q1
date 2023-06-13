import { IArticles, IRespArticles, IRespSourses, ISourse } from '../types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    public news: News = new News();
    public sources: Sources = new Sources();


    public drawNews(data: IRespArticles): void {
        const values: IArticles[] = data?.articles ? data?.articles : [];
        this.news.draw(values);        
    }

    public drawSources(data: IRespSourses): void {
        const values: ISourse[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    public toggleMenu(): void {
        this.sources.toggle();
    }
}

export default AppView;
