const route = require("express").Router();
const customerRoutes = require("./customerRoutes");
const movieRoutes = require("./movieRoutes");
const AdminController = require("../controllers/AdminController");
const authentication = require("../middleware/authentication");

route.get("/register", AdminController.registerForm);
route.post("/register", AdminController.registerPost);

route.get("/login", AdminController.loginForm);
route.post("/login", AdminController.loginPost);

route.use(authentication);
route.get("/", (req, res) => {
    let name = req.session.name;
    res.render("home", { name });
});

route.use("/customers", customerRoutes);
route.use("/movies", movieRoutes);

route.get("/logout", AdminController.logout)

module.exports = route;