# Setting up Typescript

In this section you will learn how to properly setup a TypeScript project from scratch or above an existing JavaScript project.

## Before starting

Through this guide you will see oftenly the use of the `npx` command.

`npx` is an generally avaiable executable coming with npm (so you have it already). It allows you to execute a NodeJS executable dependency (such as `tsc` as will see). But If you haven't installed the dependency, `npx` will download and execute it without modify the `package.json` file.

## Getting started

Use the node package manager to install TypeScript itself. You must install it as dev dependency because you will not need it on production environment.

```bash
npm install --save-dev typescript
```

## Configure TypeScript

You need to create a `tsconfig.json` file at the root of your project. This file allows you to customize TypeScript.

You can generate it automatically using the following command

```bash
npx tsc --init
```

Or you can create it by ourself and fill it with your own needs.

Here is a light and simple `tsconfig.json` file example

```json
{
  "compilerOptions": {
    "target": "es2019",
    "module": "commonjs",
    "lib": ["esnext"],
    "strict": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "exclude": ["prisma"]
}
```

- **compilerOptions.target** : choose which ECMAScript standard the built code will use (modern ones will need recent NodeJS versions)
- **compilerOptions.module** : choose which _import_ synthax your built code will use
  - **commonjs** : Old way (better compatibility)
    ```js
    const xxx = require('dependency')
    ```
  - **esmodule** : Modern way
    ```js
    import {} from 'dependency'
    ```
- **compilerOptions.lib** : an array of default types definition files (like `.h` file in C++ language) to import
  - For example : _["esnext"]_ loads _esnext_ definition file that allows you to use _esnext_ features
- **compilerOptions.strict** : If strict mode is activated (true) it will validate your code using strict types rules. Which are :
  - [noImplicitAny](https://www.typescriptlang.org/tsconfig/#noImplicitAny)
  - [noImplicitThis](https://www.typescriptlang.org/tsconfig/#noImplicitThis)
  - [strictNullChecks](https://www.typescriptlang.org/tsconfig/#strictNullChecks)
  - [strictPropertyInitialization](https://www.typescriptlang.org/tsconfig/#strictPropertyInitialization)
  - [strictBindCallApply](https://www.typescriptlang.org/tsconfig/#strictBindCallApply)
  - [strictFunctionTypes](https://www.typescriptlang.org/tsconfig/#strictFunctionTypes)
- **compilerOptions.outDir** : specify the folder where your build code will be stored
- **compilerOptions.rootDir** : inform TypeScript which folder of your project is considered as your root. All `.ts` files must be in this folder
- **exclude** : inform TypeScript which folders must be excluded during build-time

## Replace JavaScript code by TypeScript code

If you want to install TypeScript over an existing JavaScript project you must replace all your `.js` files extension by `.ts`.

You can now use the new _esmodule_ import synthax

```ts
// replace this
const xxx = require('dependency')

// By that
import { xxx } from 'dependency'
```

If you use third-party code (like [Express](https://expressjs.com/) for instance) you will need a types definition file (`.d.ts` file) in order to use it properly. Otherwise, the dependency code will be considered as `any` and you won't take advantage of TypeScript's capabilities (and maybe a compilation error).

Some of dependencies are already built with TypeScript or have a `.d.ts` file. In this case you have nothing to do, it will just work.

For the ones in plain JavaScript or without `.d.ts` (such as Express), you will need to write your own definition type. Fortunately, the [DefinitelyTyped](https://github.com/DefinitelyTyped) community wrote the type definition of thousands dependencies (so no need to do it yourself). You can import the types definition just by installing it through npm.

```bash
npm install --save-dev @types/DEPENDENCY_NAME
```

- For Express : `npm install --save-dev @types/express`
- For bcryptjs : `npm install --save-dev @types/bcryptjs`
- And so on...

## Compile TypeScript code

Typescript come with it own builder named **tsc** (for TypeScript Compiler). You can use it out-of-the-box by using the following command `npx tsc`. If your follow the previous sections of this guide, you will see a _dist_ folder popping after running this command.

I strongly recommand writting a `build` script inside your `package.json` that will run `tsc` command.

As most of modern host providers (such as [AWS](https://aws.amazon.com/), [Heroku](https://www.heroku.com/) or [Netlify](https://www.netlify.com/)) will automatically run npm `install` and `start` commands after deployment, I recommand to write a `start` script too.
This script will simply run your node server through you built code (`server.js` file in our case)

```json
{
  // ...
  "scripts": {
    // ...
    "start": "node dist/server.js",
    "build": "tsc"
    // ...
  }
  // ...
}
```

## Setting linter and code formatter

As you are a good developer, you may want setting up a linter and a code formatter for your TypeScript project.

In short, a linter is a tool that will verify that your code respect some rules (for example : no var should be unused) that may help you to maintain a cleaner and less error-prone code.
A code formatter will automatically transform your code to adopt a style convention (for example : replace all double quotes by single quotes).

Here is a bundle of powerful tools :

- [Prettier](https://prettier.io/) : JavaScript/TypeScript code formatter
- [ESLint](https://eslint.org/) : JavaScript linter
- [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint#readme) : TypeScript support for ESLint
- [ESLint Prettier Plugin](https://github.com/prettier/eslint-plugin-prettier) : Prettier support for ESLint
- [ESLint Prettier Config](https://github.com/prettier/eslint-config-prettier) : Disable ESLint rules that may conflict with Prettier

Install them through npm

```
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

Finally, you will need to write a `.eslintrc` file (don't forget the point!) at your project root to configure ESLint.

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["plugin:@typescript-eslint/recommended", "prettier"]
}
```

### And what about TSLint ?

You may have heard of a tool named [TSLint](https://palantir.github.io/tslint/) which is a TypeScript linter.

You **MUST** not use it. Palentir deprecated it and now recommands to switch from `TSLint` to `Typescript Eslint` (see above)

### More

> If you're using [Visual Studio Code](https://code.visualstudio.com/) you may want to install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) as it can auto format your code on save.

VSCode recommanded configuration for Prettier

```json
{
  // ...
  "editor.formatOnType": false,
  "editor.formatOnSave": true,
  "prettier.printWidth": 120,
  "prettier.bracketSpacing": true,
  "prettier.singleQuote": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Documentation

- Typescript official website : https://www.typescriptlang.org/
- Typescript config page : https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
- Typescript lib page : https://www.typescriptlang.org/tsconfig#lib
- How strict is Typescript's strict mode? : https://dev.to/briwa/how-strict-is-typescript-s-strict-mode-311a
