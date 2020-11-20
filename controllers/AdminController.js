const { Admin } = require("../models/index");
const { compare } = require("../helpers/bcryptHelper");

class AdminController {
    static registerForm(req, res) {
        let errors = req.query.error ? req.query.error.split(",") : [];
        res.render("register", { errors });
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
                if (err.name === "SequelizeValidationError") {
                    let errors = [];
                    for (let i = 0; i < err.errors.length; i++) {
                        if (!errors.includes(err.errors[i].message)) {
                            errors.push(err.errors[i].message);
                        }
                    }
                    let message = errors.join(",");
                    res.redirect(`/register?error=${message}`);

                } else {
                    res.send(err);
                }
            })
    }

    static loginForm(req, res) {
        let errors = req.query.error ? req.query.error.split(",") : [];
        res.render("login", { errors });
    }

    static loginPost(req, res) {
        let obj = {
            username: req.body.username,
            password: req.body.password
        }
        let errors = [];
        if (obj.username === "" || obj.username.trim() === "" || !obj.username) {
            errors.push("Username is required.");
        }
        if (obj.password === "" || obj.password.trim() === "" || !obj.password) {
            errors.push("Password is required.");
        }
        if (errors.length) {
            let errorMessage = errors.join(",");
            res.redirect(`/login?error=${errorMessage}`);

        } else {
            Admin.findOne({
                where: {
                    username: req.body.username,
                }
            })
                .then((data) => {
                    if (data) {
                        if (compare(req.body.password, data.password)) {
                            req.session.name = Admin.getFullName(data.first_name, data.last_name);
                            res.redirect("/");
                        } else {
                            let message = "Password does not match the username."
                            res.redirect(`/login?error=${message}`);
                        }
                    } else {
                        let message = "Username does not exist in database."
                        res.redirect(`/login?error=${message}`);
                    }
                })
                .catch((err) => {
                    res.send(err);
                })
        }
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

    static test2(){
        
    }
}

module.exports = AdminController;