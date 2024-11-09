const Product = require("../../models/product_model.js")
const filerStatusHelper = require("../../helper/filterStatus.js")
const searchHelper = require("../../helper/search.js")
const paginationHelper = require("../../helper/pagination.js")
const systemConfig = require("../../config/system.js")
const startApp = require("../../index.js");

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

    const products = await Product.find(find)
        .sort({position: "desc"})
        .limit(objectPagination.limitItems)
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

    try {
        await Product.updateOne({_id: id}, {status: status});

        req.flash('success', 'change successfully');
    
        res.redirect('back');
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};

// [PATCH] /admin/products/change_status_multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            try {
                await Product.updateMany({_id: {$in: ids}}, {status: "active"});
                req.flash('success', 'change successfully');
            }
            catch(error) {
                req.flash("error", "the product is invalid")
                res.redirect(`${systemConfig.prefixAdmin}/products`);
            }
            break;
        case "inactive":
            try {
                await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
                req.flash('success', 'change successfully');
            }
            catch(error) {
                req.flash("error", "the product is invalid")
                res.redirect(`${systemConfig.prefixAdmin}/products`);
            }
            break;
        case "soft-delete":
            try {
                await Product.updateMany({_id: {$in: ids}}, {
                    deleted: true,
                    deletedAt: new Date()
                });
                req.flash('success', 'delete successfully');
            }
            catch(error) {
                req.flash("error", "the product is invalid")
                res.redirect(`${systemConfig.prefixAdmin}/products`);
            }
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);

                try {
                    await Product.updateOne({_id: id}, {position: position});
                    req.flash('success', 'change successfully');
                }
                catch {
                    req.flash("error", "the product is invalid")
                    res.redirect(`${systemConfig.prefixAdmin}/products`);
                }
            }
            break;
        default:
            break;
    }

    res.redirect('back');
}

// [DELETE] /admin/product/permanently-delete:id
module.exports.deletePermanently = async (req, res) => {
    const id = req.params.id;

    try {
        await Product.deleteOne({_id: id});

        req.flash('success', 'delete successfully');
    
        res.redirect('back');
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};

// [DELETE] /admin/product/recoverablely-delete:id
module.exports.deleteRecoverable = async (req, res) => {
    const id = req.params.id;

    try {
        await Product.updateOne({_id: id}, {
            deleted: true,
            deletedAt: new Date()
        });
    
        req.flash('success', 'delete successfully');
    
        res.redirect('back');
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};

// [GET] /admin/product/create
module.exports.create = (req, res) => {
    res.render("./admin/pages/products/create.pug", {
        pageTitle: "create product"
    })
}

// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else req.body.position = parseInt(req.body.position);

    const productNew = new Product(req.body);
    await productNew.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findOne({
            _id: id,
            deleted: false
        });
    
        res.render("./admin/pages/products/edit.pug", {
            pageTitle: "edit product",
            product: product
        })
    }
    catch {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
    
}

// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({_id: id});
    const oldSlug = product.slug;

    try {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.position = parseInt(req.body.position);

        await Product.updateOne({
            _id: id,
            deleted: false
        }, req.body);
    
        req.flash('success', 'edit successfully');

        // update tracking database
        const product = await Product.findOne({_id: id});
        const newSlug = product.slug;
        await startApp.clientRedis.rename(`productSeeding:${oldSlug}`, `productSeeding:${newSlug}`);
    
        res.redirect("back");
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findOne({
            _id: id,
            deleted: false
        });
    
        res.render("./admin/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        })
    }
    catch(error) {
        req.flash("error", "the product is invalid")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
    
}