const express = require('express');
const connectDB = require('./db/db');
const port = process.env.PORT
var cors = require('cors');


// routes
const boards = require('./routes/api/boards');
const lists = require('./routes/api/lists');
const cards = require('./routes/api/cards');
const users = require('./routes/api/users');

const app = express();

connectDB();

//cors
app.use(cors({ origin: true, credentials: true}));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/boards', boards);
app.use('/api/lists', lists);
app.use('/api/cards', cards);
app.use('/api/users', users);

app.listen(port, () => console.log(`Server running on port ${port}`));

