import { Callback, TypeData } from '../types/index';

class Loader {
    constructor(public baseLink: string, public options: { apiKey: string }) {}

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { [key: string]: string } },
        callback = () => {
            console.error('No callback for GET response');
        },
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: { [key: string]: string }, endpoint: string): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback<TypeData>, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: TypeData) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
