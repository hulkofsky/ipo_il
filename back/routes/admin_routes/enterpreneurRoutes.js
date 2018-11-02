const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')
const Validation = require('../../utils/validation')
const validation = new Validation
const bcrypt = require('bcrypt')

//get all enterpreneurs
router.get('/enterpreneurs', (req,res)=>{
    const token = req.headers.token

    if(!token){
        res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            models.enterpreneur
            .forge()
            .orderBy('id')
            .fetchAll()
            .then(enterpreneur=>{
                res.status(200).json({success: true, data: enterpreneur})
            }).catch(err=>{
                res.status(500).json({success: false, data: {message: err.message}})
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
})

//get enterpreneur by id
router.get('/enterpreneurs/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.enterpreneur
                    .forge({id: req.params.id})
                    .fetch().
                then(enterpreneur=>{
                    res.json({success: true, data: enterpreneur})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//create enterpreneur
router.post('/enterpreneurs', (req,res)=>{
    const userData = req.body
    const token = req.headers.token

    if(!token){
        res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if (user) {
                let members = []

                if(userData.team_members){
                    members = JSON.parse(userData.team_members)
                }

                const validateEntSignup = validation.validateEntSignup(userData)

                if(validateEntSignup.success == false) {
                    console.log(validateEntSignup.message, 'false')
                    return res.status(500).json({success: false, data: {message: validateEntSignup.message}});
                }

                //bcrypting password
                bcrypt.genSalt(10, (err,salt)=>{
                    if (err){
                        console.log(err, 'while crypting password(gensalt)')
                    }
                    bcrypt.hash(userData.password, salt, (err, hash)=>{
                        if (err) {
                            console.log(err, 'while crypting password')
                        }else{
                            //checking email in investors and enterpreneurs tables
                            models.investor
                                .where({email: userData.company_email})
                                .fetch()
                                .then(investorResult=> {
                                    if (investorResult) {
                                        res.json({success: false, message: 'User with this email exists'})
                                    } else {
                                        models.enterpreneur
                                            .where({company_email: userData.company_email})
                                            .fetch()
                                            .then(investorResult=> {
                                                if (investorResult) {
                                                    res.json({success: false, message: 'User with this email exists'})
                                                } else {
                                                    //adding user to table ENTERPRENEURS
                                                    models.enterpreneur
                                                        .forge({
                                                            company_name: userData.company_name,
                                                            vat_number: userData.vat_number,
                                                            ceo_name: userData.ceo_name,
                                                            country_of_registration: userData.country_of_registration,
                                                            company_email: userData.company_email,
                                                            company_phone: userData.company_phone,
                                                            funding_sum: userData.funding_sum,
                                                            last_year_sales: userData.last_year_sales,
                                                            password: userData.password,
                                                            video_url: userData.video_url || '',
                                                            company_presentation: item.company_presentation,
                                                            financial_report: item.financial_report,
                                                            team_members: members,

                                                            email_conf: false,
                                                            phone_conf: false,
                                                            project_eval_notification: true,
                                                            project_running_notification: true,
                                                            project_subscription_notification: false,
                                                            project_purchases_notification: true,
                                                            project_deleted_notification: false,
                                                            project_edited_notification: false,
                                                            project_days_left_notification: false,
                                                        }).save().then(collection => {
                                                        res.json({success: true, data: {id: collection.get('id')}})
                                                    })

                                                }
                                            })
                                    }
                                })
                        }
                    })
                })
            } else {
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//update enterpreneur
router.put('/enterpreneurs/:id', (req,res)=>{
    const token = req.headers.token
    const userData = req.body

    if(!token){
        res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                let members = []

                if(userData.team_members){
                    members = JSON.parse(userData.team_members)
                }

                const validateEntSignup = validation.validateEntSignup(userData)

                if(validateEntSignup.success == false) {
                    console.log(validateEntSignup.message, 'false')
                    return res.status(500).json({success: false, data: {message: validateEntSignup.message}});
                }

                //bcrypting password
                bcrypt.genSalt(10, (err,salt)=> {
                    if (err) {
                        console.log(err, 'while crypting password(gensalt)')
                    }
                    bcrypt.hash(userData.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err, 'while crypting password')
                        } else {
                            models.enterpreneur
                                .forge({id: req.params.id})
                                .fetch({require: true})
                                .then(ent=>{

                                    ent
                                    .save({
                                        company_name: userData.company_name,
                                        vat_number: userData.vat_number,
                                        ceo_name: userData.ceo_name,
                                        country_of_registration: userData.country_of_registration,
                                        company_email: userData.company_email,
                                        company_phone: userData.company_phone,
                                        funding_sum: userData.funding_sum,
                                        last_year_sales: userData.last_year_sales,
                                        password: userData.password,
                                        video_url: userData.video_url || '',
                                        team_members: members,
                                    })
                                    .then(()=>{
                                        res.status(200).json({success: true, data: {message: `Company details updated`}});
                                    })

                                })

                        }
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

//delete enterpreneur
router.delete('/enterpreneurs/:id', (req,res)=>{ //USE CASCADE HERE
    const token = req.headers.token

    if(!token){
        res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(admin => {
        if(admin){
            models.enterpreneur
            .forge({id: req.params.id})
            .fetch()
            .then(user=>{
                if(user){
                    user
                    .destroy()
                    .then(()=>{
                        return res.status(200).json({success: true, data: {message: `Successfully deleted.`}})
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

//delete multiple enterpreneurs
router.delete('/enterpreneur', (req,res)=>{
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
                models.enterpreneur
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