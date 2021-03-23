export const TOKEN_KEY = "DELIVER$#IT";
export const isAuthenticated = () => (localStorage.getItem(TOKEN_KEY) !== null || sessionStorage.getItem(TOKEN_KEY) !== null);
export const getToken = () => localStorage.getItem(TOKEN_KEY) !== null ? localStorage.getItem(TOKEN_KEY).access_token : sessionStorage.getItem(TOKEN_KEY).access_token
export const getUserInfo = () => localStorage.getItem(TOKEN_KEY) !== null ? localStorage.getItem(TOKEN_KEY).user : sessionStorage.getItem(TOKEN_KEY).user
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const sessionLogin = token => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const sessionLogout = () => {
  sessionStorage.removeItem(TOKEN_KEY)
}