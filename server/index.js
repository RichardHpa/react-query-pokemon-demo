// server/index.js
const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 3001;

// app.get('/api/users', (req, res) => {
//   return res.json(users);
// });

// create your initial DB
if (!fs.existsSync('./server/db.json')) {
  const obj = {
    table: [],
  };
  const json = JSON.stringify(obj);
  fs.writeFile('./server/db.json', json, err => {
    if (err) throw err;
  });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
