export interface IRespSourses {
    status: 'ok' | IError;
    sources: ISourse[];
}

export interface IRespArticles {
    status: 'ok' | IError;
    totalResults: number;
    articles: IArticles[];
}

export interface ISourse {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IArticles {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface IError {
    status: string;
    code: string;
    message: string;
}

export type Callback<T> = (data?: T) => void;

export enum TypeData {
    IRespSourses,
    IRespArticles,
}
