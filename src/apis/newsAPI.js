import { api } from './configs/axiosConfigs'
import { defineCancelApiObject } from './configs/axiosUtils'

export const NewsAPI = {

    searchNews: async function (data, cancel = false) {
        const response = await api.request({
            url: '/api/search-news',
            params: data,
            method: 'GET',
            signal: cancel ? cancelApiObject[this.searchNews.name].handleRequestCancellation().signal : undefined
        })

        return response.data
    },

    getTopHeadlines: async function (data, cancel = false) {
        const response = await api.request({
            url: '/api/top-headlines',
            params: data,
            method: 'GET',
            signal: cancel ? cancelApiObject[this.searchNews.name].handleRequestCancellation().signal : undefined
        })
        return response.data
    },

    getSources: async function (data, cancel = false) {
        console.log(data)
        const response = await api.request({
            url: '/api/news-sources',
            params: data,
            method: 'GET',
            signal: cancel ? cancelApiObject[this.searchNews.name].handleRequestCancellation().signal : undefined
        })

        return response.data
    }
}

const cancelApiObject = defineCancelApiObject(NewsAPI)