import AppController from '../controller/controller';
import { IRespArticles, IRespSourses } from '../types/index';
import { AppView } from '../view/appView';

class App {
    private controller = new AppController();
    private view = new AppView();
    private menu = document.querySelector('.menu');

    public start(): void {
        document?.querySelector('.sources')?.addEventListener('click', (e) => {
            this.view.toggleMenu();
            this.menu?.classList.toggle('close');
            window.scrollTo(0, 0);
            this.controller.getNews(e, (data): void => this.view.drawNews(data as IRespArticles));
        });
        this.controller.getSources((data) => this.view.drawSources(data as IRespSourses));

        if (this.menu) {
            this.menu.addEventListener('click', () => {
                this.view.toggleMenu();
                this.menu?.classList.toggle('close');
            });
        }
    }
}

export default App;
