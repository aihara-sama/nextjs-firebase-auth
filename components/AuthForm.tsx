import { FormEvent, SyntheticEvent } from 'react';
import { TextInput } from '../components/TextInput';

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
    </form>
  );
};

export default AuthForm;
