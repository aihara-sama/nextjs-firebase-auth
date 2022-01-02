import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../features/user/userSlice';
import { auth } from '../utils/firebase.utils';
import AuthForm from '../components/AuthForm';

interface ILoginFormData {
  email: string;
  password: string;
}

interface ILoginFormErrors {
  email: string;
  password: string;
  firebaseError: string;
}

const LoginPage: NextPage = () => {
  // State
  const [formData, setFormData] = useState<ILoginFormData>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<ILoginFormErrors>({
    email: '',
    password: '',
    firebaseError: '',
  });

  // Hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Form handlers
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormErrors = { ...formErrors };

    // Validate form
    if (formData.email.length === 0) {
      newFormErrors.email = 'Email cannot be empty';
    }
    if (formData.password.length === 0) {
      newFormErrors.password = 'Password cannot be empty';
    }

    const isError = Object.values(newFormErrors).some((v) => v.length > 0);

    // Check validation
    if (isError) {
      setFormErrors(newFormErrors);
    } else {
      try {
        // Sign in user
        const { user } = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );

        // Set user
        dispatch(
          setUser({
            email: user.email!,
            uid: user.uid,
          }),
        );
        localStorage.setItem('isLoggedIn', '1');

        // Navigate home
        router.push('/');
      } catch (error: any) {
        switch (error.message) {
          case 'Firebase: Error (auth/wrong-password).':
            setFormErrors((prev) => ({
              ...prev,
              firebaseError: 'Invalid email and/or password',
            }));
            break;
          default:
            setFormErrors((prev) => ({
              ...prev,
              firebaseError: error.message,
            }));
        }
      }
    }
  };
  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof ILoginFormData;

    const newFormErrors = { ...formErrors, firebaseError: '' };

    // Validate input
    if (target.value.length === 0) {
      newFormErrors[name] = `${name} cannot be empty`;
    } else {
      newFormErrors[name] = ``;
    }

    // Set state
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    setFormErrors(newFormErrors);
  };

  // Redirect if user is logged in
  if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn')) {
    router.replace('/');
    return null;
  }

  return (
    <div className="container flex justify-center">
      <AuthForm
        onSubmit={onSubmit}
        onChange={onChange}
        title="Login"
        emailError={formErrors.email}
        passwordError={formErrors.password}
        firebaseError={formErrors.firebaseError}
      />
    </div>
  );
};

export default LoginPage;
