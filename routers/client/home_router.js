const express = require('express')
const router = express.Router();

const controller = require("../../controllers/client/home_controller.js")

router.get('/', controller.home)

module.exports = router