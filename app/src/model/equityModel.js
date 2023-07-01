const mongoose = require("mongoose")

let EquitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:{value:true,message:"Please Enter Equity"},
        lowercase:true
    },
    symbol:{
        type:String,
        required:{value:true,message:"Please Enter Equity Symbol"},
        uppercase:true
    },
    isin:{
        type:String,
        required:{value:true,message:"Please Enter ISIN"},
        lowercase:true
    },
    industryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Industries"
    }
})

module.exports = mongoose.model("Equities",EquitySchema)