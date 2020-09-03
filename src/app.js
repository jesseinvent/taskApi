const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task-route');
const userRoutes = require('./routes/user-route');
const sanitizer = require('express-mongo-sanitize');
const db = require('./config/mongodb');

const app = express();

// Connect to db
db.connect();

// express body parsers parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cross-origin request sharing (cors) middleware
app.use(cors());

// mongodb sanitizer
app.use(sanitizer());

// Index route
app.get('/', (req, res) => {
  res.send('Welcome to task manager API');
});

// Tasks routes
app.use('/api/tasks', taskRoutes);

// Users routes
app.use('/api/users', userRoutes);

// Invalid route
app.use((req, res, next) => {
  res.status(404).json({message: 'Invalid route'});
})

module.exports = app;
