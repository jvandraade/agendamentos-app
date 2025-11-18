import axios, { AxiosError } from 'axios';
import { Agendamento, AgendamentoCreate, ApiError } from '../types';

// URL base API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:44300/api';

// Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Aviso de erros
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

// Método GET
export const getAgendamentos = async (): Promise<Agendamento[]> => {
  try {
    const response = await api.get<Agendamento[]>('/agendamentos');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Método POST
export const createAgendamento = async (agendamento: AgendamentoCreate): Promise<Agendamento> => {
  try {
    const response = await api.post<Agendamento>('/agendamentos', agendamento);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Método DELETE
export const deleteAgendamento = async (id: number): Promise<void> => {
  try {
    await api.delete(`/agendamentos/${id}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Função de auxílio no tratamento dos erros
const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    if (axiosError.response) {
      console.error('Erro da API:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('Sem resposta da API:', axiosError.request);
    } else {
      console.error('Erro na requisição:', axiosError.message);
    }
  } else {
    console.error('Erro desconhecido:', error);
  }
};

// Função da mensagem de erro
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    if (axiosError.message === 'Network Error') {
      return 'Erro de conexão. Verifique se a API está rodando.';
    }

    if (axiosError.code === 'ECONNABORTED') {
      return 'Tempo de requisição excedido. Tente novamente.';
    }

    return axiosError.message;
  }

  return 'Erro desconhecido. Tente novamente.';
};

export default api;
