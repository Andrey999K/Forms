import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsUserReady, setUser } from '@/redux/user';
import { auth } from '@/utils/firebase/firebaseConfig';

export const useFirebaseAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      dispatch(setIsUserReady(true));
    });

    return () => unsubscribe();
  }, []);
};
