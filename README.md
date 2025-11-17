# Sistema de Agendamentos - Frontend

Aplicação web para gerenciamento de agendamentos, construída com React, TypeScript e Tailwind CSS.

## Sobre o Projeto

Sistema de agendamentos com interface moderna e responsiva que permite criar, visualizar e excluir agendamentos. A aplicação possui validações de formulário, dark mode e integração completa com API REST.

## Tecnologias Utilizadas

- React 18.2
- TypeScript 5.0
- Tailwind CSS 3.4
- Axios 1.6
- date-fns 2.30
- React Icons 4.12

## Funcionalidades

- Criar novos agendamentos com validação de campos
- Listar todos os agendamentos em cards organizados
- Excluir agendamentos com modal de confirmação
- Dark mode com persistência no localStorage
- Validação de nome (mínimo 3 caracteres)
- Validação de serviço (mínimo 3 caracteres)
- Validação de data (não permite datas passadas)
- Validação de horário (apenas entre 08:00 e 18:00)
- Design responsivo para mobile e desktop
- Mensagens de erro e sucesso
- Loading states em todas as operações

## Pré-requisitos

- Node.js versão 16 ou superior
- npm ou yarn
- Backend da API rodando

## Instalação

Clone o repositório:

```
git clone https://github.com/seu-usuario/agendamentos-app.git
cd agendamentos-app
```

Instale as dependências:

```
npm install
```

Crie um arquivo .env na raiz do projeto:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Execute o projeto:

```
npm start
```

A aplicação estará disponível em http://localhost:3000

## Estrutura do Projeto

```
src/
├── components/          - Componentes React reutilizáveis
├── hooks/              - Custom hooks (useDarkMode)
├── services/           - Configuração da API e requisições
├── types/              - Interfaces e tipos TypeScript
├── utils/              - Funções utilitárias e validações
├── App.tsx             - Componente principal
├── index.tsx           - Entry point da aplicação
└── index.css           - Estilos globais e Tailwind
```

## Integração com Backend

A aplicação consome uma API REST com os seguintes endpoints:

GET /agendamentos - Retorna lista de agendamentos

POST /agendamentos - Cria novo agendamento (envia nome, servico, data, hora)

DELETE /agendamentos/:id - Remove agendamento pelo ID

Formato dos dados:

```
{
  "id": 1,
  "nome": "João Silva",
  "servico": "Consulta Médica",
  "data": "2024-11-20",
  "hora": "14:30"
}
```

O backend precisa ter CORS configurado para aceitar requisições de http://localhost:3000

## Scripts Disponíveis

npm start - Inicia o servidor de desenvolvimento

npm run build - Cria build de produção

npm test - Executa testes

## Paleta de Cores

Primary: #6366f1 (Indigo)
Secondary: #8b5cf6 (Roxo)
Accent: #06b6d4 (Cyan)

Dark Mode:
Background: #0f172a
Surface: #1e293b
Text: #f1f5f9

## Build e Deploy

Para gerar o build de produção:

```
npm run build
```

A pasta build/ conterá os arquivos otimizados prontos para deploy.

Para deploy na Vercel, configure a variável de ambiente REACT_APP_API_URL com a URL da sua API de produção.

## Autor

Desenvolvido por [Vitor Andrade]
