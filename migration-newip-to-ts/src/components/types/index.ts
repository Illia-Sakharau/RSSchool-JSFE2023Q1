export interface IRespSourses {
  status: 'ok' | IError,
  sources: ISourse[],
}

export interface IRespArticles {
  status: 'ok' | IError,
  totalResults: number,
  articles: IArticles,
}

interface ISourse {
  id: string,
  name: string,
  description: string,
  url: string,
  category: string,
  language: string,
  country: string,
}

interface IArticles {
  source: {id: string, name: string},
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string,
}

interface IError {
  status: string,
  code: string,
  message: string,
}