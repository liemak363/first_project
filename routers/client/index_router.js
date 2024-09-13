const productsRouter = require("./products_router");

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render("./client/pages/home/index.pug");
    })
    
    app.use('/products', productsRouter);
}