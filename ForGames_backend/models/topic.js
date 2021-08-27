'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Topic, { as: "UserTopics", onDelete:"CASCADE", hooks:true });
      models.Topic.belongsTo(models.User, { foreignKey: "UserId"});

      models.Game.hasMany(models.Topic, { as: "topics", onDelete:"CASCADE", hooks:true });
      models.Topic.belongsTo(models.Game,{ foreignKey:"GameId" });
    }
  };
  Topic.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};