const express = require('express')
const mongoose = require('mongoose');

const app = express()

app.use(express.static('public'))

require('dotenv').config();
const port = process.env.PORT

mongoose.connect(process.env.MONGO_URL);

const route = require("./routers/client/index_router.js")

app.set('views', './views')
app.set('view engine', 'pug')

// router
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})