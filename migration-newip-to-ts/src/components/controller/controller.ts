import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: () => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: PointerEvent, callback: () => void): void {
        
        let target = e.target;
        const newsContainer = e.currentTarget;        

        while (target !== newsContainer) {
            if (target !== null && target instanceof HTMLElement && newsContainer !== null && newsContainer instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id');
                    
                    if (newsContainer.getAttribute('data-source') !== sourceId && typeof sourceId === 'string') {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = target.parentNode;
            }
        }
        
    }
}

export default AppController;
