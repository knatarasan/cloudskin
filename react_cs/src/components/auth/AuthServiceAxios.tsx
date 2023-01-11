import axios from 'axios'
import { api_host } from "../../env/global";

const authAxios = axios.create({
  baseURL: "http://localhost:8000",
  headers: {}
});

const publicAxios = axios.create({
  baseURL: "http://localhost:8000",
  headers: {}
});


authAxios.interceptors.request.use((config: any) => {
  //   config.headers = {} as { [key: string]: string }
  const accessToken = localStorage.getItem("accessToken");
  //checking if accessToken exists
  if (accessToken) {
    config.headers["Authorization"] = 'Bearer ' +accessToken;
  }
  return config;
});

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    //extracting response and config objects
    const { response, config } = error;
    //checking if error is Aunothorized error
    if (response.status === 401) {
      let refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        //if refresh token exists in local storage proceed
        try {
          //try refreshing token
          const data = await authAxios.post("token/refresh/", {
            refresh: refreshToken,
          });
          let accessToken = data.data.accessToken;
          if (accessToken) {
            //if request is successiful and token exists in response data
            //store it in local storage
            localStorage.setItem("accessToken", accessToken);
            //with new token retry original request
            config.headers["Authorization"] = accessToken;
            return authAxios(config);
          }
        } catch (e) {
          console.log(e);
        }
      }
      console.log('refresh token failed')
      console.log('local storage removed')
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    
      return error;
        
    }
    //clear local storage and log user out
  }
);

export { authAxios, publicAxios };


//config when PRINTED

// type Config = {
//   headers: string
// }

// Typical config looks like
// {
//   "transitional": {
//       "silentJSONParsing": true,
//       "forcedJSONParsing": true,
//       "clarifyTimeoutError": false
//   },
//   "adapter": [
//       "xhr",
//       "http"
//   ],
//   "transformRequest": [
//       null
//   ],
//   "transformResponse": [
//       null
//   ],
//   "timeout": 0,
//   "xsrfCookieName": "XSRF-TOKEN",
//   "xsrfHeaderName": "X-XSRF-TOKEN",
//   "maxContentLength": -1,
//   "maxBodyLength": -1,
//   "env": {},
//   "headers": {
//       "Accept": "application/json, text/plain, */*",
//       "Content-Type": "application/json"
//   },
//   "baseURL": "http://localhost:8000",
//   "method": "post",
//   "url": "/token/",
//   "data": "{\"username\":\"kanna\",\"password\":\"Honey200$\"}"
// }