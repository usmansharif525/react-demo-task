export interface INewsArticle {
    author: string
    content: string
    description: string
    publishedAt: string
    title: string
    url: string
    urlToImage: string
    source: {
        id: string
        name: string
    }
}

export interface INewsData {
    articles: INewsArticle[]
    status: string
    totalResults: number
}

export interface INewsFilters {
    q: string
    sources: string | null
    news_api_source: string | null
    country: string | null
    category: string | null
    page: number | null
}
