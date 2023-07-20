const express = require("express")
import dotenv from 'dotenv';
dotenv.config();
require("./app/src/config/dbConfig").getDbConnection()

const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const catagoryRoutes = require("./app/src/routes/catagory.routes")
const productRoutes = require("./app/src/routes/product.routes")
const publicRoutes = require("./app/src/routes/public.routes")

const authMiddleware = require("./app/src/middleware/auth.middleware")

// private
app.use("/admin",authMiddleware,catagoryRoutes)
app.use("/admin",authMiddleware,productRoutes)

// public
app.use("/public",publicRoutes)

app.listen(9999)
console.log("server started on 9999")

