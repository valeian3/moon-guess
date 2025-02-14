# MoonGuess

### About The Project

MoonGuess is a demo react + express + mongo app.

#### Built With

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/en/main)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JSON](https://img.shields.io/badge/JSON-000?logo=json&logoColor=fff)](https://www.json.org/json-en.html)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](https://www.docker.com/)

### Prerequisites

Understanding how react + vite work on client side and express + mongo on server side.

### For developers

Ensure to have env file configured correctly before running app i dev mode. Check env example file for more information.

#### Setup and run in dev mode

Clone the github repository:

```
git clone url
```

Navigate to the project directory:

```
cd moon-guess
```

Run the command to build image and run container in detach mode:

```
docker compose up -d
```

Stop the container (if your want)

```
docker compose down
```

Optional flags:

- `--build` - Build images before starting containers
- `-d` - Detached mode: Run containers in the background
