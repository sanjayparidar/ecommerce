var express=require("express");
var router=express.Router();
var user = require("../model/user");
const { check,validationResult } = require('express-validator/check');
var jwt=require("jsonwebtoken");
var Mongo=require("mongodb")
router.post("/",
  
[
  check('mobile').isLength({ min: 10 }).withMessage('must be at least 10 chars long'),


  check("password").matches("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$").withMessage('must be atleast degit ,specil and alph')


  
], (req, res) => {
  
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });

  }else{
  var m =  req.body.mobile
  var p = req.body.password;
//   console.log(req.body,"31 line ++++++______++++++ssssssssssssss")
user.findWhere( { $and: [ { mobile:m  }, { password:p } ] } , function(err, result){
  
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