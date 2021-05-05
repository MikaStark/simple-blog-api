# Simple Blog API

This si a very simple NodeJS Blog API using [TypeScript](https://www.typescriptlang.org/), [Express](https://expressjs.com/fr/) and [Prisma](https://www.prisma.io/).

## Requirements

You need recent [Node.js](https://nodejs.org/en/download/) installed in your envrionment (at least version 14).

If you want to use a local database, you have to install [MySQL](https://www.mysql.com/en/downloads/) or use [Docker](https://www.docker.com/products/docker-desktop) and pull a [MySQL image](https://hub.docker.com/_/mysql)

## Getting started

Use the node package manager (npm) to install all dependencies

```
npm install
```

## Running dev server

Before all, you must specify which database will be used. Create a `.env` file inside `prisma/` folder with the following content

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/NAME"
```

Then, execute [Prisma migration](https://www.prisma.io/docs/concepts/components/prisma-migrate) against your development database.

```bash
npx prisma migrate dev
```

Finally run the dev server

```bash
npm run dev
```

By default, the API will run on port 3000. But if you want to use another, specify it through `PORT` environment variable.

## Build for production

Before all, add a _DATABASE_URL_ environment variable to specify which database your project will use

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/NAME"
```

The, deploy your [Prisma migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate#production-and-testing-environments) to your production/testing database.

```bash
npx prisma migrate deploy
```

Then build the API and run start script

```bash
npm run build
npm start
```

## Linting

```bash
npm run lint
```

## Health check

Server health can be checked at `/.well-known/apollo/server-health`

## Contributing

If you want to contribute to this project you are very welcome but you must keep in mind some recommendations to keep this project fantastic.

- This project is powered by [TypeScript](https://www.typescriptlang.org/) so you need to be familiar with it and also modern JavaScript coding (at least `es2015`).
- You can use the code editor you like but we highly recommend using [Visual Studio Code](https://code.visualstudio.com/) because it come with full TypeScript/JavaScript/Node.js support and it provides a blasting [Prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma).
- Coding style is very important to keep this project clean and straightforward. This project come with the following technologies and must be used (even if you choose to not use Visual Studio Code).
  - [EditorConfig](https://editorconfig.org/) — Unify code editor behaviors ([EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
  - [ESLint](https://eslint.org/) — TypeScript/JavaScript linter ([VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
  - [Prettier](https://prettier.io/) — Code formatter ([Prettier Formatter for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
- Do not commit non-essential generated files like type definitions
- Do not commit `.env` file
- Keep this project and it dependencies up-to-date
