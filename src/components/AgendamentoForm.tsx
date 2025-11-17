import React, { useState, FormEvent } from 'react';
import { MdAdd, MdPerson, MdWork, MdCalendarToday, MdAccessTime } from 'react-icons/md';
import { AgendamentoCreate } from '../types';
import {
  validateAgendamentoForm,
  hasValidationErrors,
  ValidationErrors,
} from '../utils/validation';
import { format } from 'date-fns';

interface AgendamentoFormProps {
  onSubmit: (agendamento: AgendamentoCreate) => Promise<void>;
  isLoading: boolean;
}

export const AgendamentoForm: React.FC<AgendamentoFormProps> = ({ onSubmit, isLoading }) => {
  const [nome, setNome] = useState('');
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Forçar a data mínima como a partir de hoje
  const minDate = format(new Date(), 'yyyy-MM-dd');

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Marcar todos os campos como touched
    setTouched({ nome: true, servico: true, data: true, hora: true });

    // Validar todos os campos
    const validationErrors = validateAgendamentoForm(nome, servico, data, hora);
    setErrors(validationErrors);

    // Se houver erros, não enviar
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    // Enviar dados do formulário
    try {
      await onSubmit({ nome, servico, data, hora });

      // Limpar formulário após sucesso
      setNome('');
      setServico('');
      setData('');
      setHora('');
      setErrors({});
      setTouched({});
    } catch (error) {
      // Erro já tratado no componente pai
    }
  };

  const handleNomeChange = (value: string) => {
    setNome(value);
    if (touched.nome) {
      setErrors(prev => ({ ...prev, nome: undefined }));
    }
  };

  const handleServicoChange = (value: string) => {
    setServico(value);
    if (touched.servico) {
      setErrors(prev => ({ ...prev, servico: undefined }));
    }
  };

  const handleDataChange = (value: string) => {
    setData(value);
    if (touched.data) {
      setErrors(prev => ({ ...prev, data: undefined }));
    }
  };

  const handleHoraChange = (value: string) => {
    setHora(value);
    if (touched.hora) {
      setErrors(prev => ({ ...prev, hora: undefined }));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl">
          <MdAdd className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Novo Agendamento</h2>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Preencha os dados para criar um novo agendamento
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nome */}
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
          >
            <div className="flex items-center gap-2">
              <MdPerson className="text-lg text-primary" />
              Nome Completo
            </div>
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={e => handleNomeChange(e.target.value)}
            onBlur={() => handleBlur('nome')}
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg border ${
              touched.nome && errors.nome
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-slate-600 focus:ring-primary'
            } bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Digite o nome completo"
          />
          {touched.nome && errors.nome && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">{errors.nome}</p>
          )}
        </div>

        {/* Serviço */}
        <div>
          <label
            htmlFor="servico"
            className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
          >
            <div className="flex items-center gap-2">
              <MdWork className="text-lg text-secondary" />
              Serviço
            </div>
          </label>
          <input
            type="text"
            id="servico"
            value={servico}
            onChange={e => handleServicoChange(e.target.value)}
            onBlur={() => handleBlur('servico')}
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg border ${
              touched.servico && errors.servico
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-slate-600 focus:ring-secondary'
            } bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Digite o tipo de serviço"
          />
          {touched.servico && errors.servico && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">{errors.servico}</p>
          )}
        </div>

        {/* Data e Hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Data */}
          <div>
            <label
              htmlFor="data"
              className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
            >
              <div className="flex items-center gap-2">
                <MdCalendarToday className="text-lg text-accent" />
                Data
              </div>
            </label>
            <input
              type="date"
              id="data"
              value={data}
              min={minDate}
              onChange={e => handleDataChange(e.target.value)}
              onBlur={() => handleBlur('data')}
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.data && errors.data
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-slate-600 focus:ring-accent'
              } bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {touched.data && errors.data && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">{errors.data}</p>
            )}
          </div>

          {/* Hora */}
          <div>
            <label
              htmlFor="hora"
              className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
            >
              <div className="flex items-center gap-2">
                <MdAccessTime className="text-lg text-accent" />
                Horário
              </div>
            </label>
            <input
              type="time"
              id="hora"
              value={hora}
              onChange={e => handleHoraChange(e.target.value)}
              onBlur={() => handleBlur('hora')}
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.hora && errors.hora
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-slate-600 focus:ring-accent'
              } bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {touched.hora && errors.hora && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">{errors.hora}</p>
            )}
            <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400">
              Horário comercial: 08:00 às 18:00
            </p>
          </div>
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3.5 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              Criando agendamento...
            </>
          ) : (
            <>
              <MdAdd className="text-xl" />
              Criar Agendamento
            </>
          )}
        </button>
      </form>
    </div>
  );
};
