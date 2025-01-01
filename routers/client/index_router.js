const homeRouter = require("./home_router")
const productsRouter = require("./products_router");
const buyLogRouter = require("./buy_log_router");

module.exports = (app) => {
    app.use('/', homeRouter);
    
    app.use('/products', productsRouter);

    app.use('/buy-log', buyLogRouter);
}