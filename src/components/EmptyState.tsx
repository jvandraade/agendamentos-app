import React from 'react';
import { MdEventNote } from 'react-icons/md';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-full p-8 mb-6">
        <MdEventNote className="text-6xl text-primary dark:text-primary/80" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-200 mb-2">
        Nenhum agendamento encontrado!
      </h3>
      <p className="text-gray-600 dark:text-slate-400 text-center max-w-md">
        Comece criando seu primeiro agendamento usando o formulário acima.
      </p>
    </div>
  );
};
