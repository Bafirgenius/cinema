const route = require("express").Router();
const MovieController = require("../controllers/MovieController");

route.get("/", MovieController.read);

route.get("/add", MovieController.addForm);
route.post("/add", MovieController.addPost);

route.get("/:id/edit", MovieController.editForm);
route.post("/:id/edit", MovieController.editPost);

route.get("/:id/delete", MovieController.delete);

route.get("/:id/add-cast", MovieController.addCastForm);
route.post("/:id/add-cast", MovieController.addCastPost);

module.exports = route;