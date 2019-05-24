var express=require("express");
var router=express.Router();
var admin = require("../model/admin");
const { check,validationResult } = require('express-validator/check');
var jwt=require("jsonwebtoken");
var Mongo=require("mongodb")
router.post("/",
  
[
  check('email').isEmail().withMessage("email is must be require"),


  check("password").matches("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$").withMessage('must be atleast degit ,specil and alph')


  
], (req, res) => {
  
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });

  }else{
  var email =  req.body.email;
  var p = req.body.password;
  admin.findWhere( { $and: [ { email:email  }, { password:p } ] } , function(err, result){
  
		var data={ };
		if(result.length==0) // rusername incorrect
		{
		    data.response="unsuccess";
		    data.result=result;
		    res.send(data);
		}
		else
		{   
			
		       
			data.response="success";
		    data.result=result;
		    jwt.sign({user:"abhi"},"suab",(err,token)=>{
          if(err)
              res.status(400).json("err");
          else{
            var token="Bearer"+" "+token;
            data.token=token
              
				      res.send(data)}
          });
  
    }
	});
 }
	
});
				
		
			
		

module.exports=router;