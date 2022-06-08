# Collect Data Web

## Instalação

Collect Data requer [Node.js](https://nodejs.org/) v10+ para execução e a biblioteca do [React](https://pt-br.reactjs.org/).

Crie uma cópia do arquivo `.env.example` e renomeie-o para `.env`

Instale as dependências e inicie o servidor.

```sh
.env
REACT_APP_ENV=development
```

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

```sh
cd collect_data
cd web
npm i
npm start
```

**ou** execute os arquivos `.bat` na seguinte sequência

```sh
_install.bat
_start.bat
```

## License

MIT