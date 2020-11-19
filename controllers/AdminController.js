const { Admin } = require("../models/index");
const { compare } = require("../helpers/bcryptHelper");

class AdminController {
    static registerForm(req, res) {
        res.render("register");
    }

    static registerPost(req, res) {
        let obj = {
            first_name:req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        }
        Admin.create(obj)
            .then((data) => {
                res.redirect("/login");
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static loginForm(req, res) {
        res.render("login");
    }

    static loginPost(req, res) {
        Admin.findOne({
            where: {
                username: req.body.username,
            }
        })
            .then((data) => {
                if (data) {
                    if (compare(req.body.password, data.password)) {
                        req.session.username = data.username
                        req.session.name = data.getFullName();
                        res.redirect("/");
                    } else {
                        res.send("username or password is not in database.");
                    }
                }
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                res.send(err);
            } else {
                res.redirect("/login");
            }
        })
    }
}

module.exports = AdminController;