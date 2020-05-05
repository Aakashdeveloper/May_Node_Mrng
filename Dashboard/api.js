const express = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const mongourl ="mongodb://localhost:27017";
let db;
let col_name = "maynode";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.status(200).send('Health Check')
})

app.get('/users',(req,res)=>{
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
});


app.post('/addUser',(req,res)=>{
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Added')
        }
    })
})



MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error While Connecting');
    db = client.db('classpractice');
    app.listen(port,(err)=>{
        console.log(`Server is running on port ${port}`)
    })
})
