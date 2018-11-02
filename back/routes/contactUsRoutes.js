const express = require('express')
const router = express.Router()
const nodemailer = require('../config/nodemailer')
const Validation = require('../utils/validation')
const models = require('../config/models')

const validation = new Validation

router.post('/send', (req,res)=>{
    const email = req.body.email
    const username = req.body.user_name
    const message = req.body.message

    if(!validation.validateEmail(email)){
        return res.json({success: false, message: 'Email validation failed'})
    }

    if(!validation.validateText(username)){
        return res.json({success: false, message: 'Username validation failed'})
    }

    if(message.length > 255){
       return res.json({success: false, message: 'Massage is too long'})
    }

    nodemailer(res, email, `mail_to_support`, message)
    nodemailer(res, email, `mail_contact_us`)


    models.contact_us_mail
    .forge({
        email: email,
        user_name: username,
        message: message
    })
    .save()
    .then(()=>{
        console.log('Contact Us Mail successfully written in DB')
    })
    .catch(err=>{
        console.log(`Error while saving Contact Us Mail in DB - ${err.message}`)
    })
})

module.exports = router