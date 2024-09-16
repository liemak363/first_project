const Product = require("../../models/product_model.js")
const filerStatusHelper = require("../../helper/filterStatus.js")

module.exports.products = async (req, res) => {
    let filterStatus = filerStatusHelper(req.query)

    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status
    }

    let keyword = "";
    if (req.query.keyword) {
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }

    const products = await Product.find(find)

    res.render("./admin/pages/products/index.pug", {
        pagaTitle: "products",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
};