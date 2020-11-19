'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require("../helpers/bcryptHelper");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
    }
    
    static getFullName(first_name, last_name) {
      return `${first_name} ${last_name}`;
    }
  };
  Admin.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "First name is required."
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
            msg: "Last name is required."
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username is required."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });

  Admin.beforeCreate((instance, options) => {
    let hashed = hash(instance.password);
    instance.password = hashed;
  });

  return Admin;
};