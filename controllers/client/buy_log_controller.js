const BuyLog = require("../../models/buy_log_model.js")
const Product = require("../../models/product_model.js")

const paginationHelper = require("../../helper/pagination.js")

function convertToGmt7(dateString) {
    // Parse the input date string as UTC
    const utcDate = new Date(dateString);
  
    // Adjust to GMT+7 by adding 7 hours
    const gmt7Date = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
  
    // Extract day, month, year, hours, minutes, and seconds
    const day = gmt7Date.getUTCDate().toString().padStart(2, '0');
    const month = (gmt7Date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = gmt7Date.getUTCFullYear();
    const hours = gmt7Date.getUTCHours().toString().padStart(2, '0');
    const minutes = gmt7Date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = gmt7Date.getUTCSeconds().toString().padStart(2, '0');
  
    // Format as dd/mm/yyyy hh:mm:ss
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

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
        item.createdAtFormatted = convertToGmt7(item.createdAt);
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
        pagination: objectPagination
    });
}