const express = require('express')
const router = express.Router();

const controller = require("../../controllers/admin/products_controller.js")

router.get('/', controller.products)

router.get('/change-status/:status/:id', controller.changeStatus)

module.exports = router