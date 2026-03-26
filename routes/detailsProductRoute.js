// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/detailController")
router.get("/detail/:inv_id", invController.buildByClassificationId);

module.exports = router;