'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    leftwords: DataTypes.BIGINT,
    lastreset: DataTypes.DATE
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};