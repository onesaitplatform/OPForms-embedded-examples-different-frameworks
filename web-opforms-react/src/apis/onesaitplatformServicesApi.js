import axios from "axios";

var BASE_URL = 'https://lab.onesaitplatform.com';

const onesaitplatformServicesApi = axios.create({
    baseURL: BASE_URL
});





onesaitplatformServicesApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default onesaitplatformServicesApi;