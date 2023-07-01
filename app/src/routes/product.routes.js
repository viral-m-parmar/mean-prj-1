const express = require("express")
const productController = require("../controller/productControllerDb")

const route = express.Router();

route.post("/addproductdb",productController.addProduct);
route.get("/getallproductdb",productController.getAllProduct);
route.get("/products/:productId",productController.getProductById);
route.delete("/delete/:productId",productController.deleteProductById)
route.put("/updateproduct",productController.updateProductById)
route.post("/filterproduct",productController.filterProducts)

module.exports = route;