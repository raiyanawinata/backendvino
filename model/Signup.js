const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../../be/config/database");

const Signup = sequelize.define('Signup', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrongPassword: {
          args: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          msg:
            'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
        },
    },
    },
  });
  
  module.exports = {
    sequelize,
    Signup,
  };