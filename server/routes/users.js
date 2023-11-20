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

router.get('/:userId', (req, res) => {
  const user = req.app.db.get('users').find({ id: req.params.userId }).value();

  setTimeout(() => {
    res.send(user);
  }, DELAY);
});

router.put('/:userId', (req, res) => {
  try {
    req.app.db.get('users').find({ id: req.params.userId }).assign(req.body).write();

    setTimeout(() => {
      res.send(req.app.db.get('users').find({ id: req.params.userId }));
    }, DELAY);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete('/:userId', (req, res) => {
  req.app.db.get('users').remove({ id: req.params.userId }).write();

  setTimeout(() => {
    res.sendStatus(200);
  }, DELAY);
});

router.get('/:userId/cards', (req, res) => {
  const userId = req.params.userId;
  const joins = req.app.db.get('usersCards').filter({ userId }).value();
  const cards = joins.map(join => req.app.db.get('cards').find({ id: join.cardId }));

  setTimeout(() => {
    res.send(cards);
  }, DELAY);
});

module.exports = router;
