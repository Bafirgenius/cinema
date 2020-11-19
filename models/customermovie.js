'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CustomerMovie extends Model {
    static associate(models) {
    }
  };
  CustomerMovie.init({
    seat: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Seat is required."
        }
      }
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Customer is required"
        }
      }
    },
    MovieId: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Something is wrong with the MovieId. Go back to previous page and retry."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CustomerMovie',  
  });

  return CustomerMovie;
};