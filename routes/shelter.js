const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const Shelter = require('../models/Shelter')
const router = express.Router();

const uploadCloud = require('../helpers/cloudinary');



//Registrar el shelter

router.get('/registerShelter', (req,res)=>{
  res.render('Shelter/RegisterShelter')
})


//Mostrar los refugios disponibles

router.post('/registerShelter',uploadCloud.single('photo'), (req,res)=>{
  req.body.photo = req.file.url
  Shelter.create(req.body)
  .then(refugio=>{
    console.log(refugio)
    res.redirect('/shelterList')
  })
  .catch(e=>console.log(e))
})

router.get('/shelterList', (req,res)=>{
  Shelter.find()
  .then(shelt=>{
    console.log(shelt)
    res.render('Shelter/shelterList', shelt)
  })
  .catch(e=>console.log(e));
})


router.get('/shelterList/:id', (req,res,next)=>{
  Shelter.findById(req.params.id)
  .then(shelter=>{
    console.log(shelter)
    res.render('Shelter/sheltairDetail', shelter)
  })
  .catch(e=>console.log(e))
})
module.exports = router;