const express = require('express')
const router = express.Router();

const controller = require("../../controllers/client/products_controller.js")

router.get('/', controller.products)

router.get("/detail/:slug", controller.detail);

module.exports = router