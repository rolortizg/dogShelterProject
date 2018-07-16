const express = require("express");
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const sendActivationLink= require('../helpers/mailer').sendActivationLink;

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
    if(req.isAuthenticated()){
      return next()
    }else{
      return res.redirect("/login?next=/activation")
    }
}

router.get('/activation',(req,res,next)=>{
  
  console.log(req.query)
  User.findByIdAndUpdate(req.query.user, {active:true}, {new:true})
  .then(user=>{
    console.log(user);
      res.send('Activado, gracias ' + user.username);
  })
  .catch(e=>next(e))
})


router.get('/signup',(req,res)=>{
    res.render('auth/signup')
});

router.post('/signup',uploadCloud.single('photo'),(req,res,next)=>{
  req.body.photoURL = req.file.url;
  if(req.body.password !== req.body.password2){
    req.body.err = "Tu password no coincide"
    res.render('auth/signup', req.body)
  }
  User.register(req.body, req.body.password)
  
  .then(user=>{
    passport.authenticate('local')(req,res,()=>{
   
      console.log(req.user)
    })
    console.log('entraste')
    //activation link
    // sendActivationLink(user);
    //loguearlo automaticamente
    res.redirect('/login')
    sendActivationLink(user)
})
.catch(e=>{
    next(e)
    res.render('auth/signup', req.body)
});
});

router.get('/login',isAuthenticated,(req,res)=>{
    res.render("auth/login")
})
router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  if(req.body.next) res.redirect(req.body.next);
  //  req.app.locals.loggedUser = req.user;
  res.redirect('/profile')
});

router.get('/logout', (req,res,next)=>{
  req.logout();
  res.redirect('/')
});

router.get("/profile", (req,res)=>{
    res.render('users/profile', req.user)
})

module.exports = router;