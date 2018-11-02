const express = require('express')
const router = express.Router()
//const Bookshelf = require('../../config/database')
const models = require('../../config/models')
const fs = require('fs')
const constants = require('../../utils/constants')

//get all purchases
router.get('/purchases', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.purchase
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(purchases=>{
                        res.status(200).json({success: true, data: purchases})
                    }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
})

//get purchases by id
router.get('/purchases/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.purchase
                    .forge({id: req.params.id})
                    .fetch().
                then(purchase=>{
                    res.json({success: true, data: purchase})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//create purchases
router.post('/purchases', (req,res)=>{
    const token = req.headers.token
    const unitCount = req.body.unit_count
    const projectId = req.body.project_id
    const investorId = req.body.investor_id


    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    if(!unitCount||!projectId||!investorId){
        return res.status(500).json({success: false, data: {message: `Pls enter data`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            models.project
            .forge({id: projectId})
            .fetch()
            .then(project=>{
                if(project){
                    models.investor
                    .query((qb) => {
                        qb
                        .where({id: investorId})
                    })
                    .fetch()
                    .then(investor => {
                        if (investor) {
                            models.purchase
                            .forge()
                            .save({
                                investor_id: investorId,
                                project_id: projectId,
                                purchase_date: new Date(),
                                unit_count: unitCount,
                                unit_price: project.get(`min_total_price`),

                                status_id: 1,
                                po_doc: '', //PURCHASE PDF FILE LINK
                            })
                            .then(()=>{
                                models.purchases_projects
                                .query((qb) => {
                                    qb
                                    .where({investor_id: investorId})
                                    .andWhere({project_id: projectId})
                                })
                                .fetch()
                                .then((purchase)=>{
                                    if(purchase){
                                        res.json({success: false, data: {message: `Already purchased.`}})
                                    }else{
                                        models.purchases_projects
                                        .forge({
                                            investor_id: investorId,
                                            project_id: projectId
                                        })
                                        .save()
                                        .then(()=>{
                                            return res.json({success: true, data: {message: 'Successfully purchased'}});
                                        })
                                    }
                                })
                            })
                        }else{
                            return res.status(403).json({success: false, message: '403. Restricted'})
                        }
                    })
                }else{
                    return res.status(404).json({success: false, message: '404. Not found'})
                }
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//update purchase
router.put('/purchases/:id', (req,res)=>{
    const token = req.headers.token
    const unitCount = req.body.unit_count
    const projectId = req.body.project_id
    const investorId = req.body.investor_id
    const purchaseId = req.params.id

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    if(!unitCount||!projectId||!investorId){
        return res.status(500).json({success: false, data: {message: `Pls enter data`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.project
                    .forge({id: projectId})
                    .fetch()
                    .then(project=>{
                        if(project){
                            models.investor
                                .query((qb) => {
                                    qb
                                    .where({id: investorId})
                                    //.andWhere({signin_token: token}) //token check here
                                })
                                .fetch()
                                .then(investor => {
                                    if (investor) {
                                        models.purchase
                                            .forge({id:  purchaseId})
                                            .fetch({require: true})
                                            .then(purchase=>{
                                                purchase
                                                .save({
                                                    investor_id: investorId,
                                                    project_id: projectId,
                                                    purchase_date: new Date(),
                                                    unit_count: unitCount,
                                                    unit_price: project.get(`min_total_price`),

                                                    status_id: 1,
                                                    po_doc: '', //PURCHASE PDF FILE LINK
                                                })
                                                .then(()=> {
                                                    return res.status(200).json({success: true, message: `Purchase ${purchaseId} successfully updated`})
                                                })
                                            })
                                    }else{
                                        return res.status(403).json({success: false, message: '403. Restricted'})
                                    }
                                })
                        }else{
                            return res.status(404).json({success: false, message: '404. Not found'})
                        }
                    })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//delete purchases
router.delete('/purchases/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            models.purchase
                .forge({id: req.params.id})
                .fetch()
                .then(purchase=>{
                    if(purchase){
                        console.log(purchase.get('po_doc'), 'adminpanel purchase delete')
                        fs.unlink(`${constants.LINK_FOR_STATIC_FILES}${purchase.get('po_doc').split('/')[purchase.get('po_doc').split('/').length-1]}`, function(err){
                            if(err) {
                                return console.log(err, 'error while unlinking file')
                            }
                            console.log('file deleted successfully')
                        })

                        purchase
                        .destroy()
                        .then(()=>{
                            return res.status(200).json({success: true, data: {message: 'purchase successfully deleted'}});
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
router.delete('/purchases', (req,res)=> {
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
                models.purchase
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