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

    // pagination
    let objectPagination = {
        limitItems: 4,
        currentPage: 1
    };
    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    const countProducts = await Product.countDocuments(find);
    objectPagination.totalPage = Math.ceil(countProducts / objectPagination.limitItems);

    // end pagination

    const products = await Product.find(find).limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    res.render("./admin/pages/products/index.pug", {
        pageTitle: "products",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objectPagination
    });
};