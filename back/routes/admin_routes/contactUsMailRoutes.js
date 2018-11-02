const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')
const Validation = require('../../utils/validation')
const validation = new Validation

//get all project_statuses
router.get('/contactUsMail', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(admin => {
        if(admin){
            models.contact_us_mail
            .forge()
            .orderBy('id')
            .fetchAll()
            .then(contact_us_mail=>{
                res.status(200).json({success: true, data: contact_us_mail})
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }

    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get project_status by id
router.get('/contactUsMail/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.contact_us_mail
                    .forge({id: req.params.id})
                    .fetch().
                then(contact_us_mail=>{
                    res.json({success: true, data: contact_us_mail})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//create visits
router.post('/contactUsMail', (req,res)=>{
    const token = req.headers.token
    const email = req.body.email
    const username = req.body.user_name
    const message = req.body.message

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    if(!validation.validateEmail(email)){
        return res.json({success: false, message: 'Email validation failed'})
    }

    if(!validation.validateText(username)){
        return res.json({success: false, message: 'Username validation failed'})
    }

    if(message.length > 255){
        return res.json({success: false, message: 'Massage is too long'})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.contact_us_mail
                    .forge({
                        user_name: username,
                        email: email,
                        message: message
                    })
                    .save()
                    .then(collection=>{
                        res.json({success: true, data: {id: collection.get('id')}})
                    }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//update contactUsMail
router.put('/contactUsMail/:id', (req,res)=>{
    const token = req.headers.token
    const email = req.body.email
    const username = req.body.user_name
    const message = req.body.message

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    if(!validation.validateEmail(email)){
        return res.json({success: false, message: 'Email validation failed'})
    }

    if(!validation.validateText(username)){
        return res.json({success: false, message: 'Username validation failed'})
    }

    if(message.length > 255){
        return res.json({success: false, message: 'Massage is too long'})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.contact_us_mail
                    .forge({id:  req.params.id})
                    .fetch({require: true})
                    .then(contact_us_mail=>{
                        contact_us_mail
                            .save({
                                user_name: username,
                                email: email,
                                message: message
                            })
                            .then(collection=>{
                                res.json({success: true, data: {message: `Succesfully updated contact_us_mail ${collection.get('id')}`}})
                            })
                    })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//delete contactUsMail
router.delete('/contactUsMail/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.contact_us_mail
                    .forge({id: req.params.id})
                    .fetch()
                    .then(contact_us_mail=>{
                        if(contact_us_mail){
                            contact_us_mail
                                .destroy()
                                .then(()=>{
                                    return res.status(200).json({success: true, data: {message: 'contact_us_mail successfully deleted'}});
                                })
                        }else{
                            return res.status(404).json({success: false, data: {message: `404. Not found.`}})
                        }
                    })
            }else{
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            return res.status(500).json({success: false, data: {message: err.message}})
        })
})

//delete multiple project_status
router.delete('/contactUsMail', (req,res)=>{
    const token = req.headers.token
    const ids = JSON.parse(req.body.ids)

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.contact_us_mail
                    .query()
                    .whereIn('id', ids).del().then(count=>{
                    res.status(200).json({success: true, data: {message: `Successfully deleted ${count} rows.`}})
                })
            }else{
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            return res.status(500).json({success: false, data: {message: err.message}})
        })
})

module.exports = router