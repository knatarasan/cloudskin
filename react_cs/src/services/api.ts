import axios from "axios";
// import { initializeAxiosMockData, isMockEnabled, } from "../mocks/mock.config";
import TokenService from "./token.service";
import createAuthRefreshInterceptor from 'axios-auth-refresh';


let instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true, // Without this  httpOnly cookie can't be set from Backend
    headers: {
        "Content-type": "application/json"
    }
});

let refreshInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true, // Without this  httpOnly cookie can't be set from Backend
    headers: {
        "Content-type": "application/json"
    }
});

// if (isMockEnabled()) {
//     initializeAxiosMockData(instance);
// }

// instance.interceptors.request.use((config) => {
//     if (config.addTrailingSlash && config.url[config.url.length - 1] !== '/') {
//         config.url += '/';
//     }
//     return config;
// });


// Interceptor to add Authorization to outgoing requests
instance.interceptors.request.use(
    (config: any) => {
        const accessToken = TokenService.getLocalAccessToken();

        if (accessToken) {
            config.headers["Authorization"] = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
    refreshInstance.post("/auth/token/refresh/").then(
        (tokenRefreshResponse) => {
            const accessToken = tokenRefreshResponse.data.access;
            TokenService.updateLocalAccessToken(accessToken);
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken;
            return Promise.resolve();
        });

// Instantiate the interceptor
createAuthRefreshInterceptor(
    instance,
    refreshAuthLogic,
    {
        pauseInstanceWhileRefreshing: true, // default: false
    }
);

export default instance;

