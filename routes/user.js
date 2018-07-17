const express = require("express");
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

//multer config
const multer = require('multer');
const upload = multer({dest: './public/assets'});

//cloudinary
const cloudinary = require('cloudinary');
const uploadCloud = require('../helpers/cloudinary')


function isActive(req,res,next){
  if(req.user.active === true)  return next();
  return res.send("Please activate your account in your email")
}

function isAuthenticated(req,res,next){
  if(req.isAuthenticated()) return res.redirect('/profile');
  return next();
}

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  } else {
    console.log('aqui ta')
    return res.redirect('/login?next=/profile')
  }
  
}

router.get("/profile",isLoggedIn,isActive,(req,res)=>{
    res.render('users/profile', req.user)
})

module.exports = router;