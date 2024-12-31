const express = require('express')
const router = express.Router();

const multer  = require('multer')
const upload = multer()

const uploadCloud = require("../../middleware/admin/uploadCloud_middleware.js")

const controller = require("../../controllers/admin/product_cate_controller.js")

const productCateValidate = require("../../validates/admin/product_cate_validate.js")

router.get('/', controller.product_cate)
router.get('/create', controller.create)

router.post("/create",  upload.single('thumbnail'),
    uploadCloud.upload,
    productCateValidate.createPost,
    controller.createPost
);

module.exports = router