const express = require('express');
const router  = express.Router();
const multer = require('multer');
const Dog = require('../models/Dog')
const Shelter = require('../models/Shelter')


const uploadCloud = require('../helpers/cloudinary');
const uploads = multer({dest: './public/assets'})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    return res.redirect('/login?next=/profile')
  }

/* Registrar perro*/
router.get('/registerDog', isLoggedIn, (req, res, next) => {
  res.render('Dog/registerDog');
});

router.post('/registerDog', isLoggedIn ,uploadCloud.single('foto') ,(req,res,next)=>{
    req.body.photoURL = req.file.url;
    req.body.shelter = req.shelter._id;

    Dog.create(req.body)
    .then(dog=>{
        return Shelter.findByIdAndUpdate(req.shelter._id, {$push:{dogs: dog._id}})
    }).then(shelter=>{
        res.redirect('/listDog')
    })
    .catch(e=>res.send(e))
})

router.get('/listDog', isLoggedIn, (req,res)=>{
    Dog.find()
    .then(dog=>{
        res.render('Dog/dogList', dog)
    })
    .catch(e=>console.log(e))
})





module.exports = router;
