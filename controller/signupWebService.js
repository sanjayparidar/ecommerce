var express=require("express");
var router=express.Router();
var user = require("../model/user");
const Nexmo = require('nexmo');
var jwt=require("jsonwebtoken");

// router.use(bodyParser.urlencoded({ extended: true }));
const { check,validationResult } = require('express-validator/check');

router.post("/",
    check('name').matches("^[A-Za-z- ]+$"),
    check('email').isEmail().withMessage("email is must be require"),
    check('mobile').isLength({ min: 10 }).withMessage('must be at least 10 chars long'),
    check('city').matches("^[A-Za-z]+$").withMessage("city must be required"),
    check('address').matches("[A-Za-z0-9-, ]+$").withMessage("adress must be required"),
    check("state").matches("^[A-Za-z- ]+$").withMessage("state is must be require"),

    check("password").matches("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$").withMessage('must be atleast degit ,specil and alph')

	,function(req,res){
    
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() });
     }
     else{
	// console.log(req.body)
      user.findWhere({ email:req.body.email}, function(err, result){
        // console.log(result.length)
        if(result.length==0){
          // var today = ("0"+new Date().getDate()).slice(-2)+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getFullYear()).slice(-4)+' '+("0"+new Date().getHours()).slice(-2)+':'+("0"+new Date().getMinutes()).slice(-2);
          // req.body.date=today;
            user.insert(req.body, function(err, result){
              var data={ }
             data.response="success";
             data.result=result.ops
             jwt.sign({user:req.body},"suab",(err,token)=>{
          if(err)
              res.status(400).json("err");
          else{
            var token="Bearer"+" "+token;
                data.otpstatus="success"
              data.token=token

              res.send(data)}
          });
          });
         
       
     

       }else{
        
        data={ };
        data.response="user allredy resister"
        res.send(data)
       }
     });   
   }
 });
     
module.exports=router;