const BuyLog = require("../../models/buy_log_model.js")
const Product = require("../../models/product_model.js")

const paginationHelper = require("../../helper/pagination.js")

module.exports.buyLog = async (req, res) => {
    // const userID = ....

    // pagination
    const countProducts = await BuyLog.countDocuments({
        // userID = userID
    });
    let objectPagination = paginationHelper({
        limitItems: 4,
        currentPage: 1
    }, req.query, countProducts)

    const records = await BuyLog.find({
        // userID: userID,
    })
        .sort({createdAt: "desc"})
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    // Update records synchronously
    for (const item of records) {
        const product = await Product.findOne({ _id: item.productId });
        if (product) {
            item.title = product.title;
            item.thumbnail = product.thumbnail;
            item.slug = product.slug;
            item.total = item.price * item.quantity;
        }
    }

    // Render the updated records
    res.render("./client/pages/buy_log/index.pug", {
        pageTitle: "buy log",
        records: records,
    });
}