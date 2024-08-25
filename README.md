
# Pay Planner Backend

Este é o backend do projeto **Pay Planner**, desenvolvido para gerenciar gastos mensais, garantindo que nenhuma conta seja esquecida.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs em Node.js.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipos estáticos.
- **Firebase Admin**: Integração com o Firebase para gerenciamento de dados.
- **Docker**: Para criação de contêineres e gerenciamento de ambientes.

## Estrutura do Projeto

```bash
├── src
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── interfaces
│   ├── middlewares
│   ├── routes
│   ├── schemas
│   ├── services
│   ├── useCases
│   └── utils
├── README.md
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── yarn.lock
```

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/devgrolli/ms-pay-planner.git
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias.

## Comandos Disponíveis

- `yarn dev`: Inicia o servidor de desenvolvimento com **nodemon**.
- `yarn build`: Compila o projeto TypeScript para JavaScript.
- `yarn start`: Inicia o servidor utilizando o código compilado.
- `yarn clean`: Remove `node_modules`, `package-lock.json` e `yarn.lock`.
- `yarn clean:up`: Limpa o projeto e reinstala as dependências.
- `yarn build:clean`: Remove a pasta `dist`, limpa logs e compila o projeto.

## Executando com Docker

1. Build da imagem Docker:
   ```bash
   docker build -t ms-pay-planner .
   ```

2. Executar o container:
   ```bash
   docker run -p 3000:3000 ms-pay-planner
   ```

## Contribuição

Se você deseja contribuir com o projeto, sinta-se à vontade para abrir um pull request ou relatar um problema.

## Licença

Este projeto está licenciado sob a licença ISC.
