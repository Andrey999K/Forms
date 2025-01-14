// import { LocalNames } from '@/constants/localStorageNames';

// type Props = {
//   refreshToken?: string;
//   localId?: string;
//   email?: string;
//   idToken?: string;
//   expiresIn?: string;
// };

// export const setTokens = ({ refreshToken, localId, email, idToken, expiresIn = '3600' }: Props) => {
//   const expiresDate = new Date().getTime() + Number(expiresIn) * 1000;
//   localStorage.setItem(LocalNames.USERID, localId);
//   localStorage.setItem(LocalNames.REFRESH_TOKEN, refreshToken);
//   localStorage.setItem(LocalNames.ACCESS_TOKEN, idToken);
//   localStorage.setItem(LocalNames.EXPIRES_IN, expiresDate.toString());
//   localStorage.setItem(LocalNames.CURRENT_USER, JSON.stringify({ email, localId }));
// };

// export const getAccessToken = () => {
//   return localStorage.getItem(LocalNames.ACCESS_TOKEN);
// };
// export const getRefreshToken = () => {
//   return localStorage.getItem(LocalNames.REFRESH_TOKEN);
// };
// export const getTokenExpiresDate = () => {
//   return localStorage.getItem(LocalNames.EXPIRES_IN);
// };

// export const getCurrentUser = () => {
//   return JSON.parse(String(localStorage.getItem('currentUser')));
// };

// export const getUserId = () => {
//   return localStorage.getItem(LocalNames.USERID);
// };

// export const removeAuthData = () => {
//   localStorage.removeItem(LocalNames.ACCESS_TOKEN);
//   localStorage.removeItem(LocalNames.REFRESH_TOKEN);
//   localStorage.removeItem(LocalNames.EXPIRES_IN);
//   localStorage.removeItem(LocalNames.USERID);
//   localStorage.removeItem(LocalNames.CURRENT_USER);
// };

// export const localStorageService = {
//   setTokens,
//   getAccessToken,
//   getRefreshToken,
//   getTokenExpiresDate,
//   getUserId,
//   getCurrentUser,
//   removeAuthData,
// };
