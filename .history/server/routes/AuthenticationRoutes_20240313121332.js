const express = require('express');
const router=express.Router()
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const User=require('../Models/Users');

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

router.post('/login', async(req, res)=>{
  const {email, password}=req.body;
  try{
    const existingUser = await User.findOne({email})
    if(existingUser){
      const UserInDb=await bcrypt.compare(existingUser.password, password)
      if(UserInDb){
        const jwtToken=jwt.sign(UserInDb.toJSON(),process.env.JWT_SECRET_KEY, {expiresIn:3600} )
        res.send({message:"user exists, Signed in successfully",jwtToken, name: UserInDb.name })
      }
      else{
        res.send({message:'Password does not match'})
      }
    }
    else{
      res.send({message:'User does not exist'})
      return
    }
  }
  catch(err){
    console.log(err)
  }
})

module.exports=router