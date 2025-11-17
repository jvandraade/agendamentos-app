import React from 'react';
import { MdList } from 'react-icons/md';
import { Agendamento } from '../types';
import { AgendamentoCard } from './AgendamentoCard';
import { EmptyState } from './EmptyState';

interface AgendamentoListProps {
  agendamentos: Agendamento[];
  onDelete: (id: number) => void;
}

export const AgendamentoList: React.FC<AgendamentoListProps> = ({ agendamentos, onDelete }) => {
  if (agendamentos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-accent to-primary p-3 rounded-xl">
          <MdList className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Agendamentos</h2>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Total: {agendamentos.length}{' '}
            {agendamentos.length === 1 ? 'agendamento' : 'agendamentos'}
          </p>
        </div>
      </div>

      {/* Lista de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agendamentos.map(agendamento => (
          <AgendamentoCard key={agendamento.id} agendamento={agendamento} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};
