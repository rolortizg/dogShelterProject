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

function isAuthenticated(req,res,next){
  if(req.isAuthenticated()) return res.redirect('/profile');
  return next();
}

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  return res.redirect('/login?next=/profile')
}

router.get("/profile",isLoggedIn,(req,res)=>{
    res.render('users/profile', req.user)
})

module.exports = router;