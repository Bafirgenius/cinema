const ProductionHouseController = require("../controllers/ProductionHouseController");
const CastController = require("../controllers/CastController");
const { Movie, ProductionHouse, Cast, MovieCast } = require("../models/index");

class MovieController {
    static read(req, res) {
        Movie.findAll({
            order: [["released_year", "DESC"]],
            include: ProductionHouse
        })
            .then((data) => {
                res.render("movieList", { movies: data });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static addForm(req, res) {
        let errors = req.query.error ? req.query.error.split(",") : [];
        res.render("addMovieForm", { errors });
    }

    static addPost(req, res) {
        let obj = {
            name: req.body.name,
            genre: req.body.genre
        }
        if (req.body.released_year.trim() !== "") {
            obj.released_year = Number(req.body.released_year);
        } else {
            obj.released_year = req.body.released_year;
        }

        Movie.create(obj)
            .then((data) => {
                res.redirect("/movies");
            })
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    let errors = [];
                    for (let i = 0; i < err.errors.length; i++) {
                        if (!errors.includes(err.errors[i].message)) {
                            errors.push(err.errors[i].message);
                        }
                    }
                    let message = errors.join(",");
                    res.redirect(`/movies/add?error=${message}`);
                } else {
                    res.send(err);
                }
            });
    } 

    static editForm(req, res) {
        const id = Number(req.params.id);
        let foundMovie = {};
        Movie.findByPk(id)
            .then((data) => {
                foundMovie = data;
                return ProductionHouse.findAll({
                    order: [["name", "ASC"]]
                })
            })
            .then((data) => {
                let errors = req.query.error ? req.query.error.split(",") : [];
                res.render("editMovieForm", { movie: foundMovie, productionHouses: data, errors });
            })
            .catch((err) => {
                res.send(err);
            });    
    }

    static editPost(req, res) {
        const id = req.params.id;
        const obj = {
            name: req.body.name,
            genre: req.body.genre,
            ProductionHouseId: req.body.ProductionHouseId
        }
        if (req.body.released_year.trim() !== "") {
            obj.released_year = Number(req.body.released_year);
        } else {
            obj.released_year = req.body.released_year;
        }

        Movie.update(obj, {
            where: {
                id: id
            }
        })
            .then((data) => {
                res.redirect("/movies");
            })
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    let errors = [];
                    for (let i = 0; i < err.errors.length; i++) {
                        if (!errors.includes(err.errors[i].message)) {
                            errors.push(err.errors[i].message);
                        }
                    }
                    let message = errors.join(",");
                    res.redirect(`/movies/${id}/edit?error=${message}`);
                } else {
                    res.send(err);
                }
            });
    } 

    static delete(req, res) {
        const id = req.params.id;
        Movie.destroy({
            where: {
                id: id
            }
        })
            .then((data) => {
                res.redirect("/movies");
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static addCastForm(req, res) {
        const id = Number(req.params.id);
        let foundMovie = {};
        let casts = [];
        Movie.findByPk(id, {
            include: Cast
        })
            .then((data) => {
                foundMovie = data;
                return Cast.findAll({
                    order: [["first_name", "ASC"]]
                })
            })
            .then((data) => {
                casts = data;
                return MovieCast.findAll({
                    where: {
                        MovieId: id
                    }
                })
            })
            .then((data) => {
                let errors = req.query.error ? req.query.error.split(",") : [];
                res.render("addCastFormMovie", { movie: foundMovie, casts: casts, movieCasts: data, errors });
            })
            .catch((err) => {
                res.send(err);
            });    
    }

    static addCastPost(req, res) {
        const id = req.params.id;
        const obj = {
            role: req.body.role,
            MovieId: id,
            CastId: req.body.CastId,
        }
    
        MovieCast.create(obj)
            .then((data) => {
                res.redirect(`/movies/${id}/add-cast`);
            })
            .catch((err) => {
                
                if (err.name === "SequelizeValidationError") {
                    let errors = [];
                    for (let i = 0; i < err.errors.length; i++) {
                        errors.push(err.errors[i].message);
                    }
                    let message = errors.join(",");
                    res.redirect(`/movies/${id}/add-cast?error=${message}`);
                } else {
                    res.send(err);
                }
            });
    } 
}

module.exports = MovieController;