## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Docker Setup](#docker-setup)

---


## Getting Started

Application integrates e-commerce platform IdoSell with OpenAI.

---

## Available Scripts

```env
DATABASE_HOST='1.1.1.1'
DATABASE_PORT=5432
DATABASE_USERNAME='postgres'
DATABASE_PASSWORD='password'
DATABASE_DATABASE='postgres'
JENKINS_TOKEN='password'
JENKINS_USER='BuildUser'
JENKINS_PASSWORD='password'
OPENAI_API_KEY='sk-key'
CLIENT_ID='id'
CLIENT_SECRET='secret'
```

In the project directory `Server`, you can run:

### `npm run start:dev`

Runs the app in the development & watch mode.<br>
Open [http://localhost:3000/api](http://localhost:3000/api) to view swagger API docs in browser (only available in development mode).<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>

In the project directory `Client`, you can run:

### `npm run dev`

Runs the app in the development.<br>

---

## Docker Setup
 
To run containers do
```bash
docker compose up 
```
This command will run 5 containers for PostGreSQL, pgAdmin4, Nest.js, Next.js and Jenkins.

---

