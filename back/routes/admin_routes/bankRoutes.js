const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')
const Validation = require('../../utils/validation')
const validation = new Validation
const bcrypt = require('bcrypt')

//get all banks
router.get('/banks', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.bank
                .forge()
                .orderBy('id')
                .fetchAll()
                .then(banks=>{
                    console.log(JSON.stringify(banks))
                    res.status(200).json({success: true, data: banks})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
})

//get banks by id
router.get('/banks/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.bank
                    .forge({id: req.params.id})
                    .fetch().
                then(banks=>{

                    return res.json({success: true, data: banks})
                }).catch(err=>{
                    return res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//create banks
router.post('/banks', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                if (!validation.validateText(req.body.branch_name)) {
                    return {success: false, message: 'Branch name validation failed'}
                }

                if (!validation.validateText(req.body.name)) {
                    return {success: false, message: 'Bank name validation failed'}
                }

                if (!validation.validateText(req.body.unit_name)) {
                    return {success: false, message: 'Unit name validation failed'}
                }

                if (!validation.validatePhone(req.body.fax)) {
                    return {success: false, message: 'Fax validation failed'}
                }

                models.bank
                    .forge({
                        branch_name:req.body.branch_name,
                        fax: req.body.fax,
                        name: req.body.name,
                        unit_name: req.body.unit_name,
                    })
                    .save()
                    .then(collection=>{
                        res.status(200).json({success: true, data: {id: collection.get('id')}})
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

//update banks
router.put('/banks/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                if (!validation.validateText(req.body.branch_name)) {
                    return {success: false, message: 'Branch name validation failed'}
                }

                if (!validation.validateText(req.body.name)) {
                    return {success: false, message: 'Bank name validation failed'}
                }

                if (!validation.validateText(req.body.unit_name)) {
                    return {success: false, message: 'Unit name validation failed'}
                }

                if (!validation.validatePhone(req.body.fax)) {
                    return {success: false, message: 'Fax validation failed'}
                }

                models.bank
                    .forge({id:  req.params.id})
                    .fetch({require: true})
                    .then(bank=>{
                        bank
                        .save({
                            branch_name:req.body.branch_name,
                            fax: req.body.fax,
                            name: req.body.name,
                            unit_name: req.body.unit_name,
                        })
                        .then(collection=>{
                            res.json({success: true, data: {message: `Succesfully updated bank ${collection.get('id')}`}})
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

//delete bank
router.delete('/banks/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.bank
                .forge({id: req.params.id})
                .fetch()
                .then(banks=>{
                    if(banks){
                        banks
                        .destroy()
                        .then(()=>{
                            return res.status(200).json({success: true, data: {message: 'Bank successfully deleted'}});
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

//delete multiple banks
router.delete('/banks', (req,res)=>{
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
                models.bank
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