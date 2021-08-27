'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Topic.hasMany(models.Answer, { as: "answers", onDelete:"CASCADE", hooks:true });
      models.Answer.belongsTo(models.Topic, { foreignKey:"TopicId"});
    }
  };
  Answer.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};