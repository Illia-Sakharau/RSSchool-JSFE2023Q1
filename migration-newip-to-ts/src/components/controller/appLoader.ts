import { DEV_LINK } from '../constant';
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(DEV_LINK, {
            apiKey: process.env.API_KEY as string, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
