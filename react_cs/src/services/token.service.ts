const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user") ?? '{}');
    return user?.accessToken;
};

const updateLocalAccessToken = (token: string) => {
    let user = JSON.parse(localStorage.getItem("user") ?? '{}');
    user.accessToken = token;
    console.log('user: ', user);
    localStorage.setItem("user", JSON.stringify(user));
};


const removeLocalAccessToken = () => {
    localStorage.removeItem("user");
};


const getUser = () => {
    return JSON.parse(localStorage.getItem("user") ?? '{}');
};

const setUser = (user: any) => {
    // console.log(JSON.stringify(user));
    // localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
    localStorage.removeItem("user");
};

const TokenService = {
    getLocalAccessToken,
    updateLocalAccessToken,
    removeLocalAccessToken,
    getUser,
    setUser,
    removeUser
};

export default TokenService;