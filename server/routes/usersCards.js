const express = require('express');
const router = express.Router();

const DELAY = 1000;

router.post('/', (req, res) => {
  const userId = req.body.userId;
  const cardId = req.body.cardId;
  try {
    req.app.db
      .get('usersCards')
      .push({
        userId: userId,
        cardId: cardId,
      })
      .write();

    const user = req.app.db.get('users').find({ id: userId }).value();

    setTimeout(() => {
      res.send({
        status: 'success',
        user,
        cardId,
      });
    }, DELAY);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:cardId', (req, res) => {
  const cardId = req.params.cardId;
  const joins = req.app.db.get('usersCards').filter({ cardId: cardId }).value();
  const users = joins.map(join => req.app.db.get('users').find({ id: join.userId }));

  setTimeout(() => {
    res.send(users);
  }, DELAY);
});

router.delete('/:cardId', (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.body.userId;

  req.app.db.get('usersCards').remove({ userId, cardId }).write();

  const user = req.app.db.get('users').find({ id: userId }).value();

  setTimeout(() => {
    res.send({
      status: 'success',
      user,
      cardId,
    });
  }, DELAY);
});

module.exports = router;
