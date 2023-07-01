const csvReader = require("../services/csvreader")
const EquityModel = require("../model/equityModel")

module.exports.uplodaEquity = async function(req,res){
    
    let allEquity = await csvReader.uploadEquity()
    
    EquityModel.insertMany(allEquity).then(data=>{
        res.json({data:data,msg:"Equity Uploaded",status:200})
    })
     
}

module.exports.getAllEquity = function(req,res){

    EquityModel.find().populate("industryId").exec().then(data=>{
        console.log(data)
        res.json({msg:"Equity Reterived",data:data}).status(200);
    }).catch(err=>{
        res.json({msg:"SMW",data:err}).status(302);
    })
}