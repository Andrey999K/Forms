// import { axiosInstanse } from '@/api/instanse';
// import { localStorageService } from './localStorage.service';
// import { authService } from './auth.service';

// axiosInstanse.interceptors.request.use(
//   async (config) => {
//     if (!config.url?.endsWith('.json')) {
//       config.url = `${config.url}.json`;
//     }

//     const expiresDate = localStorageService.getTokenExpiresDate();
//     const refreshToken = localStorageService.getRefreshToken();
//     const isExpired = refreshToken && Date.now() > Number(expiresDate);

//     if (isExpired) {
//       const { refresh_token, user_id, expires_in, id_token } = await authService.refresh();
//       localStorageService.setTokens({
//         refreshToken: refresh_token,
//         idToken: id_token,
//         expiresIn: expires_in,
//         localId: user_id,
//         email: localStorageService.getEmail() || '',
//       });
//     }

//     const accessToken = localStorageService.getAccessToken();
//     if (accessToken) {
//       config.params = { ...(config.params || {}), auth: accessToken };
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
