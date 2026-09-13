require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const server = http.createServer(app);

// --- Middleware ---
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// --- Database ---
connectDB();

// --- Socket.io setup ---
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || '*' },
});

// Authenticate socket connections using the same JWT as the REST API
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication error: no token provided'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error('Authentication error: invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id} (user ${socket.userId})`);

  // Personal room for direct notifications (e.g. project invites)
  socket.join(`user:${socket.userId}`);

  // Client asks to join a specific project's room to receive live board updates
  socket.on('project:join', (projectId) => {
    socket.join(`project:${projectId}`);
  });

  socket.on('project:leave', (projectId) => {
    socket.leave(`project:${projectId}`);
  });

  // Lightweight "user is typing a comment" indicator
  socket.on('task:typing', ({ taskId, userName }) => {
    socket.to(`project:${socket.projectId}`).emit('task:typing', { taskId, userName });
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Make io accessible in route handlers via req.app.get('io')
app.set('io', io);

// --- Routes ---
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
