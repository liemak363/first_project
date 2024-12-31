const ProductCate = require("../../models/product_cate_model.js")
const filerStatusHelper = require("../../helper/filterStatus.js")
const searchHelper = require("../../helper/search.js")
const systemConfig = require("../../config/system.js")

// [GET] /admin/product-category/
module.exports.product_cate = async (req, res) => {
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

    const records = await ProductCate.find(find)
        .sort({position: "desc"})

    res.render("./admin/pages/product_cate/index.pug", {
        pageTitle: "product-category",
        records: records,
        filterStatus: filterStatus,
        keyword: objSearch.keyword
    });
};

// [GET] /admin/product-category/create
module.exports.create = (req, res) => {
    res.render("./admin/pages/product_cate/create.pug", {
        pageTitle: "product-category create"
    });
};

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const countProducts = await ProductCate.countDocuments();
        req.body.position = countProducts + 1;
    } else req.body.position = parseInt(req.body.position);

    const productCateNew = new ProductCate(req.body);
    await productCateNew.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);

    console.log(req.body)
}