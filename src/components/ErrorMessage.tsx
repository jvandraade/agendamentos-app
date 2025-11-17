import React from 'react';
import { MdError, MdClose } from 'react-icons/md';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg shadow-sm animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <MdError className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Erro!</h3>
            <p className="text-sm text-red-700 dark:text-red-400">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors flex-shrink-0"
            aria-label="Fechar"
          >
            <MdClose className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};
