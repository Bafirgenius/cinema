const route = require("express").Router();
const personRoutes = require("./customerRoutes");
const movieRoutes = require("./movieRoutes");
const AdminController = require("../controllers/AdminController");
const authentication = require("../middleware/authentication");

route.get("/register", AdminController.registerForm);
route.post("/register", AdminController.registerPost);

route.get("/login", AdminController.loginForm);
route.post("/login", AdminController.loginPost);

route.use(authentication);
route.get("/", (req, res) => {
    res.render("home");
});

route.use("/customers", personRoutes);
route.use("/movies", movieRoutes);

module.exports = route;