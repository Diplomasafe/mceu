# MCEU API Service 📘

Welcome to the **MCEU API Service**, a robust Nest.js backend application for the Micro-Credentials platform within the European Union.

## Overview 🚀

The **MCEU API Service** serves as the backbone of the MCEU Micro-Credentials Platform, providing:

- **RESTful API Endpoints** 🌐: For both the Learner and Provider applications.
- **Database Management** 🗄️: Handling data related to users, credentials, and courses.
- **Integration with External Services** 🔗: Connecting with blockchain services like EBSI.

This application is essential for the functionality of the MCEU Learner and Provider SPAs, facilitating secure and efficient data transactions.

## Swagger Documentation 📖

The **MCEU API Service** provides a Swagger documentation interface for easy access to the API endpoints. To access the Swagger documentation, navigate to the following URL:

```bash
GET /documentation
```

## Getting Started 🛠️

### Database Setup

Before running the application, ensure that a **PostgreSQL database** is created and accessible with the credentials provided in your `.env` file
and create the Database before running the migrations.

```bash
npx mikro-orm database:create
```

### Run Database Migrations

After starting the Docker container, execute the **MikroORM migrations** to set up the database schema:

```bash
# Access the running container
docker exec -it <container_name_or_id> sh

# Inside the container, run migrations
npx mikro-orm migration:up
```

### Prerequisites

- **Docker** and **Docker Compose** installed on your machine.
- **PostgreSQL** database set up and accessible.

## Contributing 🤝

We welcome contributions! Please submit a pull request or raise an issue if you encounter any problems.
