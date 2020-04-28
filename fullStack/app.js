var express = require('express');
var app = express();
var port = process.env.PORT || 8900;
var restaurantRouter = require('./src/routes/restaurantsRoutes')
var cityRouter = require('./src/routes/cityRoutes');

//Static File Path
app.use(express.static(__dirname+'/public'));
//HTML
app.set('views', './src/views');
//View Engine
app.set('view engine', 'ejs');

//Routes
app.get('/',function(req,res){
    //res.status(200).send('<h1>Welcome to Node JS First App</h1>')
    res.render('index')
})

app.use('/restaurants',restaurantRouter);
app.use('/city',cityRouter)

app.listen(port,function(err){
    if(err) throw err;
    console.log(`App is running in port ${port}`)
})