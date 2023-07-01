const ProductModel = require("../model/productModel")

module.exports.addProduct = function (req,res) {

    let productName = req.body.productName
    let price = req.body.price
    let qty = req.body.qty
    let catagoryId = req.body.catagoryId

    let product = new ProductModel({

        "productName":productName,
        "price":price,
        "qty":qty,
        "catagoryId":catagoryId
    });

    product.save();

    res.json({"msg":"Product Added","data":product,"rcode":200})
}

module.exports.getAllProduct = function (req,res) {

    ProductModel.find().populate("catagoryId").exec().then((data)=>{
        res.json({"msg":"Product List","data":data,"rcode":200})
    }).catch((err)=>{
        res.json({"msg":"SMW","data":err,"rcode":-9})
    })
}

module.exports.getProductById = function(req,res){

    let productId = req.params.productId;

    ProductModel.findById({ _id : productId }).then((data) => {
        res.json({"msg":"Product Retrived","data":data,"rcode":200})
    }).catch((err) => {
        res.json({"msg":"something went wrong","data":err,"rcode":-9})
    })
}

module.exports.deleteProductById = function(req,res){
    
    let productId = req.params.productId;

    ProductModel.findByIdAndDelete({ _id: productId }).then((data) => {
        res.json({ "msg": "Product Deleted", "data": data, "rcode": 200 })
    }).catch((err) => {
        res.json({ "msg": "SMW", "rcode": -9, "data": err })
    })
}

module.exports.updateProductById = function(req,res){

    let productId = req.body.productId;
    let price = req.body.price;
    let qty = req.body.qty;

    ProductModel.updateOne({ _id : productId } , { "price" : price , "qty" : qty }).then((data)=>{
        res.json({"msg":"product updated","data":data,"rcode":200})
    }).catch((err)=>{
        res.json({"msg":"updatetion fails","rcode":-9,"data":err})
    })
}

module.exports.filterProducts = function(req,res){

    let minPrice = req.body.minPrice
    let maxPrice = req.body.maxPrice

    ProductModel.find({
        $and : [
            {
                price : {
                    $gt : minPrice
                }
            },
            {
                price : {
                    $lt : maxPrice                   
                }
            }
        ]
    }).then((data)=>{
        if(data.length == 0){
            res.json({"msg":"No Data Found","data":req.body,"rcode":-9})
        }else{
            res.json({"msg":"filter Product","data":data,"rcode":200})
        }
    }).catch((err)=>{
        res.json({"msg":"SMW","data": err,"rcode":-9})
    })

}