const UserModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env
const bcrypt = require("bcrypt")
const { model } = require("mongoose")
const userModel = require("../model/userModel")

// signup

module.exports.signup = async function(req,res){

    // validation
    // email unique in db

    let pass = req.body.password;
    let encpass = bcrypt.hashSync(pass.toString(),10);
    console.log(encpass);
    req.body.password = encpass;

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
        if(bcrypt.compareSync(password.toString(),user.password) == true){

            token = jwt.sign({"userId":user._id,"role":"user"},SEC_KEY,{expiresIn:"1m"})
            refreshtoken = jwt.sign({"userId":user._id,"role":"user"},SEC_KEY,{expiresIn:"1d"})
            res.json({data:user,msg:"Login Done",rcode:200,token:token,refreshtoken:refreshtoken})
        }else{

            res.json({data:req.body,msg:"Invalid Credentials",rcode:-9})
        }
    }  
}

module.exports.getAllUsers = function(req,res){
    
    userModel.find().then(data=>{
        console.log(data)
        res.json({msg:"User Reterived",data:data}).status(200);
    }).catch(err=>{
        res.json({msg:"SMW",data:err}).status(302);
    })
}