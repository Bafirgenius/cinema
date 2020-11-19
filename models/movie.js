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
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};