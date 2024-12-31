const ProductCate = require("../../models/product_cate_model.js")
const systemConfig = require("../../config/system.js")

// [GET] /admin/product-category/
module.exports.product_cate = (req, res) => {
    res.render("./admin/pages/product_cate/index.pug", {
        pageTitle: "product-category"
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
    // req.body.price = parseInt(req.body.price);
    // req.body.discountPercentage = parseInt(req.body.discountPercentage);
    // req.body.numSelled = 0;
    // req.body.seeding = 0;

    // if (req.body.position == "") {
    //     const countProducts = await Product.countDocuments();
    //     req.body.position = countProducts + 1;
    // } else req.body.position = parseInt(req.body.position);

    // const productNew = new Product(req.body);
    // await productNew.save();

    // const slug = productNew.slug;
    // await startApp.clientRedis.set(`productSeeding:${slug}`, '0');

    // res.redirect(`${systemConfig.prefixAdmin}/products`);

    if (req.body.position == "") {
        const countProducts = await ProductCate.countDocuments();
        req.body.position = countProducts + 1;
    } else req.body.position = parseInt(req.body.position);

    const productCateNew = new ProductCate(req.body);
    await productCateNew.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);

    console.log(req.body)
}