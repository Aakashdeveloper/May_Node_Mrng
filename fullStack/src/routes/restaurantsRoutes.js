var express = require('express');
var restaurantRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

function router(menu){
	restaurantRouter.route('/')
		.get(function(req,res){
			mongodb.connect(url,function(err,dc){
				if(err){
					res.status(501).send('Error While Connecting')
				}else{
					const dbo = dc.db("nareshit")
					dbo.collection('zomato').find({}).toArray((err,data) => {
						if(err){
							res.status(402).send('Error While Fetching')
						}else{
							res.render('restaurants',{title:'Restaurants List',restaurants:data,menulist:menu})
						}
					})
				}
			})
			console.log("i in in default")
			//res.status(200).send(restaurants)
			
		})

	restaurantRouter.route('/details/:id')
		.get(function(req,res){
			//var id = req.params.id;
			var {id} = req.params
			mongodb.connect(url,function(err,dc){
				if(err){
					res.status(501).send('Error While Connecting')
				}else{
					const dbo = dc.db("nareshit")
					dbo.collection('zomato').findOne({id:id},(err,data) => {
						if(err){
							res.status(402).send('Error While Fetching')
						}else{
							//res.send(data)
							res.render('restaurantDetail',{title:`Restaurants No ${id}`,restaurants:data,menulist:menu})
						}
					})
				}
			})
			
		})

	return restaurantRouter

}

module.exports = router