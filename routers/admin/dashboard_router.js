const express = require('express')
const router = express.Router();

const controller = require("../../controllers/admin/dashboard_controller.js")

router.get('/', controller.dashboard)

module.exports = router