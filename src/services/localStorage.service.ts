const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id';

type Props = {
  refreshToken: string;
  localId: string;
  email: string;
  idToken: string;
  expiresIn?: string;
};

export const setTokens = ({ refreshToken, localId, email, idToken, expiresIn = '3600' }: Props) => {
  const expiresDate = new Date().getTime() + Number(expiresIn) * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, String(expiresDate));
  localStorage.setItem(USERID_KEY, localId);
  localStorage.setItem('currentUser', JSON.stringify({ email, localId }));
};

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getCurrentUser() {
  return JSON.parse(String(localStorage.getItem('currentUser')));
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USERID_KEY);
}

export const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  getCurrentUser,
  removeAuthData,
};
