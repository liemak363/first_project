const express = require('express')
const router = express.Router();

const multer  = require('multer')
const upload = multer()

const uploadCloud = require("../../middleware/admin/uploadCloud_middleware.js")

const controller = require("../../controllers/admin/product_cate_controller.js")

const productCateValidate = require("../../validates/admin/product_cate_validate.js")

router.get('/', controller.product_cate)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.get('/create', controller.create)

router.post("/create",  upload.single('thumbnail'),
    uploadCloud.upload,
    productCateValidate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", 
    upload.single('thumbnail'),
    uploadCloud.upload,
    productCateValidate.createPost,
    controller.editPatch
);

router.get("/detail/:id", controller.detail)

module.exports = router