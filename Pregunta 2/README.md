<h2 align="center"><b>NestJS</b></h2>
<h3 align="center"><b>API</b></h3>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://github.com/estebangarviso/nestjs-template" target="_blank">
	<img src="https://img.shields.io/github/license/estebangarviso/nestjs-template" alt="Package License" />
  </a>
</p>

## 📥 **Getting Started**

- Install [NodeJS](https://nodejs.org/es/).
- Install [PNPM](https://pnpm.io/installation)
- Execute `pnpm install` command.
- Run either `pnpm start:dev` or `pnpm test:dev` commands.

- Using Docker.
    - Exec `pnpm exec env export -p ".env" -e dev -m build`
    - Exec `docker build --no-cache -f Dockerfile --tag image_name .`
    - Exec `docker run --env-file .env -d -it -p 8080:8080/tcp --name container_name image_name`
    - Open `http://localhost:8080/api/currency-exchange` in browser

## 📋 **Branches and Environments**

Project has 2 environments (infrastructure) base for project building.

- **dev (development)**: environment with breaking changes and new features.
- **release (production)**: release environment.

## 🧪 **Executing**

Project uses **npm scripts** for eases execution, testing and building.
Many of these script run on a defined environment, specified after ':', and
it environment may be 'dev' or 'release'.

| Command                      | Action                       |
| ---------------------------- | ---------------------------- |
| node start:`<env>`           | executes the app             |
| pnpm build:`<env>`           | build the app                |
| pnpm preview                 | builds and serves the app    |
| pnpm test:`<env>`            | executes tests               |
| pnpm test:`<env>` --coverage | executes tests with coverage |
| pnpm env:schema              | updates env JSON schema      |
| pnpm format                  | code format                  |
| pnpm lint                    | code style review            |

## 🔥 **Helping Commands**

| Command                     | Action                    |
| --------------------------- | ------------------------- |
| (get-command node.exe).Path | get current node exe path |
