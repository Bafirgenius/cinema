const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require("express-session");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
}))

app.use(routes);

app.listen(PORT, () => {
    console.log("App is running on port: " , PORT);
});