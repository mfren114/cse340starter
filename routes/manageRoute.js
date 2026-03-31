const express = require("express")
const router = new express.Router()
const manageController = require("../controllers/manageController")

router.get("/", manageController.buildManagement);

module.exports = router;