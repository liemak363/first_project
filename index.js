const express = require('express')
const app = express()

app.use(express.static('public'))

require('dotenv').config();
const port = process.env.PORT

const route = require("./routers/client/index_router.js")

app.set('views', './views')
app.set('view engine', 'pug')

// router
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})