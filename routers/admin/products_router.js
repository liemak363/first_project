const express = require('express')
const router = express.Router();

const controller = require("../../controllers/admin/products_controller.js")

router.get('/', controller.products)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-status-multi', controller.changeStatusMulti)

module.exports = router