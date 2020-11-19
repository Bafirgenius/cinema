const { Movie, Customer, CustomerMovie } = require("../models/index");
// const getAge = require("../helpers/getAge");

class CustomerController {
    static read(req, res) {
        Customer.findAll({
            order: [["first_name", "ASC"]]
        })
            .then((data) => {
                res.render("customerList", { customers: data });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static addForm(req, res) {
        let errors = req.query.error ? req.query.error.split(",") : [];
        res.render("addCustomerForm", { errors });
    }

    static addPost(req, res) {
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            email: req.body.email
        }
        console.log(obj)

        Customer.create(obj)
            .then((data) => {
                res.redirect("/customers");
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
                    res.redirect(`/customers/add?error=${message}`);
                } else {
                    res.send(err);
                }
            });
    } 

    static editForm(req, res) {
        const id = Number(req.params.id);
        let errors = req.query.error ? req.query.error.split(",") : [];
        Customer.findByPk(id)
            .then((data) => {
                res.render("editCustomerForm", { customer: data, errors});
            })
            .catch((err) => {
                res.send(err);
            });    
    }

    static editPost(req, res) {
        const id = Number(req.params.id);
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            email: req.body.email
        }

        Customer.update(obj, {
            where: {
                id: id
            }
        })
            .then((data) => {
                res.redirect("/customers");
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
                    res.redirect(`/customers/${id}/edit?error=${message}`);
                } else {
                    res.send(err);
                }
            });
    } 

    static delete(req, res) {
        const id = req.params.id;
        Customer.destroy({
            where: {
                id: id
            }
        })
            .then((data) => {
                res.redirect("/customers");
            })
            .catch((err) => {
                res.send(err);
            });
    }
} 

module.exports = CustomerController;