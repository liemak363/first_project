const slug = require('mongoose-slug-updater');
const mongoose = require("mongoose");
mongoose.plugin(slug);

const productCateSchema = new mongoose.Schema(
    { 
        title: String,
        parent_id: {
            type: String,
            default: ""
        },
        description: String, 
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
        deletedAt: Date,
        numSelled: Number,
        seeding: Number
    }, 
    {
        timestamps: true
    }
);

const productCate = mongoose.model("product-categories", productCateSchema);

module.exports = productCate;