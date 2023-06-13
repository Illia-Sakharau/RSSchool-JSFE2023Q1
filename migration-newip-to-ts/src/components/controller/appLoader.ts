import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '0af25e902fd84487bcee635a65e19276', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
