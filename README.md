# Task Manager Application

Este proyecto fue construido con las siguientes tecnologías

* **Backend:** NodeJS con Arquitectura Hexagonal
* **Frontend:** React
* **BD:** MongoDB
* **Framework CSS:** TailwindCSS

## Prerequisites

Before you begin, ensure you have the following installed:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/) (Recommended for local development but not strictly required for running with Docker)
* [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/)) (Recommended for local development but not strictly required for running with Docker)

## Ejecutar el aplicativo con Docker Compose

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/luig2-prog/prueba-tecnica-domina.git
    cd prueba-tecnica-domina
    ```

1.  **Inicia los servicios:**

    ```bash
    docker-compose up --build -d
    ```

2.  **Accede al aplicativo:**

    Once the containers are up and running, you can access the application in your browser at:

    ```
    http://localhost:3000
    ```

## Parar el aplicativo

To stop and remove the containers, run:

```bash
docker-compose down
```


![alt text](/imgs/image.png)