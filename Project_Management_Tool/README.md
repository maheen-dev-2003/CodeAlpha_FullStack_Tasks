# Project Management Tool

A full-stack Project Management Tool developed as part of the **CodeAlpha Full Stack Development Internship**.

## Features

- User authentication
- Project management
- Task management
- Project CRUD operations
- Task CRUD operations
- Task status tracking
- Task priority management
- Team collaboration
- Project and task relationship
- REST API
- MongoDB database
- Real-time communication with Socket.IO

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- CORS
- dotenv

## API Endpoints

### Projects

- `POST /api/projects` — Create a project
- `GET /api/projects` — Get all projects
- `GET /api/projects/:id` — Get a single project
- `PUT /api/projects/:id` — Update a project
- `DELETE /api/projects/:id` — Delete a project

### Tasks

- `POST /api/tasks` — Create a task
- `GET /api/tasks` — Get all tasks
- `GET /api/tasks/:id` — Get a single task
- `PUT /api/tasks/:id` — Update a task
- `DELETE /api/tasks/:id` — Delete a task

## Project Structure

```text
Project_Management_Tool/
├── config/
├── Project.js
├── Task.js
├── db.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md