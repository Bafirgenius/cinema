const route = require("express").Router();
const MovieController = require("../controllers/MovieController");

route.get("/", MovieController.read);

route.get("/add", MovieController.addForm);
route.post("/add", MovieController.addPost);

route.get("/:id/edit", MovieController.editForm);
route.post("/:id/edit", MovieController.editPost);

route.get("/:id/delete", MovieController.delete);

route.get("/:id/purchase", MovieController.purchaseForm);
route.post("/:id/purchase", MovieController.purchasePost);

module.exports = route;