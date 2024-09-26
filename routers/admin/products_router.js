const express = require('express')
const router = express.Router();

const controller = require("../../controllers/admin/products_controller.js")

router.get('/', controller.products)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.delete('/permanently-delete/:id', controller.deletePermanently);

router.delete('/recoverable-delete/:id', controller.deleteRecoverable);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

module.exports = router