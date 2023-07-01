const express = require("express")
const catagoryController = require("../controller/catagoryController")

const route = express.Router();

route.post("/catagoryadd",catagoryController.addCatagory)
route.get("/getallcatagory",catagoryController.getAllCatagory)

module.exports = route;