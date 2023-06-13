import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '0992a14004c34237aa6b899375e6a23e', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
