const Product = require("../models/product_model.js")
const clientRedis = require("../index.js");

async function seeding() {
    // key == 'productSeeding:slug'
    const keys = await clientRedis.keys('productSeeding:*');
    console.log(keys);

    for (const key of keys) {
        let numSelledCounted = await clientRedis.get(key);
        numSelledCounted = parseInt(numSelledCounted);

        const product = await Product.find({slug: key.slice(15)});
        console.log(product);

        // update product
        const newNumSelled = product[0].numSelled + numSelledCounted;
        const newSeeding = product[0].seeding*0.5 + numSelledCounted*0.5;
        await Product.updateOne({slug: key.slice(15)}, {
            numSelled: newNumSelled,
            seeding: newSeeding
        })
        
        clientRedis.set(key, 0);
    }
}

module.exports.seeding = seeding;