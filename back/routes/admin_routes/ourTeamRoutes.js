const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')
const Validation = require('../../utils/validation')
const validation = new Validation

//get all ourteam
router.get('/ourteam', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.our_team
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(our_team=>{
                        res.status(200).json({success: true, data: our_team})
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
router.get('/ourteam/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.our_team
                    .forge({id: req.params.id})
                    .fetch().
                then(our_team=>{
                    res.json({success: true, data: our_team})
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
router.post('/ourteam', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                if (!validation.validateText(req.body.first_name)) {
                    return {success: false, message: 'First name validation failed'}
                }

                if (!validation.validateText(req.body.last_name)) {
                    return {success: false, message: 'Last name validation failed'}
                }

                if (!validation.validateText(req.body.position)) {
                    return {success: false, message: 'position validation failed'}
                }

                models.our_team
                    .forge({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        position: req.body.position,
                        photo: req.body.photo
                    })
                    .save()
                    .then(collection=>{
                        res.json({success: true, data: {id: collection.get('id')}})
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
router.put('/ourteam/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                if (!validation.validateText(req.body.first_name)) {
                    return {success: false, message: 'first name validation failed'}
                }

                if (!validation.validateText(req.body.last_name)) {
                    return {success: false, message: 'last name validation failed'}
                }

                if (!validation.validateText(req.body.position)) {
                    return {success: false, message: 'Position validation failed'}
                }
                models.our_team
                    .forge({id:  req.params.id})
                    .fetch({require: true})
                    .then(our_team=>{
                        our_team
                            .save({
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                position: req.body.position,
                                photo: req.body.photo
                            })
                            .then(collection=>{
                                res.json({success: true, data: {message: `Succesfully updated our_team ${collection.get('id')}`}})
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
router.delete('/ourteam/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.our_team
                    .forge({id: req.params.id})
                    .fetch()
                    .then(our_team=>{
                        if(our_team){
                            our_team
                                .destroy()
                                .then(()=>{
                                    return res.status(200).json({success: true, data: {message: 'our_team successfully deleted'}});
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

//delete multiple our_team
router.delete('/ourteam', (req,res)=> {
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
                models.our_team
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