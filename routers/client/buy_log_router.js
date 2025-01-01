const express = require('express')
const router = express.Router();

const controller = require("../../controllers/client/buy_log_controller.js")

router.get('/', controller.buyLog)

module.exports = router