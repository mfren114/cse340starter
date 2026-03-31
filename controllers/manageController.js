const utilities = require("../utilities/")

const invCont = {}

invCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    const grid = await utilities.buildManagementView()
    res.render("./inventory/management", {
        title: "Inventory Management",
        nav,
        grid,
        errors: null
    })
}

module.exports = invCont