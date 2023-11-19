const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const utils = require('../utils');

const DELAY = 1000;

router.get('/', (req, res) => {
  const rawUsers = req.app.db.get('users').value();

  const users = rawUsers.map(user => ({
    ...user,
    cardCount: utils.getCardCountPerUser(req.app.db, user.id),
    totalValue: utils.getTotalInvestmentPerUser(req.app.db, user.id),
  }));

  setTimeout(() => {
    res.send(users);
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

router.get('/:id', (req, res) => {
  const user = req.app.db.get('users').find({ id: req.params.id }).value();

  setTimeout(() => {
    res.send(user);
  }, DELAY);
});

router.put('/:id', (req, res) => {
  try {
    req.app.db.get('users').find({ id: req.params.id }).assign(req.body).write();

    setTimeout(() => {
      res.send(req.app.db.get('users').find({ id: req.params.id }));
    }, DELAY);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete('/:id', (req, res) => {
  req.app.db.get('users').remove({ id: req.params.id }).write();

  setTimeout(() => {
    res.sendStatus(200);
  }, DELAY);
});

module.exports = router;
