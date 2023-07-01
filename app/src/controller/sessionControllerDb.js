const UserModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env

// signup

module.exports.signup = async function(req,res){

    // validation
    // email unique in db

    let user = UserModel({
        firstName:req.body.firstName,
        email:req.body.email,
        password:req.body.password
    })

    let data = await user.save()

    res.json({data:data,msg:"Signup Done",rcode:200})
}

// login

module.exports.login = async function(req,res){

    let email = req.body.email
    let password = req.body.password

    let user = await UserModel.findOne({email:email})

    if(user){
        if(user.password == password){
            token = jwt.sign({"userId":user._id,"role":"user"},SEC_KEY,{expiresIn:"1m"})
            refreshtoken = jwt.sign({"userId":user._id,"role":"user"},SEC_KEY,{expiresIn:"1d"})
            res.json({data:user,msg:"Login Done",rcode:200,token:token,refreshtoken:refreshtoken})
        }else{
            res.json({data:req.body,msg:"Invalid Credentials",rcode:-9})
        }
    }  
}