const dashboardRouter = require("./dashboard_router.js")
const productsRouter = require("./products_router.js")
const productCateRouter = require("./product_cate_router.js")
const systemConfig = require("../../config/system.js")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', dashboardRouter);
    app.use(PATH_ADMIN + '/products', productsRouter);
    app.use(PATH_ADMIN + '/product-category', productCateRouter);
}