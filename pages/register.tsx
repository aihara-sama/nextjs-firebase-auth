import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { auth, firestore } from '../utils/firebase.utils';
import { NextPage } from 'next';
import AuthForm from '../components/AuthForm';

interface IRegisterFormData {
  email: string;
  password: string;
}

interface IRegisterFormErrors {
  email: string;
  password: string;
  firebaseError: string;
}

const RegisterPage: NextPage = () => {
  // State
  const [formData, setFormData] = useState<IRegisterFormData>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<IRegisterFormErrors>({
    email: '',
    password: '',
    firebaseError: '',
  });

  // Hooks
  const router = useRouter();

  // Form handlers
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormErrors = { ...formErrors };

    // Validate input
    if (formData.email.length === 0) {
      newFormErrors.email = 'Email cannot be empty';
    }
    if (formData.password.length <= 6) {
      newFormErrors.password = 'Password should be at least 6 characters';
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
        // Register user
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );

        // Create user
        await addDoc(collection(firestore, 'users'), {
          uid: user.uid,
          email: user.email,
        });

        // Navigate to login
        router.push('/login');
      } catch (error: any) {
        switch (error.message) {
          case 'Firebase: Error (auth/email-already-in-use).':
            setFormErrors((prev) => ({
              ...prev,
              firebaseError: 'User with this email already exists',
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
    const name = target.name as keyof IRegisterFormData;

    const newFormErrors = { ...formErrors, badCred: '' };
    if (target.value.length === 0) {
      newFormErrors[name] = `${name} cannot be empty`;
    } else {
      newFormErrors[name] = ``;
    }
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
        title="Register"
        emailError={formErrors.email}
        passwordError={formErrors.password}
        firebaseError={formErrors.firebaseError}
      />
    </div>
  );
};

export default RegisterPage;
