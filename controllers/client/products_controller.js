module.exports.products = (req, res) => {
    res.render("./client/pages/products/index.pug", {
        pageTitle: "product"
    });
}