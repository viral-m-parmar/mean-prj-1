const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env

module.exports = function(req,res,next){
    
    let token = req.headers.token;

    jwt.verify(token,SEC_KEY,function(err,decode){
        
        if(err){
            if(err.name === 'TokenExpiredError' || err.name == 'JsonWebTokenError'){
                jwt.verify(req.headers.refreshtoken,SEC_KEY,function(err,decode){
                    if(err){
                        res.json({msg:"plz Login before Access the services",rcode:-9,data:""})
                    }else{
                        console.log("decoded by refresh token");
                        next();
                    }
                })                
            }
        }else{
                console.log("decoded by token... ");
                next(); // go ahead
        }
    })
}