const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')

//get all purchasesProjects
router.get('/purchasesProjects', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.purchases_projects
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(purchases_projects=>{
                        res.status(200).json({success: true, data: purchases_projects})
                    })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//get purchasesProjects by id
router.get('/purchasesProjects/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.purchases_projects
                    .forge({id: req.params.id})
                    .fetch().
                then(purchases_projects=>{
                    res.json({success: true, data: purchases_projects})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//create purchasesProjects
router.post('/purchasesProjects', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.purchases_projects
                    .forge({
                        investor_id: req.body.investor_id,
                        project_id: req.body.project_id
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

//update purchasesProjects
router.put('/purchasesProjects/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.purchases_projects
                    .forge({id:  req.params.id})
                    .fetch({require: true})
                    .then(purchases_projects=>{
                        purchases_projects
                            .save({
                                investor_id: req.body.investor_id,
                                project_id: req.body.project_id
                            })
                            .then(collection=>{
                                res.json({success: true, data: {message: `Succesfully updated purchasesProjects ${collection.get('id')}`}})
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

//delete ourteam
router.delete('/purchasesProjects/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.purchases_projects
                    .forge({id: req.params.id})
                    .fetch()
                    .then(purchases_projects=>{
                        if(purchases_projects){
                            purchases_projects
                                .destroy()
                                .then(()=>{
                                    return res.status(200).json({success: true, data: {message: 'purchasesProjects successfully deleted'}});
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
router.delete('/purchasesProjects', (req,res)=> {
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
                models.purchases_projects
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