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

// [PATCH] /admin/product-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    try {
        await ProductCate.updateOne({_id: id}, {status: status});

        req.flash('success', 'change successfully');
    
        res.redirect('back');
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
};

// [PATCH] /admin/product-category/change_status_multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            try {
                await ProductCate.updateMany({_id: {$in: ids}}, {status: "active"});
                req.flash('success', 'change successfully');
            }
            catch(error) {
                req.flash("error", "the product is invalid")
                res.redirect(`${systemConfig.prefixAdmin}/product-category`);
            }
            break;
        case "inactive":
            try {
                await ProductCate.updateMany({_id: {$in: ids}}, {status: "inactive"});
                req.flash('success', 'change successfully');
            }
            catch(error) {
                req.flash("error", "the product is invalid")
                res.redirect(`${systemConfig.prefixAdmin}/product-category`);
            }
            break;
        case "soft-delete":
            try {
                await ProductCate.updateMany({_id: {$in: ids}}, {
                    deleted: true,
                    deletedAt: new Date()
                });
                req.flash('success', 'delete successfully');
            }
            catch(error) {
                req.flash("error", "the product is invalid")
                res.redirect(`${systemConfig.prefixAdmin}/product-category`);
            }
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);

                try {
                    await ProductCate.updateOne({_id: id}, {position: position});
                    req.flash('success', 'change successfully');
                }
                catch {
                    req.flash("error", "the product is invalid")
                    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
                }
            }
            break;
        default:
            break;
    }

    res.redirect('back');
}

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

// [GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    try {
        const record = await ProductCate.findOne({
            _id: id,
            deleted: false
        });
    
        res.render("./admin/pages/product_cate/edit.pug", {
            pageTitle: "edit product",
            record: record
        })
    }
    catch {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
    
}

// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    try {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.position = parseInt(req.body.position);

        await ProductCate.updateOne({
            _id: id,
            deleted: false
        }, req.body);
    
        req.flash('success', 'edit successfully');
    
        res.redirect("back");
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}

// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;

    try {
        const record = await ProductCate.findOne({
            _id: id,
            deleted: false
        });
    
        res.render("./admin/pages/product_cate/detail.pug", {
            pageTitle: record.title,
            record: record
        })
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
    
}