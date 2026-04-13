const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/inventory-validation")
const electController = require("../controllers/electricController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/add-classification", invController.buildAddClassificationView);

router.get("/add-inventory", invController.buildAddInventoryView);

//router.get("/electic", electController.buildElectricView);

//Add new Classification and Inventory
router.post("/add-classification", validate.classificationRules(), validate.checkClassification, utilities.handleErrors(invController.addClassification));

router.post("/add-inventory", validate.inventoryRules(), validate.checkInventory, utilities.handleErrors(invController.addInventory));

module.exports = router;   