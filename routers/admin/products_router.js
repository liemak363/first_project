const express = require('express')
const router = express.Router();

const multer  = require('multer')
const storageMulter = require("../../helper/storageMulter.js")
const upload = multer({ storage: storageMulter() })

const controller = require("../../controllers/admin/products_controller.js")
const productValidate = require("../../validates/admin/product_validate.js")

router.get('/', controller.products)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.delete('/permanently-delete/:id', controller.deletePermanently);

router.delete('/recoverable-delete/:id', controller.deleteRecoverable);

router.get("/create", controller.create);

router.post("/create",  upload.single('thumbnail'),
    productValidate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", 
    upload.single('thumbnail'),
    productValidate.createPost,
    controller.editPatch
);

router.get("/detail/:id", controller.detail)

module.exports = router