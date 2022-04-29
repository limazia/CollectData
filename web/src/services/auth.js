import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const TOKEN_KEY = "collect_access_token";

export const createToken = (token) => cookies.set(TOKEN_KEY, token);
export const removeToken = () => cookies.remove(TOKEN_KEY);
export const getToken = () => cookies.get(TOKEN_KEY);
export const isAuthenticated = () => getToken() !== null;
export const logout = () => removeToken();