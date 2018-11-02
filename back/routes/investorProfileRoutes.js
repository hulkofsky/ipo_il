const express = require('express')
const router = express.Router()
const Bookshelf = require('../config/database')
const Validation = require('../utils/validation')
const constants = require('../utils/constants')
const knex = require('knex')
const bcrypt = require('bcrypt')
const models = require('../config/models')
const validation = new Validation

router.get('/:investorId/subscribedProjects', (req, res) => {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.params.investorId

    console.log(token, 'subscribedProjects token')



    if(!investorId || !token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({withRelated: [`subscribed_projects`]})
    .then(user => {
        if(user){
            models.content
            .query((qb) => {
                qb
                .where({page_name: 'dashboard'})
                .orWhere({page_name: 'inv_purchase_projects'})
            })
            .orderBy('page_name')
            .fetchAll({columns: [lang, `media`]})
            .then(pageContent => {
                res.json({
                    success: true,
                    data: {
                        pageContent: pageContent,
                        data: user
                    }
                })
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        console.log(err, `error`)
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:investorId/purchasedprojects', (req, res) => {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.params.investorId

    console.log(investorId, 'investorId purchasedprojects')
    console.log(token, 'token purchased project')

    if(!investorId || !token){
        console.log("nop token or investor id")
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({withRelated: [`purchased_projects.purchases`]})
    .then(user => {
        if(user){

            models.content
            .query((qb) => {
                qb
                .where({page_name: 'dashboard'})
                .orWhere({page_name: 'inv_purchase_projects'})
            })
            .orderBy('page_name')
            .fetchAll({columns: [lang, `media`]})
            .then(pageContent => {
                return res.status(200).json({
                    success: true,
                    data: {
                        pageContent: pageContent,
                        data: user
                    }
                })
            })
        }else{
            console.log('no user in db')
            return res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        return res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:investorId/purchasedprojects/:projectId', (req, res) => {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.params.investorId
    const projectId = req.params.projectId

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if(user){
            user
            .related('purchased_projects')
            .query('where', 'project_id', projectId)
            .fetchOne()
            .then((project)=>{
                if(project){
                    models.contents
                    .query((qb) => {
                        qb
                        .where({page_name: 'dashboard'})
                        .orWhere({page_name: 'inv_project_name'})
                    })
                    .orderBy('page_name')
                    .fetch({columns: [lang, `media`]})
                    .then(pageContent => {
                        res.json({
                            success: true,
                            data: {
                                pageContent: pageContent,
                                project: project,
                                user: user
                            }
                        })
                    })
                }else{
                    res.status(404).json({success: false, data: {message: `404. Not found.`}})
                }
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })

})

router.delete('/:investorId/purchasedprojects/:projectId', (req, res) => {
    const investorId = req.params.investorId
    const projectId = req.params.projectId
    const token = req.headers.token

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if(user){
            models.purchases_projects
            .query('where', 'project_id', projectId)
            .fetch()
            .then((project)=>{
                if(project){
                    project
                    .destroy()
                    .then(()=>{
                        res.status(200).json({success: true, data: {message: `Project successfully deleted`}})
                    })
                }else{
                    res.status(404).json({success: false, data: {message: `404. Not found.`}})
                }
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        console.log(err, 'error ')
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:investorId/subscribedProjects/:projectId', (req, res) => {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.params.investorId
    const projectId = req.params.projectId

    models.investor
    .query((qb) => {
        qb
            .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if(user){
            user
            .related('subscribed_projects')
            .query('where', 'project_id', projectId)
            .fetchOne()
            .then((project)=>{
                if(project){
                    models.contents
                    .query((qb) => {
                        qb
                        .where({page_name: 'dashboard'})
                        .orWhere({page_name: 'inv_project_name'})
                    })
                        .orderBy('page_name')
                    .fetch({columns: [lang, `media`]})
                    .then(pageContent => {
                        res.json({
                            success: true,
                            data: {
                                pageContent: pageContent,
                                project: project,
                                user: user
                            }
                        })
                    })
                }else{
                    res.status(404).json({success: false, data: {message: `404. Not found.`}})
                }
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.delete('/:investorId/subscribedProjects/:projectId', (req, res) => {
    const investorId = req.params.investorId
    const projectId = req.params.projectId
    const token = req.headers.token

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if(user){
            models.subscribers_projects
            .query('where', 'project_id', projectId)
            .fetch()
            .then((project)=>{
                if(project){
                    project
                    .destroy()
                    .then(()=>{
                        res.status(200).json({success: true, data: {message: `Project successfully deleted`}})
                    })
                }else{
                    res.status(404).json({success: false, data: {message: `404. Not found.`}})
                }
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:investorId/purchasedprojects/:projectId/statistics', (req, res) => {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.params.investorId
    const projectId = req.params.projectId

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if (user) {
            user
            .related('purchased_projects')
            .query('where', 'project_id', projectId)
            .fetchOne()
            .then((project)=>{
                if(project){
                    user
                    .related('purchases')
                    .query('where','project_id', projectId)
                    .fetch()
                    .then(() => {
                        models.contents
                        .query((qb) => {
                            qb
                            .where({page_name: 'dashboard'})
                            .orWhere({page_name: 'inv_stats'})
                        })
                        .orderBy('page_name')
                        .fetch({columns: [lang, `media`]})
                        .then(pageContent => {
                            res.status(200).json({
                                success: true,
                                data: {
                                    pageContent: pageContent,
                                    project: project,
                                    user: user,
                                }
                            })
                        })
                    })
                }else{
                    return res.status(404).json({success: false, data: {message: `Not found.`}})
                }
            })
        } else {
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:investorId/myprofile', (req, res) => {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.params.investorId

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({
        columns: [
            `id`,
            `first_name`,
            `last_name`,
            `email`,
            `phone`,
            `bank_id`,
            `account_number`
        ],
        withRelated: ['banks']
    })
    .then(user => {
        if(user){
            models.bank
                .forge() //selecting BANKS
                .fetchAll()
                .then(banks=>{
                    models.content
                    .query((qb) => {
                        qb
                            .where({page_name: 'dashboard'})
                            .orWhere({page_name: 'inv_my_profile'})
                    })
                    .orderBy('page_name')
                    .fetchAll({columns: [lang, `media`]})
                    .then(pageContent => {
                        res.json({
                            success: true,
                            data: {
                                usersettings: user,
                                pageContent: pageContent,
                                banks: banks
                            }
                        })
                    })
                })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.put('/:investorId/myprofile', (req,res)=>{
    const userData = req.body
    const token = req.headers.token
    const investorId = req.params.investorId

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if(user){

           const validateInvestorData = validation.validateInvSignup(userData)

            if(validateInvestorData.success == false) {
                console.log(validateInvestorData.message, 'false')
                return res.status(500).json({success: false, data: {message: validateInvestorData.message}});
            }

            console.log(userData.password, 'entered password')
            console.log(user.get('password'), 'pasword hash')

            bcrypt.compare(userData.password, user.attributes.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    return res.json({
                        success: false,
                        massage: `An error has been occured while comparing passwords ${err}`
                    })
                }
                if (isMatch) {
                    models.bank
                    .where({name: userData.bank_name})
                    .fetch({ columns: ['id'] })
                    .then(bank=>{
                        user
                        .save({
                            first_name: userData.first_name,
                            last_name: userData.last_name,
                            email: userData.email,
                            phone: userData.phone,
                            bank_id: bank.get('id'),
                            account_number: userData.account_number,
                        })
                        .then(()=>{
                            res.status(200).json({success: true, data: {message: `User details updated`}});
                        })
                    })
                } else {
                    res.status(403).json({success: false, message: '403. Authentication failed. Passwords did not match'})
                }
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        console.log(err, 'error')
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:investorId/settings', (req, res) => {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.params.investorId

    models.investor
    .query((qb) => {
        qb
            .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({
        columns: [
            `id`,
            `first_name`,
            `last_name`,
            `project_running_notification`,
            `project_subscription_notification`,
            `project_purchases_notification`,
            `project_deleted_notification`,
            `project_edited_notification`,
            `project_days_left_notification`
        ]
    })
    .then(user => {
        if(user){
            models.content
            .query((qb) => {
                qb
                .where({page_name: 'dashboard'})
                .orWhere({page_name: 'inv_settings'})
            })
            .orderBy('page_name')
            .fetchAll({columns: [lang, `media`]})
            .then(pageContent => {
                res.json({
                    success: true,
                    data: {
                        usersettings: user,
                        pageContent: pageContent
                    }
                })
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:investorId/terms', (req, res) => {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.params.investorId

    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if(user){
            models.content
            .query((qb) => {
                qb
                .where({page_name: 'dashboard'})
                .orWhere({page_name: 'inv_terms'})
            })
            .orderBy('page_name')
            .fetchAll({columns: [lang, `media`]})
            .then(pageContent => {
                res.json({
                    success: true,
                    data: {
                        pageContent: pageContent
                    }
                })
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    }).catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.post('/:investorId/settings', (req,res)=>{
    const notification = req.body
    const token = req.headers.token
    const investorId = req.params.investorId
    console.log(notification)
    models.investor
    .query((qb) => {
        qb
        .where({id: investorId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user=>{
        if(user){
            switch (notification.type){
                case `running`: {
                    user
                    .save({
                        project_running_notification: notification.value,
                    })
                    .then(()=>{
                        return res.json({success: true, data: {message: `Project running notification details updated`}})
                    })
                    break
                }

                case `subscribtion`: {
                    user
                    .save({
                        project_subscription_notification: notification.value,
                    })
                    .then(()=>{
                        return res.json({success: true, data: {message: 'Project subscription notification details updated'}})
                    })
                    break
                }

                case `purchase`: {
                    user
                    .save({
                        project_purchases_notification: notification.value,
                    })
                    .then(()=>{
                        return res.json({success: true, data: {message: 'Project purchases notification details updated'}})
                    })
                    break
                }

                case `deleted`: {
                    user
                    .save({
                        project_deleted_notification: notification.value,
                    })
                    .then(()=>{
                        return res.json({success: true, data: {message: 'Project deleted notification details updated'}})
                    })
                    break
                }

                case `edited`: {
                    user
                    .save({
                        project_edited_notification: notification.value,
                    })
                    .then(()=>{
                        return res.json({success: true, data: {message: 'Project edited notification details updated'}})
                    })
                    break
                }

                case `days_left`: {
                    user
                    .save({
                        project_days_left_notification: notification.value,
                    })
                    .then(()=>{
                        return res.json({success: true, data: {message: 'Project days left notification details updated'}})
                    })
                    break
                }

                default: {
                    return res.json({success: false, data: {message: 'Unknown notification type'}})
                    break
                }
            }
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricterd.`}})
        }
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}});
    })
})

router.get('/help', (req, res) => {
    //NO CONTENT YET
})


module.exports = router