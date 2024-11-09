const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const systemConfig = require("./config/system.js")
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static(`${__dirname}/public`))

require('dotenv').config();
const port = process.env.PORT

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const flash = require('express-flash')
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

// connect to database
const database = require("./config/database.js");
const trackingDatabase = require("./config/trackingDatabase.js");
const connectTrackingDatabase = new Promise(async (resolve, reject) => {
    try {
        await database.connect();
        const clientRedis = await trackingDatabase.getClient();
        resolve(clientRedis);
    }
    catch (err) {
        reject(err);
    }
})

// listen to port
connectTrackingDatabase.then(async (clientRedis) => {
    module.exports.clientRedis = clientRedis;

    // router
    const route = require("./routers/client/index_router.js")
    const adminRoute = require("./routers/admin/index_router.js")
    route(app)
    adminRoute(app);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

    // function for update product
    const Product = require("./models/product_model.js")
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
            const newSeeding = Math.floor(product[0].seeding*0.5 + numSelledCounted*0.5);
            await Product.updateOne({slug: key.slice(15)}, {
                numSelled: newNumSelled,
                seeding: newSeeding
            })
            
            clientRedis.set(key, 0);
        }
        console.log("ok");
    }
    setInterval(seeding, 5000);
})
