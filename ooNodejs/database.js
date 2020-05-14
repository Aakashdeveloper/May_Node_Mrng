const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const dbName="classpratice";

const MainCall = {}

var output;
MainCall.getData = (colName) => {
    MongoClient.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(colName).find({}).toArray((err,result) => {
        if(err) throw err;
        console.log('Data Fetched') 
        output = result
        });
    });
    return output
}

MainCall.postData = (colName,dbObj) => {
    MongoClient.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(colName).insert(dbObj,(err,result) => {
        if(err) throw err;
        console.log('Data Inserted') 
         db.close()
        });
    });
    let out = `Data Added in collection ${colName}`
    return out
}

export default MainCall;