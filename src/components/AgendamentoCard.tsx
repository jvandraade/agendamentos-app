import React from 'react';
import { MdPerson, MdWork, MdCalendarToday, MdAccessTime, MdDelete } from 'react-icons/md';
import { Agendamento } from '../types';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AgendamentoCardProps {
  agendamento: Agendamento;
  onDelete: (id: number) => void;
}

export const AgendamentoCard: React.FC<AgendamentoCardProps> = ({ agendamento, onDelete }) => {
  // Função para formatar data
  const formatarData = (data: string): string => {
    try {
      const date = parse(data, 'yyyy-MM-dd', new Date());
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return data;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-slate-700 group animate-slide-up">
      {/* Header com ID e botão delete */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
          ID: {agendamento.id}
        </span>
        <button
          onClick={() => onDelete(agendamento.id)}
          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100"
          aria-label="Excluir agendamento"
        >
          <MdDelete className="text-xl" />
        </button>
      </div>

      {/* Nome */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
          <MdPerson className="text-xl text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-0.5">Nome</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-slate-100">
            {agendamento.nome}
          </p>
        </div>
      </div>

      {/* Serviço */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-secondary/10 dark:bg-secondary/20 p-2 rounded-lg">
          <MdWork className="text-xl text-secondary" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-0.5">Serviço</p>
          <p className="text-base font-medium text-gray-700 dark:text-slate-200">
            {agendamento.servico}
          </p>
        </div>
      </div>

      {/* Data e Hora */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <MdCalendarToday className="text-accent text-lg" />
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">Data</p>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
              {formatarData(agendamento.data)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MdAccessTime className="text-accent text-lg" />
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">Horário</p>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
              {agendamento.hora}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
