const BuyLog = require("../../models/buy_log_model.js")
const Product = require("../../models/product_model.js")
const index = require("../../index.js");

module.exports.products = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({
        seeding: "desc",
        position: "desc"
    })
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
        product.priceNew = (product.price*(100 - product.discountPercentage)/100).toFixed(0);
    
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

// [POST] /buy/:slug
module.exports.buy = async (req, res) => {
    try {
        const slug = req.params.slug;
        const numberProduct = req.body.numberProducts;

        // const userID = ...
        // update buy log
        const product = await Product.findOne({slug: slug})
        let log = {
            // userID = userID,
            userID: "",
            productId: product.id,
            price: (product.price*(100 - product.discountPercentage)/100).toFixed(0),
            quantity: numberProduct
        }
        const logRecord = new BuyLog(log)
        await logRecord.save()
    
        const currentSeeding = parseInt(await index.clientRedis.get(`productSeeding:${slug}`));
        await index.clientRedis.set(`productSeeding:${slug}`, (currentSeeding + numberProduct));
    
        req.flash('success', 'order successfully');
    }
    catch (err) {
        req.flash("error", "order failed")
    }

    res.redirect("back");
}