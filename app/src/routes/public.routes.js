const express = require("express")
const sessionControllerDb = require("../controller/sessionControllerDb")

const route = express.Router()

route.post("/signupDb",sessionControllerDb.signup)
route.post("/loginDb",sessionControllerDb.login)
route.get("/getAllUsers",sessionControllerDb.getAllUsers)
route.delete("/deleteUser/:userId",sessionControllerDb.deleteUserById)
route.get("/getUserById/:userId",sessionControllerDb.getUserById);


module.exports = route;