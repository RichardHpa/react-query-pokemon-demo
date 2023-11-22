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
    res.json(users);
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
      res.json(user);
    }, DELAY);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:userId', (req, res) => {
  const rawUser = req.app.db.get('users').find({ id: req.params.userId }).value();

  const user = {
    ...rawUser,
    totalValue: utils.getTotalInvestmentPerUser(req.app.db, req.params.userId),
  };
  setTimeout(() => {
    res.json(user);
  }, DELAY);
});

router.put('/:userId', (req, res) => {
  try {
    req.app.db.get('users').find({ id: req.params.userId }).assign(req.body).write();

    setTimeout(() => {
      res.json(req.app.db.get('users').find({ id: req.params.userId }));
    }, DELAY);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete('/:userId', (req, res) => {
  req.app.db.get('users').remove({ id: req.params.userId }).write();
  req.app.db.get('usersCards').remove({ userId: req.params.userId }).write();

  setTimeout(() => {
    res.sendStatus(200);
  }, DELAY);
});

router.get('/:userId/cards', (req, res) => {
  const userId = req.params.userId;
  const joins = req.app.db.get('usersCards').filter({ userId }).value();
  const cards = joins.map(join => req.app.db.get('cards').find({ id: join.cardId }));

  setTimeout(() => {
    res.json(cards);
  }, DELAY);
});

module.exports = router;
