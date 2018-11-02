const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')

//get all content
router.get('/content', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.content
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(content=>{
                        res.status(200).json({success: true, data: content})
                    }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

        })
})

//get content by id
router.get('/content/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.content
                    .forge({id: req.params.id})
                    .fetch().
                then(content=>{
                    res.json({success: true, data: content})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//create content
router.post('/content', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.content
                    .forge({
                       page_name: req.body.page_name,
                        en: req.body.en,
                        he: req.body.he,
                        media: req.body.media
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

//update content
router.put('/content/:id', (req,res)=>{
    const token = req.headers.token


    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.content
                    .forge({id: req.params.id})
                    .fetch({require: true})
                    .then(content=>{
                        content
                            .save({
                                page_name: req.body.page_name,
                                en: req.body.en,
                                he: req.body.he,
                                media: req.body.media
                            })
                            .then(collection=>{
                                res.json({success: true, data: {message: `Succesfully updated content ${collection.get('id')}`}})
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

//delete content
router.delete('/content/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.content
                    .forge({id: req.params.id})
                    .fetch()
                    .then(content=>{
                        if(content){
                            content
                                .destroy()
                                .then(()=>{
                                    return res.status(200).json({success: true, data: {message: 'content successfully deleted'}});
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

//delete multiple content
router.delete('/content', (req,res)=>{
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
                models.content
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