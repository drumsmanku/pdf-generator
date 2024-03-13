
const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const User=require('../Models/Users')

router.post('/signup', async(req, res)=>{
  const {name,email, mobile, password}= req.body
  try{
    const exisingUser=await User.findOne({email })
    if(exisingUser){
      res.send({message:'User already exists, please login.'})

    }else{
      const newPassword = await bcrypt.hash(password, 10)
      const newUser={
        name, 
        email,
        mobile,
        password: newPassword
      }
      User.create(newUser).then(()=>{
        const jwtToken=jwt.sign(newUser,process.env.JWT_SECRET_KEY, {expiresIn:3600} )
        res.json({ status: "success", jwtToken, name: newUsers.name });

      })
      .catch(err=>res.send(err))
    }
  }
  catch(err){
    res.send(err)
  }
 
})


router.post('/login',async (req, res)=>{
  
  try{
    const {email, password} = req.body;
    const userInDB=await User.findOne({email});
    if(!userInDB){
      res.send({message:'user not found in database. Please Sign up'});
      return
    }
    const existingUser=await bcrypt.compare(password, userInDB.password);
    if(existingUser){
      const jwtToken=jwt.sign(userInDB.toJSON(),process.env.JWT_SECRET_KEY, {expiresIn:3600} )
      res.send({message:"user exists, Signed in successfully",jwtToken, name: userInDB.name })
    }
    else{
      res.send({message:'invalid credentials'})
    }

  }
  catch(err){
    console.log(err)
    res.send({message:"FAILED"})
  }
  
})

module.exports=router



