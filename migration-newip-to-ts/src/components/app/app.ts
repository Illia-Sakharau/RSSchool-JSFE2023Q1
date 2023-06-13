import AppController from '../controller/controller';
import { IRespArticles, IRespSourses } from '../types/index';
import { AppView } from '../view/appView';

class App {

    private controller = new AppController();
    private view = new AppView();

    public start(): void {
        document?.querySelector('.sources')?.addEventListener('click', (e) => this.controller.getNews(e, (data): void => this.view.drawNews(data as IRespArticles)));
        this.controller.getSources((data) => {this.view.drawSources(data as IRespSourses)});
    }
}

export default App;
