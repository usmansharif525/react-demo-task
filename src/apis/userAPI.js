import { api } from './configs/axiosConfigs'
import { defineCancelApiObject } from './configs/axiosUtils'

export const UserAPI = {
    csrf: () => api.get('/sanctum/csrf-cookie'),
    login: async function (email, password, cancel = false) {
        await this.csrf()
        const response = await api.request({
            url: '/api/auth/login',
            method: 'POST',
            data: {
                email,
                password
            },
            signal: cancel ? cancelApiObject[this.login.name].handleRequestCancellation().signal : undefined
        })
        return response.data
    },

    register: async function (data, cancel = false) {
        await this.csrf()
        const response = await api.request({
            url: '/api/auth/register',
            method: 'POST',
            data,
            signal: cancel ? cancelApiObject[this.register.name].handleRequestCancellation().signal : undefined
        })
        return response.data
    },

    getUser: async function (cancel = false) {
        const response = await api.request({
            url: '/api/user',
            method: 'GET',
            signal: cancel ? cancelApiObject[this.getUser.name].handleRequestCancellation().signal : undefined
        })

        return response.data
    }
}

const cancelApiObject = defineCancelApiObject(UserAPI)