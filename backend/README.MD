<h2 align="center">
  Aplicação Oowlish - Backend
</h2>

## About

The aplication

## Fetures

### Buscar Usuários pelo github

**RF - Requistos Funcionais**

- Usuário deve poder digitar o nome username de um usuário do github

**RNF - Requisitos não funcionais**

- A busca pelos dados será via nodejs utilizando axios

**RN - Regras de Negócio**

- O usuário deve digitar no mínimo um caracteres para ser enviada a requisição

### Exibir Repos

**RF - Requistos Funcionais**

- Usuário deve ver a lista de repositório do usuário
- Usuário deve poder paginar a lista de repositório

**RNF - Requisitos não funcionais**

- Receber parametro de paginação via query com a variável query

**RN - Regras de Negócio**

- Não deve ser exibida lista de repositório de usuário não existe
- Quando encontrar o usuário, porém não encontrar nenhum repositório, exibir mensagem de repo vazio
- Receber requisição de paginação para exibir proxima ou página anterior

## Techs

- Typescript
- TypeORM
- Design Pattern

## How To Use

```bash

# Clone this repository

$ git clone https://github.com/luisrodriguesds/go-barber-backend.git

# Go into the repository

$ cd go-barber-backend

# Install packages

$ yarn install

# Configure .env with your database, auth and upload information

$ gedit config/auth.ts && config/upload.ts && typeorm.json

# Run the migrations

$ yarn typeorm migration:run

# Run start and enjoy

$ yarn dev:server

# Enjoy!

```
