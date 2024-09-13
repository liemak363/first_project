const homeRouter = require("./home_router")
const productsRouter = require("./products_router");

module.exports = (app) => {
    app.use('/', homeRouter);
    
    app.use('/products', productsRouter);
}