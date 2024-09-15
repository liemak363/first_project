const Product = require("../../models/product_model.js")

module.exports.products = async (req, res) => {
    const products = await Product.find({
        deleted: false
    })

    res.render("./admin/pages/products/index.pug", {
        pagaTitle: "products",
        products: products
    });
};