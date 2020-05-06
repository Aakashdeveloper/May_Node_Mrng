const express = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors')
const mongourl ="mongodb://localhost:27017";
let db;
let col_name = "maynode";

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.status(200).send('Health Check')
})

// Select
app.get('/users',(req,res)=>{
    var query = {}
    if(req.query.id){
        query ={_id:parseInt(req.query.id),isActive:true}
    }else if(req.query.city){
        query ={city:req.query.city,isActive:true}
    }else{
        query={isActive:true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
});

// Insert
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



//Update
app.put('/updateUser',(req,res) => {
    db.collection(col_name).update(
        { _id: req.body._id },
        {
          $set: {
            name: req.body.name,
            city: req.body.city,
            phone: req.body.phone,
          }
        },(err,result) => {
            if(err){
                throw err
            }else{
                res.send('Data Updated')
            }
        }
     )
})


//Delete
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).remove({_id:parseInt(req.body.id)},(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Deleted')
        }
    })
})


//SoftDelete
app.put('/deactivateUser',(req,res) => {
    db.collection(col_name).update(
        { _id: req.body.id },
        {
          $set: {
            isActive:false
          }
        },(err,result) => {
            if(err){
                throw err
            }else{
                res.send('Data Updated')
            }
        }
     )
})

//SoftDelete
app.put('/activateUser',(req,res) => {
    db.collection(col_name).update(
        { _id: req.body.id },
        {
          $set: {
            isActive:true
          }
        },(err,result) => {
            if(err){
                throw err
            }else{
                res.send('Data Updated')
            }
        }
     )
})


MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error While Connecting');
    db = client.db('classpractice');
    app.listen(port,(err)=>{
        console.log(`Server is running on port ${port}`)
    })
})
