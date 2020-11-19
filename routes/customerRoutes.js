const route = require("express").Router();
const CustomerController = require("../controllers/CustomerController");

route.get("/", CustomerController.read);

route.get("/add", CustomerController.addForm);
route.post("/add", CustomerController.addPost);

route.get("/:id/edit", CustomerController.editForm);
route.post("/:id/edit", CustomerController.editPost);

route.get("/:id/delete", CustomerController.delete);

module.exports = route;