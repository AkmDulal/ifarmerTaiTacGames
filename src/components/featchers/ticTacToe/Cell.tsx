import React from 'react';

interface CellProps {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, disabled }) => {
  return (
    <button
      className={`w-full h-full flex items-center justify-center text-3xl font-bold rounded-md 
        ${value === 'X' ? 'bg-blue-100 text-blue-600' : ''}
        ${value === 'O' ? 'bg-red-100 text-red-600' : ''}
        ${!value && !disabled ? 'hover:bg-gray-100' : ''}
        ${!value ? 'bg-gray-50' : ''}
        transition-colors duration-200`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Cell;