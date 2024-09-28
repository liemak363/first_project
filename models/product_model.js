const slug = require('mongoose-slug-updater');
const mongoose = require("mongoose");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({ 
    title: String,
    description: String, 
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});

const products = mongoose.model("products", productSchema);

module.exports = products;