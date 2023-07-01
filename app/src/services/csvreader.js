const fs = require("fs")
const csvReader = require("csv-reader")
const IndustryModel = require("../model/industryModel")
const EquityModel = require("../model/equityModel")


module.exports.readAndUploadIndustry = async function(){

    let industryArray = []
    let myFiles = fs.createReadStream("D:\\MEAN STACK\\seed\\ind_nifty50list.csv","utf8")
    let myDataFromDb = []

    IndustryModel.find().then(data=>{
        myDataFromDb = data;
    })

    let promise = new Promise((resolve,reject)=>{
        myFiles.pipe(new csvReader())
        .on('data',function(row){
            if(industryArray.indexOf(row[1].toLowerCase()) == -1){
                industryArray.push(row[1].toLowerCase())
            }
        })
        .on('end',function(){
            
            console.log(industryArray)
            console.log(industryArray.length);
            
            let industryJson = []

            console.log("****");
            console.log(myDataFromDb);

            for(i=0;i<myDataFromDb.length;i++){
                if(industryArray.indexOf(myDataFromDb[i].name.toLowerCase()) != -1){
                    delete industryArray[industryArray.indexOf(myDataFromDb[i].name)]
                }
            }

            industryArray.forEach(items=>industryJson.push({"name":items}))
            console.log("====");
            console.log(industryArray);
            resolve(industryJson)
        })    
    })
    let data = await promise;
    console.log("THE END")
    return data
}


module.exports.uploadEquity = async function(){

    let eqArray = []
    let myFiles = fs.createReadStream("D:\\MEAN STACK\\seed\\ind_nifty50list.csv","utf8")
    let industryDb = []
    let equityDb = []

    IndustryModel.find().then(data=>{
        industryDb = data;
    })

    EquityModel.find({},{_id:0,name:1}).then(data=>{
        data.forEach(item=>equityDb.push(item.name))
    })

    let promise = new Promise((resolve,reject)=>{
        myFiles.pipe(new csvReader())
        .on('data',function(row){
            
            let industryName = row[1];

            for(i=0 ; i<industryDb.length ; i++){
            
                if(industryDb[i].name.toLowerCase() == industryName.toLowerCase() && equityDb.indexOf(row[0].toLowerCase()) == -1){
            
                    let eq = {name:row[0],symbol:row[2],isin:row[4],industryId:industryDb[i]._id}
                    eqArray.push(eq);
                }
            }
        })
        .on('end',function(){
            
            resolve(eqArray)
        })    
    })
    let data = await promise;
    console.log("THE END")
    return data
}



