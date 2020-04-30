var express = require('express');
var cityRouter = express.Router();


function router(menu){

	cityRouter.route('/')
		.get(function(req,res){
			//res.status(200).send(city)
			res.render('city',{title:'City List',city:city,menulist:menu})
		})

	cityRouter.route('/details')
		.get(function(req,res){
			res.status(200).send("City details")
		})

	return cityRouter
}


module.exports  = router;