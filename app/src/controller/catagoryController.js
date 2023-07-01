const CatagoryModel = require("../model/catagoryModel")

module.exports.addCatagory = function(req,res){

    let catagory = new CatagoryModel({
        catagoryName : req.body.catagoryName
    })

    catagory.save().then((data)=>{
        res.json({"msg":"Category Save","data":data,"rcode":200})
    }).catch((err)=>{
        res.json({"msg":"SMW","data":err,"rcode":-9})
    })
}

module.exports.getAllCatagory = function(req,res){
    
    CatagoryModel.find().then((data)=>{
        res.json({"msg":"categories retrived ..","data":data,"rcode":200})
    }).catch((err)=>{
        res.json({"msg":"categories not retrived ..","data":err,"rcode":-9})
    })
}