import TokenService from "./token.service";
import api from "./api";
import * as t from "typed-assert";

const register = (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  return api
    .post("/auth/registration", {
      username,
      email,
      password1,
      password2,
    })
    .then((response) => {
      // TokenService.setUser(response.data);
      return response.data;
    })
    .catch((error) => {
      // TokenService.removeUser();
      throw new Error(error.response.data.username[0]);
    });
};

const login = (username: string, password: string) => {
  return api
    .post("/auth/login/", {
      username,
      password,
    })
    .then((response) => {
      t.isNotNull(response.data.access_token);
      // User is set into local storage
      TokenService.setUser(response.data);
      return response.data;
    })
    .catch((error) => {
      TokenService.removeUser();
      throw new Error(error.response.data.non_field_errors[0]);
    });
};

const logout = () => {
  TokenService.removeUser();
  // Related Open issue - Will resolve it at some point.
  // https://github.com/iMerica/dj-rest-auth/issues/261
  return api
    .post("/auth/logout/")
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCurrentUser = () => {
  return TokenService.getUser();
};

const isAuthenticated = () => {
  //check from cookies if user is authenticated
  return TokenService.getUser();
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
