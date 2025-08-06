import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-white text-sm font-bold mb-4">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#222] text-[16px] ${props.disabled ? 'bg-gray-100' : ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;