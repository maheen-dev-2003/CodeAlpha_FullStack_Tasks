# Project Management Tool

A backend Project Management Tool developed as part of the **CodeAlpha Full Stack Development Internship**.

## Features

* Project management
* Task management
* Project CRUD operations
* Task CRUD operations
* Task status tracking
* Task priority management
* Project and task relationship
* REST API
* MongoDB database

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* dotenv

## API Endpoints

### Projects

* `POST /api/projects` — Create a project
* `GET /api/projects` — Get all projects
* `GET /api/projects/:id` — Get a single project
* `PUT /api/projects/:id` — Update a project
* `DELETE /api/projects/:id` — Delete a project

### Tasks

* `POST /api/tasks` — Create a task
* `GET /api/tasks` — Get all tasks
* `GET /api/tasks/:id` — Get a single task
* `PUT /api/tasks/:id` — Update a task
* `DELETE /api/tasks/:id` — Delete a task

## Project Structure

```text
Project_Management_Tool/
├── Project.js
├── Task.js
├── db.js
├── server.js
├── package.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository.
2. Open the `Project_Management_Tool` folder.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

5. Start the server:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

## Database

This project uses **MongoDB** with **Mongoose** for database management.

The `.env` file contains sensitive configuration and is excluded from GitHub using `.gitignore`.

## Internship

Developed as part of the **CodeAlpha Full Stack Development Internship**.
