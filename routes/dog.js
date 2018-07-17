const express = require('express');
const router  = express.Router();
const multer = require('multer');
const Dog = require('../models/Dog')


const uploadCloud = require('../helpers/cloudinary');
const uploads = multer({dest: './public/assets'})



/* Registrar perro*/
router.get('/registerDog', (req, res, next) => {
  res.render('Dog/registerDog');
});

router.post('/registerDog', uploadCloud.single('foto') ,(req,res,next)=>{
    req.body.photoURL = req.file.url;
    Dog.create(req.body)
    .then(dog=>{
        res.redirect('/listDog')
    })
    .catch(e=>res.send(e))
})

router.get('/listDog', (req,res)=>{
    Dog.find()
    .then(dog=>{
        res.render('Dog/dogList', dog)
    })
    .catch(e=>console.log(e))
})





module.exports = router;
