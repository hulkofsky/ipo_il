const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')
const Validation = require('../../utils/validation')
const validation = new Validation
const bcrypt = require('bcrypt')

//get all project_statuses
router.get('/project_statuses', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.project_status
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(project_statuses=>{
                        res.status(200).json({success: true, data: project_statuses})
                    }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
})

//get project_status by id
router.get('/project_statuses/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.project_status
                    .forge({id: req.params.id})
                    .fetch().
                then(project_status=>{
                    res.json({success: true, data: project_status})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//create project_status
router.post('/project_statuses', (req,res)=>{
    const token = req.headers.token
    const statusName = req.body.status_name

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){

                if (!this.validateText(userData.ceo_name)) {
                    return {success: false, message: 'status name validation failed'}
                }

                models.project_status
                    .forge({
                        status_name: statusName
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

//update project_status
router.put('/project_statuses/:id', (req,res)=>{
    const token = req.headers.token
    const statusName = req.body.status_name
    const statusId = req.params.id

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){

                if (!this.validateText(statusName)) {
                    return {success: false, message: 'status name validation failed'}
                }

                models.project_status
                .forge({id:  statusId})
                .fetch({require: true})
                .then(project_status=>{
                    project_status
                    .save({
                        status_name: statusName,
                    })
                    .then(collection=>{
                        res.json({success: true, data: {message: `Succesfully updated status ${collection.get('id')}`}})
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
router.delete('/project_statuses/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.project_status
                    .forge({id: req.params.id})
                    .fetch()
                    .then(admin=>{
                        if(admin){
                            admin
                            .destroy()
                            .then(()=>{
                                return res.status(200).json({success: true, data: {message: 'Project_status successfully deleted'}});
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
router.delete('/project_statuses', (req,res)=> {
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
                models.project_status
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