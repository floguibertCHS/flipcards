'use strict';
module.exports = function(sequelize, DataTypes) {
  var flipcard = sequelize.define('flipcard', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  });
   flipcard.associate = function (models) {
    // flipcard.belongsTo(models.decks);
  }
  return flipcard;
};