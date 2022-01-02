import { SyntheticEvent } from 'react';

const firstLetterUp = (str: string) =>
  `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;

export const TextInput = ({
  onChange,
  type,
  error,
  placeholder,
}: {
  placeholder: string;
  onChange: (e: SyntheticEvent) => void;
  type: string;
  error: string;
}) => {
  return (
    <div>
      <label htmlFor={type}>{firstLetterUp(type)}</label>
      <p>
        <input
          onChange={onChange}
          onBlur={onChange}
          name={type}
          type={type}
          id={type}
          // placeholder="e.g. john-doe@mail.ru"
          placeholder={placeholder}
          className={`placeholder:italic w-full ${
            error ? 'border-red-600' : 'border-gray-300 focus:border-sky-500'
          }  py-1 outline-none border pl-3 rounded text-sm`}
        />
      </p>
      <p className="text-red-600 text-sm">{firstLetterUp(error)}</p>
    </div>
  );
};
