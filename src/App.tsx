import React, { useState, useEffect, useCallback } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { Agendamento, AgendamentoCreate } from './types';
import {
  getAgendamentos,
  createAgendamento,
  deleteAgendamento,
  getErrorMessage,
} from './services/api';
import { useDarkMode } from './hooks/useDarkMode';
import { DarkModeToggle } from './components/DarkModeToggle';
import { Loading } from './components/Loading';
import { ErrorMessage } from './components/ErrorMessage';
import { AgendamentoForm } from './components/AgendamentoForm';
import { AgendamentoList } from './components/AgendamentoList';
import { ConfirmModal } from './components/ConfirmModal';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();

  // Estados
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal de confirmação
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    agendamentoId: number | null;
  }>({ isOpen: false, agendamentoId: null });

  // Carregar os agendamentos
  const loadAgendamentos = useCallback(async () => {
    try {
      setIsLoadingList(true);
      setError(null);
      const data = await getAgendamentos();
      setAgendamentos(data);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      console.error('Erro ao carregar agendamentos:', err);
    } finally {
      setIsLoadingList(false);
    }
  }, []);

  // Carregar ao montar o componente
  useEffect(() => {
    loadAgendamentos();
  }, [loadAgendamentos]);

  // Criar agendamento
  const handleCreate = async (agendamento: AgendamentoCreate) => {
    try {
      setIsCreating(true);
      setError(null);
      setSuccessMessage(null);

      await createAgendamento(agendamento);

      // Recarregar lista
      await loadAgendamentos();

      // Mostrar mensagem de sucesso
      setSuccessMessage('Agendamento criado com sucesso!');

      // Limpar mensagem após 3 segundos
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      console.error('Erro ao criar agendamento:', err);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  // Abrir modal de confirmação
  const handleDeleteClick = (id: number) => {
    setDeleteModal({ isOpen: true, agendamentoId: id });
  };

  // Confirmar a exclusão
  const handleDeleteConfirm = async () => {
    if (deleteModal.agendamentoId === null) return;

    try {
      setIsDeleting(true);
      setError(null);
      setSuccessMessage(null);

      await deleteAgendamento(deleteModal.agendamentoId);

      // Recarregar lista
      await loadAgendamentos();

      // Fechar o modal
      setDeleteModal({ isOpen: false, agendamentoId: null });

      // Mostrar mensagem de sucesso
      setSuccessMessage('Agendamento excluído com sucesso!');

      // Limpar mensagem após 3 segundos
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      console.error('Erro ao excluir agendamento:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Cancelar exclusão
  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, agendamentoId: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      {/* Dark Mode Toggle */}
      <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />

      {/* Container Principal */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl mb-4">
            <MdCheckCircle className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
            Sistema de Agendamentos
          </h1>
          <p className="text-gray-600 dark:text-slate-400 text-lg">
            Gerencie seus agendamentos de forma simples e eficiente
          </p>
        </header>

        {/* Mensagens de Sucesso */}
        {successMessage && (
          <div className="mb-6 animate-slide-up">
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <MdCheckCircle className="text-green-500 text-xl" />
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  {successMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mensagens de Erro */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onClose={() => setError(null)} />
          </div>
        )}

        {/* Formulário */}
        <div className="mb-8">
          <AgendamentoForm onSubmit={handleCreate} isLoading={isCreating} />
        </div>

        {/* Lista de Agendamentos */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-slate-700">
          {isLoadingList ? (
            <div className="flex justify-center py-16">
              <Loading size="lg" text="Carregando agendamentos..." />
            </div>
          ) : (
            <AgendamentoList agendamentos={agendamentos} onDelete={handleDeleteClick} />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-gray-500 dark:text-slate-500">
          <p>Sistema de Agendamentos • Desenvolvido com React + TypeScript</p>
        </footer>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default App;
