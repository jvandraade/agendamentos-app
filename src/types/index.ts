export interface Agendamento {
  id: number;
  nome: string;
  servico: string;
  data: string; // estão no formato: YYYY-MM-DD
  hora: string; // estão no formato: HH:mm
}

export interface AgendamentoCreate {
  nome: string;
  servico: string;
  data: string;
  hora: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}
