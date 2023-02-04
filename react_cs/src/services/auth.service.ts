import TokenService from "./token.service";
import api from "./api";
import * as t from "typed-assert";

const register = (username: string, email: string, password: string) => {
    return api.post("/auth/signup/", {
        username,
        email,
        password
    });
};

const login = (username: string, password: string) => {
    return api
        .post("/auth/login/", {
            username,
            password
        })
        .then((response) => {
            t.isNotNull(response.data.access_token);
            TokenService.setUser(response.data);
            return response.data;
        }).catch((error) => {
            TokenService.removeUser();
            console.log(error);
        });
};


const logout = () => {
    TokenService.removeUser();
};

const getCurrentUser = () => {
    return TokenService.getUser();
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
