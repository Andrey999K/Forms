// import { db } from '../utils/firebase/firebaseConfig';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { AuthFormValues } from '../types';
// import { localStorageService } from './localStorage.service';
// import { authAxiosInstanse } from '@/api/instanse';

// export const authService = {
//   register: async (payload: AuthFormValues) => {
//     const { data } = await authAxiosInstanse.post('accounts:signUp', {
//       email: payload.email,
//       password: payload.password,
//       returnSecureToken: true,
//     });
//     localStorageService.setTokens(data);
//     await setDoc(doc(db, 'users', data.localId), {
//       firstName: payload.name,
//       lastName: payload.surname,
//       email: payload.email,
//       createdAt: new Date().toISOString(),
//     });
//     return data;
//   },
//   login: async (payload: AuthFormValues) => {
//     const { data } = await authAxiosInstanse.post('accounts:signInWithPassword', {
//       email: payload.email,
//       password: payload.password,
//       returnSecureToken: true,
//     });
//     localStorageService.setTokens(data);
//     const dataLogin = await getDoc(doc(db, 'users', data.localId));
//     if (dataLogin.exists()) {
//       localStorageService.setTokens(dataLogin.data());
//     }
//     return data;
//   },
//   refresh: async () => {
//     const { data } = await authAxiosInstanse.post('token', {
//       grant_type: 'refresh_token',
//       refresh_token: localStorageService.getRefreshToken(),
//     });
//     return data;
//   },
// };
