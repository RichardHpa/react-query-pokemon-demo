const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const DELAY = 1000;

router.get('/', (req, res) => {
  const cards = req.app.db.get('cards');

  setTimeout(() => {
    res.send(cards);
  }, DELAY);
});

router.post('/', (req, res) => {
  try {
    const card = {
      id: uuidv4(),
      ...req.body,
    };
    req.app.db.get('cards').push(card).write();

    setTimeout(() => {
      res.send(card);
    }, DELAY);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', (req, res) => {
  const card = req.app.db.get('cards').find({ id: req.params.id }).value();

  setTimeout(() => {
    res.send(card);
  }, DELAY);
});

router.put('/:id', (req, res) => {
  try {
    req.app.db.get('cards').find({ id: req.params.id }).assign(req.body).write();

    setTimeout(() => {
      res.send(req.app.db.get('cards').find({ id: req.params.id }));
    }, DELAY);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete('/:id', (req, res) => {
  req.app.db.get('cards').remove({ id: req.params.id }).write();

  setTimeout(() => {
    res.sendStatus(200);
  }, DELAY);
});

router.patch('/:id/updatePrice', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`);
    const tcgPlayer = response.data.data.tcgplayer;
    if (!tcgPlayer) {
      throw new Error('cant find prices');
    }
    const arr = Object.keys(tcgPlayer.prices).map(key => {
      return tcgPlayer.prices[key].market;
    });
    const max = Math.max(...arr);
    const card = req.app.db.get('cards').find({ apiId: id }).assign({ value: max }).write();

    setTimeout(() => {
      res.send(card);
    }, DELAY);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
