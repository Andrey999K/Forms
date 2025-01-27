import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsUserReady, setUser } from '@/redux/user';
import { auth } from '@/shared/utils/firebase/firebaseConfig';
import { RootState } from '@/redux/store';

export const useFirebaseAuth = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== currentUser) {
        dispatch(setUser(user));
      }
      // if (!currentUser) {
      dispatch(setIsUserReady(true));
      // }
    });

    return () => unsubscribe();
  }, [currentUser]);
};
