const Product = require("../../models/product_model.js")

module.exports.products = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })
    const newProducts = products.map((item) => {
        item.priceNew = (item.price*(100 - item.discountPercentage)).toFixed(0);
        return item;
    })

    console.log(newProducts);

    res.render("./client/pages/products/index.pug", {
        pageTitle: "product",
        products: newProducts
    });
}