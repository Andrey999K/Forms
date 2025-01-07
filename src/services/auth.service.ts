// import axios from 'axios';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { AuthFormValues } from '../types';

export const authService = {
  register: async (payloadData: AuthFormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, payloadData.email, payloadData.password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          firstName: payloadData.name,
          lastName: payloadData.surname,
        });
      }
      toast.success('Вы успешно зарегистрировались!', { position: 'top-center' });
      return true;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message, { position: 'top-center' });
      } else {
        toast.error('Error', { position: 'top-center' });
      }
      return false;
    }
  },
  login: async (payloadData: AuthFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, payloadData.email, payloadData.password);
      toast.success('Вы успешно авторизовались!', { position: 'top-center' });
      return true;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message, { position: 'top-center' });
      } else {
        toast.error('Error', { position: 'top-center' });
      }
      return false;
    }
  },
};
// refresh: async ({ refreshToken }: { refreshToken: string }) => {},
