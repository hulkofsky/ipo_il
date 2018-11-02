const express = require('express')
const router = express.Router()
const Bookshelf = require('../../config/database')
const models = require('../../config/models')
const Validation = require('../../utils/validation')
const validation = new Validation
const bcrypt = require('bcrypt')

//get all investors
router.get('/investors', (req,res)=>{
    const token = req.headers.token

    if(!token){
        res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.investor
                    .forge()
                    .orderBy('id')
                    .fetchAll()
                    .then(investor=>{
                        res.status(200).json({success: true, data: investor})
                    }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//get investors by id
router.get('/investors/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.investor
                    .forge({id: req.params.id})
                    .fetch().
                then(investor=>{
                    res.json({success: true, data: investor})
                }).catch(err=>{
                    res.status(500).json({success: false, data: {message: err.message}})
                })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
})

//create investors
router.post('/investors', (req,res)=>{
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

                const validateInvestorData = validation.validateInvSignup(userData)

                if(validateInvestorData.success == false) {
                    console.log(validateInvestorData.message, 'false')
                    return res.status(500).json({success: false, data: {message: validateInvestorData.message}});
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
                            //serching bank id in table BANKS
                            models.bank
                                .where({name: userData.bank_name})
                                .fetch({ columns: ['id'] })
                                .then(bank_id=>{
                                    //checking email in investors and enterpreneurs tables
                                    models.investor
                                        .where({email: userData.email})
                                        .fetch()
                                        .then(investorResult=> {
                                            if (investorResult) {
                                                res.json({success: false, message: 'User with this email exists'})
                                            } else {
                                                models.investor
                                                    .where({email: userData.email})
                                                    .fetch()
                                                    .then(investorResult=> {
                                                        if (investorResult) {
                                                            res.json({success: false, message: 'User with this email exists'})
                                                        } else {
                                                            if (bank_id) {
                                                                //adding user to table INVESTORS
                                                                models.investor
                                                                    .forge({
                                                                        first_name: userData.first_name,
                                                                        last_name: userData.last_name,
                                                                        email: userData.email,
                                                                        phone: userData.phone,
                                                                        bank_id: bank_id.get('id'),
                                                                        password: hash,
                                                                        account_number: userData.account_number,
                                                                        email_conf: false,
                                                                        phone_conf: false,
                                                                        project_running_notification: true,
                                                                        project_subscription_notification: false,
                                                                        project_purchases_notification: true,
                                                                        project_deleted_notification: false,
                                                                        project_edited_notification: false,
                                                                        project_days_left_notification: false,
                                                                    }).save().then(collection => {
                                                                    res.json({success: true, data: {id: collection.get('id')}})
                                                                })
                                                            } else {
                                                                return res.json({success: false, message: 'Bank validation failed'})
                                                            }
                                                        }
                                                    })
                                            }
                                        })
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

//update investors
router.put('/investors/:id', (req,res)=>{
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

                const validateInvestorData = validation.validateInvSignup(userData)

                if(validateInvestorData.success == false) {
                    console.log(validateInvestorData.message, 'false')
                    return res.status(500).json({success: false, data: {message: validateInvestorData.message}});
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
                            //serching bank id in table BANKS
                            models.bank
                                .where({name: userData.bank_name})
                                .fetch({ columns: ['id'] })
                                .then(bank_id=>{
                                    //checking email in investors and enterpreneurs tables
                                    models.enterpreneur
                                        .where({company_email: req.params.id})
                                        .fetch()
                                        .then(ent=> {
                                            if (ent) {
                                                res.json({success: false, message: 'User with this email exists'})
                                            } else {
                                                models.investor
                                                    .query((qb)=>{
                                                        qb
                                                        .where('id', '<>', req.params.id)
                                                        .andWhere({email: userData.email})
                                                    })
                                                    .fetch()
                                                    .then(investor=> {
                                                        if (investor) {
                                                            res.json({success: false, message: 'User with this email exists'})
                                                        } else {
                                                            if (bank_id) {
                                                                //adding user to table INVESTORS
                                                                models.investor
                                                                    .forge({id: req.params.id})
                                                                    .fetch({require: true})
                                                                    .then(investor=>{
                                                                        investor
                                                                        .save({
                                                                            first_name: userData.first_name,
                                                                            last_name: userData.last_name,
                                                                            email: userData.email,
                                                                            phone: userData.phone,
                                                                            bank_id: bank_id.get('id'),
                                                                            password: hash,
                                                                            account_number: userData.account_number,
                                                                            email_conf: false,
                                                                            phone_conf: false,
                                                                            project_running_notification: true,
                                                                            project_subscription_notification: false,
                                                                            project_purchases_notification: true,
                                                                            project_deleted_notification: false,
                                                                            project_edited_notification: false,
                                                                            project_days_left_notification: false,
                                                                        })

                                                                    })
                                                                    .then(collection => {
                                                                        res.json({success: true, data: {message: `Company details updated`}})
                                                                })
                                                            } else {
                                                                return res.json({success: false, message: 'Bank validation failed'})
                                                            }
                                                        }
                                                    })
                                            }
                                        })
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

//delete investors
router.delete('/investors/:id', (req,res)=>{ //USE CASCADE HERE
    const token = req.headers.token

    if(!token){
        res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(admin => {
            if(admin){
                models.investor
                    .forge({id: req.params.id})
                    .fetch()
                    .then(user=>{
                        if(user){
                            console.log(user, 'eshelme')
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

//delete multiple investors
router.delete('/investors', (req,res)=> {
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
                models.investor
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