const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
require("../db/conn");
const User = require("../model/userschema");

router.get("/",(req,res)=>{
    res.send("Hello world from router.js");
})

//user registration
router.post("/signin",async (req,res)=>{
   const {name, email, password, cpassword} = req.body;
   if(!name || !email || !password  ||  !cpassword){
    return res.status(422).json({err: "plz fill the required field"});
   }
try{
    const userExist = await User.findOne({email:email});
    if(userExist){
        res.status(422).json({err: "email already exist"});
    }else if(password != cpassword){
        res.status(422).json({err: "password not matching"});
    }else{
        const user = new User({name, email, password, cpassword});
        //add password in hash before save
    
        await user.save();
        res.status(201).json({message:"user register successfully"});
    }
   
}catch(err){
        console.log(err);
    }
    //console.log(req.body.name);
   //console.log(req.body.email);
   //res.json({message:req.body});
})

//login route
router.post("/login",async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password  ){
            return res.status(400).json({err: "plz fill the required field"});
           }
       const userLogin = await User.findOne({email:email});
       if(userLogin){
        const isMatch = await bcrypt.compare(password,userLogin.password);
       
       //console.log(userLogin);
       if(!isMatch){
        res.status(400).json({error:"Invalid"}); 
       }
       else{
        res.json({message:"user login successfully"});
       }
 
       }else{
        res.status(400).json({error:"Invalid credentials"}); 
       }
    }
       
    catch(err){
        res.status(500).json({err: "failed to login"});
    }

    // console.log(req.body);
    // res.json({message:"login"});
})

module.exports = router;