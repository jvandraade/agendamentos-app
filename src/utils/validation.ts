import { parse, isAfter, startOfToday, format } from 'date-fns';

export interface ValidationErrors {
  nome?: string;
  servico?: string;
  data?: string;
  hora?: string;
}

// Função para validação de nome
export const validateNome = (nome: string): string | undefined => {
  if (!nome || nome.trim().length === 0) {
    return 'Nome é obrigatório';
  }

  if (nome.trim().length < 3) {
    return 'Nome deve ter pelo menos 3 caracteres';
  }

  if (nome.trim().length > 100) {
    return 'Nome deve ter no máximo 100 caracteres';
  }

  return undefined;
};

// Função para validação de serviço
export const validateServico = (servico: string): string | undefined => {
  if (!servico || servico.trim().length === 0) {
    return 'Serviço é obrigatório';
  }

  if (servico.trim().length < 3) {
    return 'Serviço deve ter pelo menos 3 caracteres';
  }

  if (servico.trim().length > 100) {
    return 'Serviço deve ter no máximo 100 caracteres';
  }

  return undefined;
};

// Função para validação de data
export const validateData = (data: string): string | undefined => {
  if (!data) {
    return 'Data é obrigatória';
  }

  try {
    // Verificação do formato YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data)) {
      return 'Data inválida. Use o formato DD/MM/AAAA';
    }

    // Converter string para Date
    const selectedDate = parse(data, 'yyyy-MM-dd', new Date());
    const today = startOfToday();

    // Verificação se a data é válida
    if (isNaN(selectedDate.getTime())) {
      return 'Data inválida';
    }

    // Verificação se a data não é no passado
    if (
      !isAfter(selectedDate, today) &&
      format(selectedDate, 'yyyy-MM-dd') !== format(today, 'yyyy-MM-dd')
    ) {
      return 'Data não pode ser no passado';
    }

    return undefined;
  } catch (error) {
    return 'Data inválida';
  }
};

// Função para validação de hora
export const validateHora = (hora: string): string | undefined => {
  if (!hora) {
    return 'Hora é obrigatória';
  }

  // Verificar formato HH:mm
  const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!horaRegex.test(hora)) {
    return 'Hora inválida. Use o formato HH:mm';
  }

  // Validar horário comercial (08:00 - 18:00)
  const [hours, minutes] = hora.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const startTime = 8 * 60; // 08:00
  const endTime = 18 * 60; // 18:00

  if (totalMinutes < startTime || totalMinutes >= endTime) {
    return 'Horário deve ser entre 08:00 e 18:00';
  }

  return undefined;
};

// Função para validação do formulário completo
export const validateAgendamentoForm = (
  nome: string,
  servico: string,
  data: string,
  hora: string
): ValidationErrors => {
  return {
    nome: validateNome(nome),
    servico: validateServico(servico),
    data: validateData(data),
    hora: validateHora(hora),
  };
};

// Função para verificar se o formulário possui erros
export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};
