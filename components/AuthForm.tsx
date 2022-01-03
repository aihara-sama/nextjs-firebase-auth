import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { FormEvent, SyntheticEvent } from 'react';
import { TextInput } from '../components/TextInput';
import {
  createUserIfNotExists,
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from '../utils/firebase.utils';

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: SyntheticEvent) => void;
  title: string;
  emailError: string;
  passwordError: string;
  firebaseError: string;
};

const AuthForm = ({
  onSubmit,
  onChange,
  title,
  emailError,
  passwordError,
  firebaseError,
}: Props) => {
  const router = useRouter();
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="mt-48 min-w-[400px] max-w-[500px] shadow-2xl p-7 rounded-md"
    >
      <h1 className="text-3xl font-bold">{title}</h1>
      <hr className="my-3 border-gray-300" />

      {firebaseError && (
        <p className="bg-red-300 rounded pl-3 py-2 text-red-800 text-sm">
          {firebaseError}
        </p>
      )}

      {/* Email */}
      <div className="mt-10 mb-5">
        <TextInput
          placeholder="e.g. john-doe@mail.ru"
          error={emailError}
          type="email"
          onChange={onChange}
        />
      </div>
      {/* Password */}
      <div>
        <TextInput
          placeholder="••••••••••"
          error={passwordError}
          type="password"
          onChange={onChange}
        />
      </div>

      {/* Submit */}
      <div className="mt-5 ">
        <button
          type="submit"
          className="transition-all hover:bg-sky-800 font-bold bg-sky-700 px-4 py-2 rounded w-full text-lime-100"
        >
          <span>{title}</span>
        </button>
      </div>
      <div className="mt-5 gap-3 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="cursor-pointer"
          onClick={() =>
            signInWithGoogle()
              .then(createUserIfNotExists)
              .then(() => {
                localStorage.setItem('isLoggedIn', '1');
                router.push('/');
              })
              .then(() => router.push('/'))
          }
        >
          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="cursor-pointer"
          onClick={() =>
            signInWithGithub()
              .then(createUserIfNotExists)
              .then(() => {
                localStorage.setItem('isLoggedIn', '1');
                router.push('/');
              })
          }
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="cursor-pointer"
          onClick={() =>
            signInWithFacebook()
              .then(createUserIfNotExists)
              .then(() => {
                localStorage.setItem('isLoggedIn', '1');
                router.push('/');
              })
              .then(() => router.push('/'))
          }
        >
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
        </svg>
      </div>
    </form>
  );
};

export default AuthForm;
