// // import { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import { setIsUserReady, setUser } from '@/redux/user';
// // import { auth } from '@/utils/firebase/firebaseConfig';
// // import { RootState } from '@/redux/store';

// // export const useFirebaseAuth = () => {
// //   const dispatch = useDispatch();
// //   const currentUser = useSelector((state: RootState) => state.user.user);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user !== currentUser) {
// //         dispatch(setUser(user));
// //       }
// //       dispatch(setIsUserReady(true));
// //     });

// //     return () => unsubscribe();
// //   }, [currentUser]);
// // };

// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { onAuthStateChanged } from 'firebase/auth';
// import { setIsUserReady, setUser } from '@/redux/user';
// import { auth } from '@/utils/firebase/firebaseConfig';

// export const useFirebaseAuth = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         dispatch(
//           setUser({
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName || '',
//             photoURL: user.photoURL || '',
//           })
//         );
//       }
//       dispatch(setIsUserReady(true));
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

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
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            creationTime: user.metadata?.creationTime || '',
          })
        );
      } else {
        dispatch(setUser(null));
      }

      dispatch(setIsUserReady(true));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
