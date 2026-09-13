# Fieldwork — Project Management Tool (Task 3)

A collaborative project management tool similar to Trello/Asana. Users can
create group projects, assign tasks, comment on tasks, and see updates from
teammates in real time via WebSockets.

## Features implemented

- **Auth system**: register/login with hashed passwords (bcrypt) and JWT sessions.
- **Projects**: create projects, invite teammates by email, view all projects you own or belong to.
- **Task boards**: Kanban-style board (To Do / In Progress / Done) with drag-and-drop status changes.
- **Task cards**: title, description, priority, due date, assignee.
- **Comments**: comment threads on each task for team communication.
- **Real-time updates (bonus)**: Socket.io pushes live updates to everyone viewing a project — new tasks, moved tasks, new comments, and new members appear instantly without a refresh.

## Tech stack

- **Frontend**: HTML, CSS, vanilla JavaScript (no framework needed — keeps it simple and dependency-free)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (via Mongoose)
- **Auth**: JSON Web Tokens (JWT) + bcryptjs
- **Real-time**: Socket.io

## Project structure

```
project-management-tool/
├── backend/
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── middleware/
│   │   └── auth.js              # JWT verification + project membership check
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth/*
│   │   ├── projectRoutes.js     # /api/projects/*
│   │   └── taskRoutes.js        # /api/tasks/*
│   ├── server.js                # Express app + Socket.io setup
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── index.html
    ├── css/styles.css
    └── js/
        ├── api.js               # fetch() wrapper for the backend API
        └── app.js                # UI rendering, state, drag-and-drop, sockets
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI (local MongoDB or MongoDB Atlas) and a JWT_SECRET
npm run dev        # starts on http://localhost:5000
```

You'll need MongoDB running locally (`mongodb://localhost:27017`) or a free
MongoDB Atlas cluster — just paste its connection string into `MONGO_URI`.

### 2. Frontend

The frontend is static — no build step required. From the `frontend/` folder,
serve it with any static server, for example:

```bash
cd frontend
npx serve .        # or: python3 -m http.server 5500
```

Then open the printed URL (e.g. `http://localhost:5500`) in your browser.

> If you serve the frontend on a different port, update `CLIENT_URL` in the
> backend's `.env` so CORS allows it, and update `API_BASE_URL` at the top of
> `frontend/js/api.js` if your backend isn't on `localhost:5000`.

## How to use it

1. Create an account (or log in).
2. Click **+ New project** to create a project.
3. Click **Invite** to add a teammate by email (they must already have an account).
4. Click **+ Add task** to create task cards; drag cards between columns to update status.
5. Click any task card to open it, edit details, or leave comments — comments and board changes sync live to every teammate viewing the same project.

## API overview

| Method | Endpoint                          | Description                     |
|--------|------------------------------------|----------------------------------|
| POST   | /api/auth/register                | Create an account                |
| POST   | /api/auth/login                   | Log in, receive a JWT            |
| GET    | /api/auth/me                      | Get current user                 |
| GET    | /api/projects                     | List your projects               |
| POST   | /api/projects                     | Create a project                 |
| GET    | /api/projects/:projectId          | Get a project + its tasks        |
| POST   | /api/projects/:projectId/members  | Invite a member by email         |
| DELETE | /api/projects/:projectId          | Delete a project (owner only)    |
| POST   | /api/tasks                        | Create a task                    |
| PUT    | /api/tasks/:taskId                | Update a task (status, etc.)     |
| DELETE | /api/tasks/:taskId                | Delete a task                    |
| GET    | /api/tasks/:taskId/comments       | List comments on a task          |
| POST   | /api/tasks/:taskId/comments       | Add a comment to a task          |

All routes except register/login require `Authorization: Bearer <token>`.

## Real-time events (Socket.io)

Client connects with `auth: { token }`. Events emitted by the server:

- `project:invited`, `project:memberAdded`, `project:deleted`
- `task:created`, `task:updated`, `task:deleted`
- `comment:created`
