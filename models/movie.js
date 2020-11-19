'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsToMany(models.Customer, {
        through: "CustomerMovies",
        foreignKey: "MovieId"
      });
    }
  };
  Movie.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required."
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Genre is required."
        }
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          args: true,
          msg: "Date is required."
        }
      }
    },
    time: {
      type: DataTypes.TIME,
      validate: {
        notEmpty: {
          args: true,
          msg: "Time is required."
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};