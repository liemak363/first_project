const mongoose = require("mongoose");

const buyLogSchema = new mongoose.Schema(
    { 
        productId: String,
        userId: String,
        price: Number,
        quantity: Number,
        createdAt: Date
    }, 
    {
        timestamps: true
    }
);

const buyLog = mongoose.model("buy_logs", buyLogSchema);

module.exports = buyLog;