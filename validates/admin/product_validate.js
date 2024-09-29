module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Title must not be empty")
        res.redirect("back");
        return;
    }

    next();
}