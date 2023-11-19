module.exports.getTotalCards = function (db) {
  return [];
};

module.exports.getCardCountPerUser = function (db, userId) {
  const count = db.get('usersCards').filter({ userId }).value().length;
  return count;
};

module.exports.getTotalInvestmentPerUser = function (db, userId) {
  let value = 0;
  const matches = db.get('usersCards').filter({ userId }).value();
  matches.forEach(match => {
    const card = db.get('cards').find({ id: match.cardId }).value();
    value += card.value;
  });

  return value;
};
