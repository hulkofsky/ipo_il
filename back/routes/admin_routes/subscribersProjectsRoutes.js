const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')

//get all ourteam
router.get('/subscribersProjects', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.subscribers_projects
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(subscribersProjects=>{
                        res.status(200).json({success: true, data: subscribersProjects})
                    })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//get ourteam by id
router.get('/subscribersProjects/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.subscribers_projects
                    .forge({id: req.params.id})
                    .fetch().
                then(subscribersProjects=>{
                    res.json({success: true, data: subscribersProjects})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//create ourteam
router.post('/subscribersProjects', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.subscribers_projects
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

//update ourteam
router.put('/subscribersProjects/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.subscribers_projects
                    .forge({id:  req.params.id})
                    .fetch({require: true})
                    .then(our_team=>{
                        our_team
                            .save({
                                investor_id: req.body.investor_id,
                                project_id: req.body.project_id
                            })
                            .then(collection=>{
                                res.json({success: true, data: {message: `Succesfully updated subscribersProjects ${collection.get('id')}`}})
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
router.delete('/subscribersProjects/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.subscribers_projects
                    .forge({id: req.params.id})
                    .fetch()
                    .then(subscribersProjects=>{
                        if(subscribersProjects){
                            subscribersProjects
                                .destroy()
                                .then(()=>{
                                    return res.status(200).json({success: true, data: {message: 'subscribersProjects successfully deleted'}});
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

//delete multiple subscribersProjects
router.delete('/subscribersProjects', (req,res)=> {
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
                models.subscribers_projects
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