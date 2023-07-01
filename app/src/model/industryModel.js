const mongoose = require("mongoose")

let IndustrySchema = new mongoose.Schema({
    name:{
        type:String,
        required:{value:true,message:"Please Enter Industry Name"},
        lowercase:true
    }
})

module.exports = mongoose.model("Industries",IndustrySchema)