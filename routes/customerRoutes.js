const route = require("express").Router();
const CastController = require("../controllers/CastController");

route.get("/", CastController.read);

route.get("/add", CastController.addForm);
route.post("/add", CastController.addPost);

route.get("/:id/edit",CastController.editForm);
route.post("/:id/edit", CastController.editPost);

route.get("/:id/delete",CastController.delete);

route.get("/:id/see-movies", CastController.seeMovies);

module.exports = route;