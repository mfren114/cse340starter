const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build Add Classification View
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  })
}

/* ***************************
 *  Build Add Inventory View
 * ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    errors: null
  })
}

/* ****************************************
*  Process add classification
* *************************************** */
invCont.addClassification = async function (req, res, next) {
  const {classification_name} = req.body 
  let nav = await utilities.getNav()

  const regResult = invModel.addClassification(classification_name)

  if (regResult.rowcount > 0) {
    nav = await utilities.getNav()
    req.flash("notice", `Classification "${classification_name}" successfully added`)
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      grid: await utilities.buildManagementView(), 
      errors: null
    })
  } else {
    req.flash("Notice", "Adding classification failed")
    res.status(501).render("invemtory/add-classification", {
      title: "Add Classification",nav,
      erros: null
    })
  }
}

/* ****************************************
*  Process add inventory
* *************************************** */
invCont.addInventory = async function (req, res, next) {
  const {inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id} = req.body
  let nav = await utilities.getNav()

  const regResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  if (regResult.rowcount > 0) {
    req.flash("notice", `Vehicle "${inv_make} ${inv_model}" added successfully`)
    res.status(201).render("inventory/management", {
    title: "inventory Management",
    nav,
    grid: await utilities.buildManagementView(),
    errors: null
    })
  } else {
    const classificationList = utilities.buildClassificationList(classification_id)
    req.flash("notice", "Adding vehicle failed")
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
      errors: null
    })
  }
}

module.exports = invCont