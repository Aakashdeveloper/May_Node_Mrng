var express = require('express');
var app = express();
var port = process.env.PORT || 8900;
var menu = [
    {link:'/',name:'Home'},
    {link:'/restaurants',name:'Restaurants'},
    {link:'/city',name:'City'}
]

var restaurantRouter = require('./src/routes/restaurantsRoutes')(menu)
var cityRouter = require('./src/routes/cityRoutes')(menu);
//Static File Path
app.use(express.static(__dirname+'/public'));
//HTML
app.set('views', './src/views');
//View Engine
app.set('view engine', 'ejs');

//Routes
app.get('/',function(req,res){
    //res.status(200).send('<h1>Welcome to Node JS First App</h1>')
    res.render('index',{menulist:menu})
})

app.use('/restaurants',restaurantRouter);
app.use('/city',cityRouter)

app.listen(port,function(err){
    if(err) throw err;
    console.log(`App is running in port ${port}`)
})