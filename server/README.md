# Collect Data Server

## Instalação

Collect Data requer [Node.js](https://nodejs.org/) v10+ para execução.

Configure a conexão com seu banco de dados.

Crie uma cópia do arquivo `.env.example` e renomeie-o para `.env`

```sh
.env
DB_DRIVE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=collect_data
DB_USERNAME=
DB_PASSWORD=
```

Instale as dependências e inicie o servidor.

```sh
.env
APP_ENV=development
```

```sh
cd collect_data
cd server
npm i
npm run knex:migrate
npm run knex:seed
npm run dev
```

Para ambientes de produção...

```sh
.env
APP_ENV=production
```

```sh
cd collect_data
cd server
npm i
npm run knex:migrate
npm start
```

## License

MIT