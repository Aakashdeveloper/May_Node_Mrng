var express = require('express');
var cityRouter = express.Router();

var city = [
    {
		"id": 1,
		"name": "Delhi",
		"country_id": 1,
		"country_name": "India",
		"country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
	},
    {
		"id": 3,
		"name": "Mumbai",
		"country_id": 1,
		"country_name": "India",
		"country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
		
    },
    {
		"id": 280,
		"name": "New York City, NY",
		"country_id": 216,
		"country_name": "United States",
		"country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_216.png",
		
    },
    {
        "id": 32,
		"name": "Pune",
		"country_id": 1,
		"country_name": "India",
		"country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
	        
	},
	{
		"id": 77,
		"name": "Chandigrah",
		"country_id": 1,
		"country_name": "India",
		"country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
	
	},
    {
		"id": 4,
		"name": "Bangalore",
		"country_id": 1,
		"country_name": "India",
		"country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
    }
]

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