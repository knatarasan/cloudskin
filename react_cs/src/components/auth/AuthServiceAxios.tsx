import axios from 'axios'
import { api_host } from "../../env/global";

const authAxios = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,                    //  Without this  httpOnly cookie can't be set from Backend
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


/*
TODO : Following interceptor may fall in endless loop when refresh token not set in httpOnly cookie
Backend has throttle control, which won't entertain more than 60 requests/sec
*/
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    //extracting response and config objects
    const { response, config } = error;
    //checking if error is Aunothorized error
    if (response.status === 401) {
        //if refresh token exists in httpOnly cookie  proceed
        try {
          //try refreshing token
          const response = await authAxios.post("token/refresh/");
          let accessToken = response.data.access;
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
      return error;
        
    }
    //clear local storage and log user out
  }
);

export { authAxios };
