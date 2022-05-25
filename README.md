# Collect Data
O sistema Collect Data é um aplicativo para estúdios de tatuagem com agendamento, histórico de saúde do cliente e contrato do serviço.
 
## Instalação

Collect Data requer [Node.js](https://nodejs.org/) v10+ para execução.

Configure a conexão com seu banco de dados.

```sh
.env
DB_DRIVE=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

Instale as dependências e devDependencies e inicie o servidor.

```sh
cd collect_data
cd server
npm i
npm run dev
```

Para ambientes de produção...

```sh
.env
APP_ENV=production
```

Em seguida, instale as dependências e devDependencies e inicie o cliente.

```sh
cd collect_data
cd web
npm i
npm start
```

Para ambientes de produção...

```sh
.env
REACT_APP_ENV=production
```

## Tecnologias

O aplicativo Collect Data será desenvolvido em:

- Node.js (Express, Knex.js)
- Java 
- MySQL
- ReactJS (Bootstrap 4, Styled Components e Font Awesome)

## Autores

| [<img src="https://avatars.githubusercontent.com/u/32038004?s=96&v=4"><br><sub>@limazia</sub>](https://github.com/limazia) |
| :---: |

## License

MIT
