const express = require('express');
const router = express.Router();

const DELAY = 1000;

router.get('/totalValue', (req, res) => {
  let value = 0;
  const matches = req.app.db.get('usersCards').value();
  matches.forEach(match => {
    const card = req.app.db.get('cards').find({ id: match.cardId }).value();
    value += card.value;
  });

  setTimeout(() => {
    res.json({
      totalValue: value,
    });
  }, DELAY);
});

module.exports = router;
