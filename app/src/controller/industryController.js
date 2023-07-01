const csvReader = require("../services/csvreader")
const IndustryModel = require("../model/industryModel")

module.exports.readAndUploadIndustry = async function(req,res){
    
    let allIndustry = await csvReader.readAndUploadIndustry()
    
    IndustryModel.insertMany(allIndustry).then(data=>{
        res.json({data:data,msg:"Industery Uploaded",status:200})
    })
     
}