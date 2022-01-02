import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import Link from 'next/link';
import { auth } from '../utils/firebase.utils';

const HomePage: NextPage = () => {
  // State
  const user = useAppSelector((state) => state.user.user);

  // Hooks
  const router = useRouter();

  useEffect(() => {
    console.log(auth.currentUser);
    if (!localStorage.getItem('isLoggedIn')) {
      // Redirect to login page
      router.replace('/login');
    }
  }, []);
  // If user is not logged in

  return user ? (
    <div className="container mt-32 text-center px-5 break-words">
      <h1 className="text-3xl font-bold">
        Hello <span className="text-sky-700">{user && user.email}</span>
      </h1>
      <Link href={`/logout`}>
        <a className="text-lg font-bold text-blue-900">Log out</a>
      </Link>
    </div>
  ) : null;
};
export default HomePage;
