## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash

$ Tener instalado docker y docker compose

$ clonar repositorio

$ Crear archivo .env.local en el repo clonado con estas variables para que el docker levante

$ NODE_ENV=local
$ DATABASE_TYPE=postgres
$ DATABASE_HOST=host.docker.internal
$ DATABASE_PORT=5432
$ POSTGRES_USER=usuario
$ POSTGRES_PASSWORD=pass
$ POSTGRES_DB=ejemplodebase
$ HOST=http://localhost:8000

$ npm install

$ correr el comando sh docker-redeploy.sh

$ Una vez levantado los contenedores probar endpoints


```

## Como probar la app

````bash
# development
$ En la carpeta del repositorio se encuentra la coleccion de postman con todos los endpoints, importarlos a postman.

## Test

```bash
# unit tests
$ npm run test: all

````

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
