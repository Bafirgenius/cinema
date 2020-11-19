const { Movie, Customer, CustomerMovie } = require("../models/index");
const checkSeats = require("../helpers/checkSeats");
const checkSeats2 = require("../helpers/checkSeats2");
const sendEmail = require("../helpers/sendEmail");

class MovieController {
    static read(req, res) {
        let movies = [];
        Movie.findAll({
            include: Customer,
            order: [["date", "ASC"]],
        })
            .then((data) => {
                movies = data;
                return CustomerMovie.findAll()
            })
            .then((data) => {
                res.render("movieList", { movies: movies, customerMovies: data, checkSeats2});
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
            genre: req.body.genre,
            date: req.body.date,
            time: req.body.time,
            price: req.body.price
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
        Movie.findByPk(id)
            .then((data) => {
                let errors = req.query.error ? req.query.error.split(",") : [];
                res.render("editMovieForm", { movie: data, errors });
            })
            .catch((err) => {
                res.send(err);
            });    
    }

    static editPost(req, res) {
        const id = req.params.id;
        let obj = {
            name: req.body.name,
            genre: req.body.genre,
            date: req.body.date,
            time: req.body.time,
            price: req.body.price
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

    static purchaseForm(req, res) {
        const id = Number(req.params.id);
        let foundMovie = {};
        let customers = [];
        Movie.findByPk(id, {
            include: Customer
        })
            .then((data) => {
                foundMovie = data;
                return Customer.findAll({
                    order: [["first_name", "ASC"]]
                })
            })
            .then((data) => {
                customers = data;
                return CustomerMovie.findAll({
                    where: {
                        MovieId: id
                    }
                })
            })
            .then((data) => {
                let errors = req.query.error ? req.query.error.split(",") : [];
                let availableSeats = checkSeats(data);
                res.render("purchaseForm", { movie: foundMovie, customers: customers, customerMovies: data, availableSeats, errors });
            })
            .catch((err) => {
                res.send(err);
            });    
    }

    static purchasePost(req, res) {
        const id = Number(req.params.id);
        const obj = {
            seat: req.body.seat,
            MovieId: id,
            CustomerId: req.body.CustomerId,
        }
        let foundMovie = {};
        let foundCustomer = {};
        Movie.findByPk(id)
            .then((data) => {
                foundMovie = data;
                return Customer.findByPk(req.body.CustomerId)
            })
            .then((data) => {
                foundCustomer = data;
                return CustomerMovie.create(obj)
            })
            .then((data) => {
                let message = `${foundMovie.name}, Seat: ${req.body.seat}, Date: ${foundMovie.date}, Time: ${foundMovie.time}`;
                sendEmail(foundCustomer.email, message);
                res.redirect(`/movies/${id}/purchase`);
            })
            .catch((err) => {
                let errors = [];
                if (err.name === "SequelizeValidationError") {
                    for (let i = 0; i < err.errors.length; i++) {
                        errors.push(err.errors[i].message);
                    }
                    let message = errors.join(",");
                    res.redirect(`/movies/${id}/purchase?error=${message}`);
                } else {
                    res.send(err);
                }
            });      
    } 
}

module.exports = MovieController;