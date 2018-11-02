const express = require('express')
const router = express.Router()
const models = require('../config/models')


class Crud {
    getItems(route, item){
        router.get(route, (req,res)=>{
            const token = req.headers.token

            if(!token){
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

            models.admin
            .forge({signin_token: token}) //token check here
            .fetch()
            .then(user => {
                if(user){
                    item
                        .forge()
                        .fetch()
                        .then(admins=>{
                            res.status(200).json({success: true, data: admins})
                        })
                }else{
                    res.status(403).json({success: false, data: {message: `403. Restricted.`}})
                }
            }).catch(err=>{
                res.status(500).json({success: false, data: {message: err.message}})
            })
        })
    }

    getItem(route, item){
        router.get(route, (req,res)=>{
            const token = req.headers.token

            if(!token){
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

            models.admin
            .forge({signin_token: token}) //token check here
            .fetch()
            .then(user => {
                if(user){
                    item
                    .forge({id: req.params.id})
                    .fetch()
                    .then(admin=>{
                        res.json({success: true, data: admin})
                    })
                }else{
                    res.status(403).json({success: false, data: {message: `403. Restricted.`}})
                }
            })
        }).catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
    }

    deleteItem(route, item){
        router.delete(route, (req,res)=>{
            const token = req.headers.token

            if(!token){
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }

            models.admin
            .forge({signin_token: token}) //token check here
            .fetch()
            .then(user => {
                if(user){
                    item
                    .forge({id: req.params.id})
                    .fetch()
                    .then(admin=>{
                        if(admin){
                            admin
                            .destroy()
                            .then(()=>{
                                return res.status(200).json({success: true, data: {message: 'Admin successfully deleted'}});
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
    }

    deleteItems(route, item){
        projectRouter.delete(route, (req,res)=>{
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
                    item
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
    }

}

module.exports = Crud