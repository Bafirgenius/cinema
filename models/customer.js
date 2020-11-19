'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsToMany(models.Movie, {
        through: "CustomerMovies",
        foreignKey: "CustomerId"
      });
    }
    getFullName() {
      return `${this.first_name} ${this.last_name}`;
    }
  };
  Customer.init({
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
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone number is required."
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Gender is required."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  
  return Customer;
};