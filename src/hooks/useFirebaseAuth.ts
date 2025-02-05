// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { onAuthStateChanged } from 'firebase/auth';
// import { setIsUserReady, setUser } from '@/redux/user';
// import { auth } from '@/utils/firebase/firebaseConfig';
// import { RootState } from '@/redux/store';

// export const useFirebaseAuth = () => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state: RootState) => state.user.user);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user !== currentUser) {
//         dispatch(setUser(user));
//       }
//       dispatch(setIsUserReady(true));
//     });

//     return () => unsubscribe();
//   }, [currentUser]);
// };

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsUserReady, setUser } from '@/redux/user';
import { auth } from '@/utils/firebase/firebaseConfig';

export const useFirebaseAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('####: ', user);
      if (user) {
        dispatch(
          setUser({ uid: user.uid, email: user.email || null, emailVerified: user.emailVerified })
        );
      } else {
        dispatch(setUser(null));
      }
      dispatch(setIsUserReady(true));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
