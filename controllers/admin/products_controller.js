const Product = require("../../models/product_model.js")
const filerStatusHelper = require("../../helper/filterStatus.js")
const searchHelper = require("../../helper/search.js")

module.exports.products = async (req, res) => {
    // filter status
    const filterStatus = filerStatusHelper(req.query)

    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status
    }

    // filter keyword
    const objSearch = searchHelper(req.query);
    if (objSearch.title) {
        find.title = objSearch.title;
    }

    const products = await Product.find(find)

    res.render("./admin/pages/products/index.pug", {
        pagaTitle: "products",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword
    });
};