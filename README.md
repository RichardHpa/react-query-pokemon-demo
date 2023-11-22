# React Query v5 Demo using the PokemonAPI

## Technology

- [Create React App](https://github.com/facebook/create-react-app)
- [React Query](https://tanstack.com/query/latest)
- [Material UI](https://mui.com/)
- [Express](https://expressjs.com/)
- [Pokemon API](https://docs.pokemontcg.io/)
- [lowdb](https://github.com/typicode/lowdb)

## Setup

You will need to create a `.env` file to configure the ports and backend server.  
I have included a `.env.example` which you can use as a default config

```sh
REACT_APP_PORT=3001
REACT_APP_API_BASE=http://localhost

```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs both the react app and the express server using concurrently

### `yarn start:frontend`

Starts only the front end react app(the app wont be able to run as it does need the backend running)

### `yarn start:backend`

Starts the back end express server
