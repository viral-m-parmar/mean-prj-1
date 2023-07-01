const express = require("express")
const sessionControllerDb = require("../controller/sessionControllerDb")

const route = express.Router()

route.post("/signupDb",sessionControllerDb.signup)
route.post("/loginDb",sessionControllerDb.login)

module.exports = route;