const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const port = 3300;

var Pool = require('pg').Pool;
var pool = new Pool({
    user:'postgres',
    host:'database-1.ca4sdqdfjlvm.ap-southeast-1.rds.amazonaws.com',
    database:'postgres',
    password:'admin987',
    port:'5432'

})

//app.use(bodyParser.urlencoded({extends:false}));
//app.use(bodyParser.json());

app.get('/user',(req,res)=>{
 pool.query('SELECT * from emp',(err,data) => {
     if(err){
         throw err
     }else{
        res.status(200).send(data.rows)
     }
 })
})

app.post('/user',(req,res) => {
    let fbriitisshname = req.body.firstname;
    let rollnr = parseInt(req.body.rolenumber);
    pool.query('INSERT INTO "emp"(fbriitisshname, rollnr) VALUES ($1, $2);',[fbriitisshname,rollnr], (err,result) => {
        if(err){
            throw err
        }
        res.status(200).send('data added')
    })
})


app.listen(port,() => {
    console.log('Server is running')
})