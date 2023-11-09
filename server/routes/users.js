const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const DELAY = 1000;

router.get('/', (req, res) => {
  const books = req.app.db.get('users');

  setTimeout(() => {
    res.send(books);
  }, DELAY);
});

router.post('/', (req, res) => {
  try {
    const user = {
      id: uuidv4(),
      ...req.body,
    };
    req.app.db.get('users').push(user).write();

    setTimeout(() => {
      res.send(user);
    }, DELAY);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
