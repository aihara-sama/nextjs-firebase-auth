import { NextPage } from 'next';
import { Children, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { removeUser, setUser } from '../features/user/userSlice';
import { auth } from '../utils/firebase.utils';

const Auth: NextPage = ({ children }) => {
  // Hooks
  const dispatch = useAppDispatch();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      // if user is logged in
      if (user) {
        // set user
        dispatch(
          setUser({
            email: user.email!,
            uid: user.uid,
          }),
        );
      } else {
        // else remove user
        dispatch(removeUser());
      }
    });
  }, []);
  return <div>{children}</div>;
};

export default Auth;
