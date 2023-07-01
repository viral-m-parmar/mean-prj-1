const mongoose = require("mongoose")

const CatagorySchema = new mongoose.Schema({

    catagoryName:{
        type:String,
        required:{value:true,message:"please enter catagoryname"},
        lowercase:true
    }
})

module.exports = mongoose.model("Catagory",CatagorySchema)