const express = require('express');
const router = express.Router();
const userSchema = require('../models/users');

router.get('/', (req,res)=>{
    userSchema.find()
    .then((result) => {
        res.json({result: result})
    }).catch((err) => {
        res.json({message: err.message})
    });
})


router.post('/', async (req,res)=>{
    const newUser = new userSchema({
        name: req.body.name,
        email: req.body.email
    })

    await newUser.save()
    .then((result) => {
        res.json({message: 'user registered', result: result});
    }).catch((err) => {
        res.json({message: err.message})
    });
})

router.get('/:id', (req,res)=>{
    userSchema.findById(req.params.id)
    .then((result) => {
        res.json({result: result})
    }).catch((err) => {
        res.json({message: err.message})
    });
})

router.patch('/:id', async (req,res)=>{

    const newupdateUser = {
        name: req.body.name,
        email: req.body.email
    }
    userSchema.findByIdAndUpdate(req.params.id, newupdateUser)
    .then((result) => {
        res.json({message: 'updated the user'})
    }).catch((err) => {
        res.json({message: err.message})
    });
})

router.delete('/:id', (req,res)=>{
    userSchema.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json({result: result})
    }).catch((err) => {
        res.json({message: err.message})
    });
})

module.exports = router