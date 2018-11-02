const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')
const Validation = require('../../utils/validation')
const validation = new Validation
const bcrypt = require('bcrypt')

//get all companyContacts
router.get('/companyContacts', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.company_contact
                .forge()
                .orderBy('id')
                .fetchAll()
                .then(companyContacts=>{
                    res.status(200).json({success: true, data: companyContacts})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
})

//get companyContacts by id
router.get('/companyContacts/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.company_contact
                    .forge({id: req.params.id})
                    .fetch().
                then(company_contact=>{
                    res.json({success: true, data: company_contact})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//create companyContacts
router.post('/companyContacts', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                if (!validation.validateText(req.body.contact)) {
                    return {success: false, message: 'contact validation failed'}
                }
                models.company_contact
                    .forge({
                        contact: req.body.contact,
                        icon: req.body.icon
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

//update companyContacts
router.put('/companyContacts/:id', (req,res)=>{
    const token = req.headers.token
    const id = req.params.id

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                if (!validation.validateText(req.body.contact)) {
                    return {success: false, message: 'contact validation failed'}
                }
                models.company_contact
                    .forge({id:  id})
                    .fetch({require: true})
                    .then(company_contact=>{
                        company_contact
                        .save({
                            contact: req.body.contact,
                            icon: req.body.icon
                        })
                        .then(collection=>{
                            res.json({success: true, data: {message: `Succesfully updated company contact ${collection.get('id')}`}})
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

//delete companyContacts
router.delete('/companyContacts/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.company_contact
                    .forge({id: req.params.id})
                    .fetch()
                    .then(company_contact=>{
                        if(company_contact){
                            company_contact
                                .destroy()
                                .then(()=>{
                                    return res.status(200).json({success: true, data: {message: 'company contacts successfully deleted'}});
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

//delete multiple companyContacts
router.delete('/companyContacts', (req,res)=>{
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
                models.company_contact
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