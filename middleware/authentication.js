function authentication(req, res, next) {
    if (req.session.name) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = authentication;