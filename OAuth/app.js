var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var superagent = require('superagent');
var request = require('request');
var port = 7800;

app.use(express.static(__dirname+'/public'));
app.set('views','./src');
app.set('view engine','ejs');

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/profile',(req,res) => {
    //const code = req.query.code
    const {code} = req.query
    console.log("value of code is "+code)
    if(!code){
        res.send({
            success:false,
            message:'Error on login'
        })
    }
    superagent
        .post("https://github.com/login/oauth/access_token")
        .send({
            client_id:"",
            client_secret:"",
            code:code
        })
        .set('Accept', 'application/json')
        .end((err,result) => {
            if(err) throw err;
            var accesstoken = result.body.access_token
            const option = {
                url:`https://api.github.com/user`,
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':'token '+accesstoken,
                    'User-Agent':'may-node'
                }
            }
            var output;
            request(option,(err,response,body)=>{
                output = body;
                return res.send(output)
            })
        })
    
})

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
})
