var express=require("express");
var app=express();



var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

  

var upload = require('express-fileupload');
app.use(express.static(__dirname+"/public"));





app.use(express.json());
app.use(bodyparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(upload());


app.use(function (req, res, next) {

    
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});







app.use(require("./controller/default"));

app.listen(process.env.PORT || 2000 ,function(){
	console.log("server")
})


