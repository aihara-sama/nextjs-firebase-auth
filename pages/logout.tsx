import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { removeUser } from '../features/user/userSlice';
import { auth } from '../utils/firebase.utils';

const Logout: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      // Sign out
      await auth.signOut();

      // Remove user
      dispatch(removeUser());
      localStorage.removeItem('isLoggedIn');

      // Redirect to login page
      router.push('/login');
    })();
  }, []);
  return null;
};
export default Logout;
