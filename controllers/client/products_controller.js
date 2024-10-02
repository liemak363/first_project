const Product = require("../../models/product_model.js")

module.exports.products = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"})
    const newProducts = products.map((item) => {
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })

    res.render("./client/pages/products/index.pug", {
        pageTitle: "product",
        products: newProducts
    });
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;

    try {
        const product = await Product.findOne({
            slug: slug,
            status: "active",
            deleted: false
        });
    
        res.render("./client/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        })
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`/products`);
    }
}