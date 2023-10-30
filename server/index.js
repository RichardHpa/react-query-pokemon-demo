const express = require('express');
const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');
const morgan = require('morgan');
const usersRouter = require('./routes/users');

const dbRoute = './server/db.json';

// create your initial DB
if (!fs.existsSync(dbRoute)) {
  fs.writeFile(dbRoute, {}, err => {
    if (err) throw err;
  });
}

const adapter = new FileSync(dbRoute);
const db = low(adapter);

db.defaults({ users: [] }).write();

const app = express();
app.db = db;

// Set up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/users', usersRouter);

const PORT = 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
