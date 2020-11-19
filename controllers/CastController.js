const { Cast, Movie, MovieCast } = require("../models");
const getAge = require("../helpers/getAge");

class CastController {
    static read(req, res) {
        Cast.findAll({
            order: [["first_name", "ASC"]]
        })
            .then((data) => {
                res.render("castList", { casts: data });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static addForm(req, res) {
        res.render("addCastForm");
    }

    static addPost(req, res) {
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        }

        Cast.create(obj)
            .then((data) => {
                res.redirect("/casts");
            })
            .catch((err) => {
                res.send(err);
            });
    } 

    static editForm(req, res) {
        const id = Number(req.params.id);
        Cast.findByPk(id)
            .then((data) => {
                res.render("editCastForm", { cast: data });
            })
            .catch((err) => {
                res.send(err);
            });    
    }

    static editPost(req, res) {
        const id = req.params.id;
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        }

        Cast.update(obj, {
            where: {
                id: id
            }
        })
            .then((data) => {
                res.redirect("/casts");
            })
            .catch((err) => {
                res.send(err);
            });
    } 

    static delete(req, res) {
        const id = req.params.id;
        Cast.destroy({
            where: {
                id: id
            }
        })
            .then((data) => {
                res.redirect("/casts");
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static seeMovies(req, res) {
        const id = Number(req.params.id);
        let foundCast = {};
        Cast.findByPk(id, {
            include: Movie
        })
            .then((data) => {
                foundCast = data;
                return MovieCast.findAll({
                    where: {
                        CastId: id
                    }
                })
            })
            .then((data) => {
                res.render("seeMovies", { cast: foundCast, movieCasts: data, getAge});
            })
            .catch((err) => {
                res.send(err);
            });    
    }

    static test(){
        
    }
} 

module.exports = CastController;