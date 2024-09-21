const Product = require("../../models/product_model.js")
const filerStatusHelper = require("../../helper/filterStatus.js")
const searchHelper = require("../../helper/search.js")
const paginationHelper = require("../../helper/pagination.js")

// [GET] /admin/product
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
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper({
        limitItems: 4,
        currentPage: 1
    }, req.query, countProducts)

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

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});

    res.redirect('back');
};

// [PATCH] /admin/products/change_status_multi
module.exports.changeStatusMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
            break;
        default:
            break;
    }

    res.redirect('back');
}