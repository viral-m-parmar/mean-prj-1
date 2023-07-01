const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

    productName : String,
    price : Number,
    qty : Number,
    catagoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catagory"
    }
});

module.exports = mongoose.model('Product',ProductSchema);