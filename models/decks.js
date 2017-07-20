'use strict';
module.exports = function(sequelize, DataTypes) {
  var decks = sequelize.define('decks', {
    deckname: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    flipcardId: DataTypes.INTEGER
  });
   decks.associate = function (models) {
    // decks.belongsTo(models.users);
    // decks.hasMany(models.flipcard);
  }
  return decks;
};