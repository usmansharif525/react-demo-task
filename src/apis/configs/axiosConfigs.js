import axios from 'axios'
import Cookies from 'js-cookie';


export const api = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    baseURL: 'http://localhost/',
})


// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
    // If XSRF-TOKEN cookie is not present, call '/sanctum/csrf-cookie'
    // to set CSRF token, then proceed with the initial response
    // console.log('XSRF-TOKEN', Cookies.get('XSRF-TOKEN'))
    if (config?.url?.indexOf('csrf-cookie') == -1 && !Cookies.get('XSRF-TOKEN')) {
        return setCSRFToken()
            .then(() => config);
    }
    return config;
}

const setCSRFToken = () => {
    return api.get('/sanctum/csrf-cookie');
}

api.interceptors.request.use(onRequest, null);


// defining a custom error handler for all APIs
const errorHandler = (error) => {
    const statusCode = error.response?.status

    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
        console.error(error)
    }else{
        // redirect to login page
        // eslint-disable-next-line no-debugger
        // debugger
        // window.location.href = '/login'
    }

    return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})

// api.defaults.withCredentials = true;
// api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';