'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Answer, { as: "answers", onDelete:"CASCADE", hooks:true });
      models.Answer.belongsTo(models.User);

      models.User.hasMany(models.Topic, { as: "topics", onDelete:"CASCADE", hooks:true });
      models.Topic.belongsTo(models.User);
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    profile_picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};