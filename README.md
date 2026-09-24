# ProjectFlow — Project Management Tool

A full-stack project management application developed as part of the **CodeAlpha Full Stack Development Internship**.

ProjectFlow provides a dashboard for creating and managing projects and tasks through a frontend connected to a Node.js/Express REST API and MongoDB database.

## Features Implemented

* **Dashboard** — Displays live project and task statistics.
* **Projects** — Create and view projects with name, description, and status.
* **Tasks** — Create and view tasks associated with projects.
* **Task Management** — Edit and delete tasks.
* **Task Details** — Supports status, priority, due date, description, and project selection.
* **Backend Status** — Shows whether the backend API is online.
* **Live Overview** — Displays Projects vs Tasks data from the API.
* **MongoDB Integration** — Project and task data is stored in MongoDB.
* **REST API** — Frontend communicates with the Express backend using API requests.

## Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Fetch API

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Tools

* Visual Studio Code
* Git
* GitHub
* Node.js / npm

## Project Structure

```text
CodeAlpha_FullStack_Tasks-main/
│
├── Project_Management_Tool/
│   │
│   ├── frontend/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── models/
│   │   └── Project.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── Project.js
│   ├── Task.js
│   ├── package.json
│   └── package-lock.json
│
├── Task1_Ecommerce/
│
└── Task2_SocialMedia/
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/maheen-dev-2003/CodeAlpha_FullStack_Tasks.git
```

### 2. Open the Project Management Tool

```bash
cd CodeAlpha_FullStack_Tasks/Project_Management_Tool
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MongoDB

Create a `.env` file inside the `Project_Management_Tool` folder:

```env
MONGO_URI=your_mongodb_connection_string
```

The application can use a MongoDB Atlas connection string.

### 5. Start the backend

```bash
npm start
```

The backend runs on:

```text
http://127.0.0.1:5000
```

### 6. Run the frontend

Open the following file with VS Code Live Server:

```text
Project_Management_Tool/frontend/index.html
```

The frontend communicates with:

```text
http://127.0.0.1:5000/api
```

## API Endpoints

### Health Check

```text
GET /api/health
```

### Projects

```text
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Tasks

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## CRUD Operations

| Operation | Projects | Tasks |
| --------- | -------- | ----- |
| Create    | ✅        | ✅     |
| Read      | ✅        | ✅     |
| Update    | ✅        | ✅     |
| Delete    | ✅        | ✅     |

## Dashboard

The ProjectFlow dashboard provides:

* Total Projects
* Total Tasks
* Backend Status
* Live Projects vs Tasks overview
* Project Database
* Task Monitor
* Create Project form
* Create Task form

## Database

ProjectFlow uses **MongoDB** with **Mongoose**.

MongoDB Atlas can be used as the database service. Database credentials are stored through environment variables rather than being included directly in the source code.

## Security

* Environment variables are used for sensitive database configuration.
* `.env` is excluded from Git using `.gitignore`.
* User-generated project and task text is safely escaped before being displayed in the frontend.

## Internship

This project was developed as part of the:

**CodeAlpha Full Stack Development Internship**

The project demonstrates practical experience with:

* Frontend development
* Backend development
* REST APIs
* MongoDB
* Mongoose
* CRUD operations
* API integration
* Git and GitHub

## Author

**Maheen**

GitHub: https://github.com/maheen-dev-2003/CodeAlpha_FullStack_Tasks

## Project Status

**Completed ✅**

The ProjectFlow application has a functional frontend, Express backend, MongoDB integration, REST API communication, and complete CRUD functionality for projects and tasks.
