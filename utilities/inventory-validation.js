const invModel = require('../models/inventory-model')
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
  * Classification Validation Rules
  * ********************************** */
 validate.classificationRules = () => {
    return [
        body("classification-name")
        .trim()
        .notEmpty()
        .withMessage("Please provide classification name")
        .matches(/[a-zA-Z0-9]+/)
        .withMessage("Classification name cannot contain spaces or special characters"),
    ]
 }

 /* **********************************
  * Inventory Validation Rules
  * ********************************** */
 validate.inventoryRules = () => {
    return [
        body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide make of the vehicle"),
    
        body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide model of the vehicle"),

        body("inv_year")
        .trim()
        .notEmpty()
        .withMessage("Please provide the year of the vehicle")
        .isLength({min: 4, max: 4}),

        body("inv_description")
        .trim()
        .notEmpty()
        .withMessage("Please provide description"),

        body("inv_image")
        .trim()
        .notEmpty()
        .withMessage("Please provide image ofthe vehicle"),

        body("inv_thumbnail")
        .trim()
        .notEmpty()
        .withMessage("Please provide thumbnail of the vehicle"),

        body("inv_price")
        .trim()
        .notEmpty()
        .withMessage("Please provide vehicle price")
        .isNumeric(),

        body("inv_miles")
        .trim()
        .notEmpty()
        .withMessage("Please provide vehicle miles")
        .isNumeric,

        body("inv_color")
        .trim()
        .notEmpty()
        .escape()
        .withMessage("Please provide vehicle color"),

        body("classificatio_id")
        .notEmpty()
        .withMessage("Please select classification")
        .isNumeric()
    
    ]
 }

 /* **************************
  * Check Classification Data
  * ************************* */
validate.checkClassification = (req, res, next) => {
  const { errors } = validationResult(req)
  if (!errors.length) {
    return next()
  }
  let nav
  utilities = require("./index")
  nav = utilities.getNav()
  return res.render("inventory/add-classification", {
    errors,
    title: "Add Classification",
    nav,
  })
}

/* **************************
  * Check Inventory Data
  * ************************* */
validate.checkInventory = async (req, res, next) => {
  const { errors } = validationResult(req)
  if (!errors.length) {
    return next()
  }
  let nav
  utilities = require("./index")
  nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(req.body.classification_id)
  return res.render("inventory/add-vehicle", {
    errors,
    title: "Add Vehicle",
    nav,
    classificationList,
    inv_make: req.body.inv_make,
    inv_model: req.body.inv_model,
    inv_year: req.body.inv_year,
    inv_description: req.body.inv_description,
    inv_price: req.body.inv_price,
    inv_miles: req.body.inv_miles,
    inv_color: req.body.inv_color,
    classification_id: req.body.classification_id,
  })
}

module.exports = validate