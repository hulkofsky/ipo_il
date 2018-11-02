const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')

//get all banks
router.get('/purchaseStatuses', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.purchase_status
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(purchaseStatuses=>{
                        res.status(200).json({success: true, data: purchaseStatuses})
                    }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
})

//get banks by id
router.get('/purchaseStatuses/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            models.purchase_status
                .forge({id: req.params.id})
                .fetch().
            then(purchaseStatus=>{
                res.json({success: true, data: purchaseStatus})
            }).catch(err=>{
                res.status(500).json({success: false, data: {message: err.message}})
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
})

//create banks
router.post('/purchaseStatuses', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){

                if (!this.validateText(purchase_status)) {
                    return {success: false, message: 'purchase_status validation failed'}
                }

                models.purchase_status
                    .forge({
                        status_name: req.body.status_name
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

//update banks
router.put('/purchaseStatuses/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){

                if (!this.validateText(purchase_status)) {
                    return {success: false, message: 'purchase_status validation failed'}
                }

                models.purchase_status
                    .forge({id:  req.params.id})
                    .fetch({require: true})
                    .then(purchaseStatuses=>{
                        purchaseStatuses
                            .save({
                                status_name: req.body.status_name
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

//delete project_status
router.delete('/purchaseStatuses/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.purchase_status
                    .forge({id: req.params.id})
                    .fetch()
                    .then(purchaseStatuses=>{
                        if(purchaseStatuses){
                            purchaseStatuses
                                .destroy()
                                .then(()=>{
                                    return res.status(200).json({success: true, data: {message: 'purchaseStatuses successfully deleted'}});
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

//delete multiple project_statuses
router.delete('/purchaseStatuses', (req,res)=> {
    const token = req.headers.token
    const ids = JSON.parse(req.body.ids)

    if (!token) {
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if (user) {
                models.purchase_status
                    .query()
                    .whereIn('id', ids).del().then(count => {
                    res.status(200).json({success: true, data: {message: `Successfully deleted ${count} rows.`}})
                })
            } else {
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err => {
            return res.status(500).json({success: false, data: {message: err.message}})
        })
})

module.exports = router