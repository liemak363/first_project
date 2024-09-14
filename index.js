const express = require('express')
const app = express()

app.use(express.static('public'))

require('dotenv').config();
const port = process.env.PORT

const database = require("./config/database.js");
database.connect();

const route = require("./routers/client/index_router.js")
const adminRoute = require("./routers/admin/index_router.js")

app.set('views', './views')
app.set('view engine', 'pug')

// router
route(app)
adminRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})