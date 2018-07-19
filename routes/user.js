const express = require("express");
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const Shelter = require('../models/Shelter')
const passportFacebook = require('../helpers/facebook');

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

//Mostrar mis Shelters

router.get('/myShelters', (req,res)=>{
  Shelter.find({user: req.user._id})
  .then(shelter=>{
    console.log(shelter)
    res.render('users/userShelters', {shelter})
  })
  .catch(e=>console.log(e))
})



module.exports = router;
router.get('/facebook', passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
});


router.post('/profile', isLoggedIn, uploadCloud.single('photo'), (req, res, next)=>{
  req.app.locals.loggedUser = req.user;
  req.user.photoURL = req.file.url;
  User.findByIdAndUpdate(req.user._id, req.user, {new:true})
  .then(user=>{
      res.redirect('/profile')
  })
  .catch(e=>next(e))
});

module.exports = router;
