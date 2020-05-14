import express from 'express';
const port = 6700;
const app = express();
import database from './database';

app.get('/mydata',(req,res) => {
    let output = database.getData('first')
    res.send(output)
});

app.post('/mydata',(req,res) => {
    var mydata = {"name":"Alvin","class":"Node"}
    let output = database.postData('first',mydata);
    res.send(output)
})

app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
} )
