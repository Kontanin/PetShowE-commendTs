import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputWithLabelProps {
  label: string;
  placeholder: string;
  form: any;
  error: any;
  type?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  placeholder,
  form,
  error,
  type = 'text',
}) => {
  const [inputType, setInputType] = useState(type);
  const [icon, setIcon] = useState(faEye);

  const handleToggle = () => {
    if (inputType === 'password') {
      setIcon(faEyeSlash);
      setInputType('text');
    } else {
      setIcon(faEye);
      setInputType('password');
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          {...form}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? 'border-red-500' : ''
          }`}
        />
        {type === 'password' && (
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={handleToggle}
          >
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  );
};

export default InputWithLabel;
