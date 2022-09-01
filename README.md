[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/Negri234279/PowerLog-backend)

## About The Project

Backend API build on node.js with express for PowerLog fronted trying to follow Clean Architecture principles and DDD


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

[![Node.js][Node.js]][Node-url]
[![Express][Express.js]][Express-url]
[![Docker][Docker]][Docker-url]

[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org

[Express.js]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com

[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://expressjs.com


## .env file

| KEY | VALUE |
| ------ | ------ |
| BACKEND_PORT | 3000 | 
| BACKEND_NAME | powerlog-backend |
| PG_HOST | powerlog-pg-db |
| PG_PORT | 5432 |
| PG_USER | postgres |
| PG_PASSWORD | postgres |
| PG_DATABASE | postgres |
| NGINX_PORT | 3100 |
| JWT_SECRET_KEY | token |



## Description

* **BACKEND_PORT**: port of the node api and used by the nginx proxy
* **BACKEND_NAME**: container name of the node api and used by the nginx proxy
* **DB_HOST**: name of the database container and used by the api for its connection
* **DB_PORT**: database port used by the api for its connection
* **DB_USER**:  database user and used by the api for its connection
* **DB_PASSWORD**: database password and used by the api for its connection
* **DB_NAME**: database name and used by the api for its connection
* **NGINX_PORT**: nginx proxy port, port used to communicate with the api


## How the network works ?

Docker containers communicate using their internal network via container name, so we only expose the nginx proxy port


## Getting Started

### Prerequisites

<a href='https://docs.docker.com'/>Docker</a> and <a href='https://docs.docker.com/engine/reference/commandline/compose'/>Docker compose</a>


### Usage

Build the server:
```
docker compose -f "docker-compose.dev.yml" up -d --build
```

Down the server:
```
docker compose -f "docker-compose.dev.yml" down
```

Start the server:
```
docker compose -f "docker-compose.dev.yml" start
```

Stop the server:
```
docker compose -f "docker-compose.dev.yml" stop
```