const express = require('express')
const router = express.Router()
const models = require('../../config/models')

//get all subscribers
router.get('/subscribers', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.subscriber
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(subscriber=>{
                        res.status(200).json({success: true, data: subscriber})
                    }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
})

//get subscribers by id
router.get('/subscribers/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.subscriber
                    .forge({id: req.params.id})
                    .fetch().
                then(subscriber=>{
                    res.json({success: true, data: subscriber})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//create subscribers
router.post('/subscribers', (req,res)=>{
    const token = req.headers.token
    const unitCount = req.body.unit_count
    const projectId = req.body.project_id
    const investorId = req.body.investor_id


    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
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
                                        models.subscriber
                                            .forge()
                                            .save({
                                                investor_id: investorId,
                                                project_id: projectId,
                                                subscribe_date: new Date(),
                                            })
                                            .then(()=>{
                                                models.subscribers_projects
                                                    .query((qb) => {
                                                        qb
                                                        .where({investor_id: investorId})
                                                        .andWhere({project_id: projectId})
                                                    })
                                                    .fetch()
                                                    .then((purchase)=>{
                                                        if(purchase){
                                                            res.json({success: false, data: {message: `Already subscribed.`}})
                                                        }else{
                                                            models.subscribers_projects
                                                            .forge({
                                                                investor_id: investorId,
                                                                project_id: projectId
                                                            })
                                                            .save()
                                                            .then(()=>{
                                                                return res.json({success: true, data: {message: 'Successfully subscribed'}});
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

//update subscribers
router.put('/subscribers/:id', (req,res)=>{
    const token = req.headers.token
    const unitCount = req.body.unit_count
    const projectId = req.body.project_id
    const investorId = req.body.investor_id
    const subscriberId = req.params.id

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
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
                                        models.subscriber
                                            .forge({id:  subscriberId})
                                            .fetch({require: true})
                                            .then(subscriber=>{
                                                subscriber
                                                    .save({
                                                        investor_id: investorId,
                                                        project_id: projectId,
                                                        subscribe_date: new Date()
                                                    })
                                                    .then(()=> {
                                                        return res.status(200).json({success: true, message: `subscriber ${subscriberId} successfully updated`})
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

//delete subscribers
router.delete('/subscribers/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.subscriber
                    .forge({id: req.params.id})
                    .fetch()
                    .then(subscriber=>{
                        if(subscriber){
                            subscriber
                                .destroy()
                                .then(()=>{
                                    return res.status(200).json({success: true, data: {message: 'subscriber successfully deleted'}});
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

//delete multiple subscribers
router.delete('/subscribers', (req,res)=> {
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
                models.subscriber
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