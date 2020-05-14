var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../config');
var bcrypt = require('bcryptjs');
var User = require('./user');
var Address = require('./Address')
var cors = require('cors')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(cors())

router.post('/register',(req,res)=>{
 var hashedpassword = bcrypt.hashSync(req.body.password,8);
 User.create({
     name:req.body.name,
     email:req.body.email,
     password:hashedpassword,
     role:req.body.role?req.body.role:'user'
 },(err,user)=>{
     if(err) return res.status(500).send('There was a problem in registration')
     res.status(200).send('Registration Success')
 })
});

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send('Error on Server');
        if(!user) return res.status(404).send('No User Found')
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsValid) return res.status(401).send({auth:false,token:null})
            var token = jwt.sign({id:user._id},config.secert,{expiresIn:86400});
            res.send({auth:true, token:token})
        }
    })

});

router.get('/userInfo',(req,res) =>{
    var token = req.headers['x-access-token']
    if(!token) res.status(401).send({auth:false, token:'No Token Provider'})
    jwt.verify(token, config.secert,(err,data) => {
        if(err) return res.status(500).send("Error in Token");
        User.findById(data.id,{password:0},(err,user)=>{
            if(err) return res.status(500).send("Error finding user");
            if(!user) return res.status(500).send({auth:false, token:'No User Found'});
            res.send(user)
        })
    })
})

router.get('/users',(req,res)=>{
  User.find({}, (err,user) => {
      if(err) throw err;
      res.send(user);
  })
})

module.exports = router
