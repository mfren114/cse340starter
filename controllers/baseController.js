const utilities = require("C:/Users/mfrenette/OneDrive - Tesla/Desktop/CSE 340/utilities")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

module.exports = baseController