module.exports.products = (req, res) => {
    res.render("./admin/pages/products/index.pug", {
        pagaTitle: "products"
    });
};