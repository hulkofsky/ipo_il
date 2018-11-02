const express = require('express')
const router = express.Router()
const keys = require('../config/keys')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validation = require('../utils/validation')
const transporter = require('../config/nodemailer')
const crypto = require('crypto')
const models = require('../config/models')
const validation = new Validation
const multer  = require('multer')
const storage = require('../config/multerStorage')
const upload = multer({
    storage: storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
})
const constants = require('../utils/constants')

//INVESTOR SIGNUP
router.post('/signupinvestor', (req,res)=>{
    const userData = req.body;

    console.log(userData, 'userdata investor signup')

    validation.validateInvSignup(userData, res)

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
                            models.enterpreneur
                            .where({company_email: userData.email})
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
                                            branch_code: userData.branch_code,
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
                                           return res.json({success: true, data: {id: collection.get('id')}})
                                        })
                                    } else {
                                        return res.json({success: false, message: 'Bank validation failed'})
                                    }
                                }
                            })
                        }
                    })
                }).catch(err => {
                    console.log(err, 'error')
                    return res.status(500).json({success: false, data: {message: err.message}})
                })
            }
        })
    })

})

//ENTERPRENEUR SIGNUP
router.post('/signupenterpreneur', upload.fields([
    { name: 'company_name', maxCount: 1 },
    { name: 'ceo_name', maxCount: 1 },
    { name: 'country_of_registration', maxCount: 1 },
    { name: 'company_email', maxCount: 1 },
    { name: 'company_phone', maxCount: 1 },
    { name: 'funding_sum', maxCount: 1 },
    { name: 'last_year_sales', maxCount: 1 },
    { name: 'password', maxCount: 1 },
    { name: 'confPass', maxCount: 1 },
    { name: 'video_url', maxCount: 1 },
    { name: 'company_presentation', maxCount: 1 },
    { name: 'financial_report', maxCount: 1 },
    { name: 'team_members', maxCount: 1 },

    ]), (req,res)=>{
    const userData = req.body;

    console.log(userData, `userdata`)
    console.log(userData.password, `password`)
    console.log(req.file, `file`)
    console.log(req.files, `files`)

    const validateEntData = validation.validateEntSignup(userData)

    if(validateEntData.success == false) {
        console.log(validateEntData.message, 'false')
        return res.status(500).json({success: false, data: {message: validateEntData.message}});
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
                        return res.status(500).json({success: false, message: 'User with this email exists'})
                    } else {
                        models.enterpreneur
                        .where({company_email: userData.company_email})
                        .fetch()
                        .then(investorResult=> {
                            if (investorResult) {
                               return res.status(500).json({success: false, message: 'User with this email exists'})
                            } else {
                                let presentation_path = ''
                                let financial_path = ''
                                let members = []
                                if (userData.team_members){
                                    members = JSON.parse(userData.team_members)
                                }


                                // console.log(req.files.company_presentation[0], 'company_presentation')
                                // console.log(req.files.financial_report[0], 'financial_report')

                                if(req.files.company_presentation) {
                                    presentation_path = constants.FILE_PATH + req.files.company_presentation[0].filename
                                }
                                if(req.files.financial_report) {
                                    financial_path = constants.FILE_PATH + req.files.financial_report[0].filename
                                }


                                console.log(presentation_path, 'presentation_path')
                                console.log(financial_path, 'financial_path')

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
                                    password: hash,
                                    video_url: userData.video_url || '',
                                    company_presentation: presentation_path,
                                    financial_report: financial_path,
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
                                   return res.json({success: true, data: {id: collection.get('id')}})
                                })
                            }
                        })
                    }
                })
                .catch(err => {
                    console.log(err, 'error')
                    return res.status(500).json({success: false, data: {message: err.message}})
                })
            }
        })
    })
})

//LOGIN
router.post('/signin', (req,res)=> {
    const email = req.body.userEmail
    const password = req.body.userPassword

    console.log(req.body, 'body')
    console.log(email, 'email')
    console.log(password, 'password')

    if (!email || !password) {
        res.json({success: false, message: 'Pls enter email and password to sign in'})
    } else {
        models.investor
        .where({email: email})
        .fetch()
        .then(investorUser => {
            if (investorUser) {

                bcrypt.compare(password, investorUser.attributes.password, (err, isMatch) => {
                    if (err) {
                        console.log(err)
                        return res.json({
                            success: false,
                            massage: `An error has been occured while comparing passwords ${err}`
                        })
                    }
                    if (isMatch) {
                        jwt.sign({email: investorUser.attributes.email}, keys.secret, {expiresIn: 10000},(err, token)=>{
                            models.investor
                            .forge({email: email})
                            .fetch({ withRelated: 'banks', require: true})
                            .then(user=> {
                                user
                                .save({signin_token: `JWT ${token}`})
                                .then(investor=>{
                                    models.branch
                                        .query((qb) => {
                                            qb
                                                .where({branch_code: investor.get('branch_code')})
                                                .andWhere({bank_code: investor.get('bank_id')})
                                        })
                                        .fetch()
                                        .then(branch=> {
                                            console.log(`Investors token saved in DB`)
                                            res.json({
                                                success: true,
                                                token: 'JWT ' + token,
                                                user: investor,
                                                branch: branch
                                            })
                                        })

                                }).catch(err=>{
                                    console.log(`Error while saving Investors token in DB - ${err}`)
                                })
                            })
                        })
                    } else {
                        res.json({success: false, message: 'Authentication failed. Passwords did not match'})
                    }
                })
            } else {
                models.enterpreneur
                .where({company_email: email})
                .fetch()
                .then(enterpreneurUser => {
                    if (enterpreneurUser) {
                        bcrypt.compare(password, enterpreneurUser.attributes.password, (err, isMatch) => {
                            if (err) {
                                console.log(err)
                                return res.json({
                                    success: false,
                                    massage: `An error has been occured while comparing passwords ${err}`
                                })
                            }
                            if (isMatch) {
                                jwt.sign({email: enterpreneurUser.attributes.company_email}, keys.secret, {expiresIn: 10000},(err, token)=>{
                                    models.enterpreneur
                                    .forge({company_email: email})
                                    .fetch({require: true})
                                    .then(user=> {
                                        user
                                        .save({signin_token: `JWT ${token}`})
                                        .then(collection=>{
                                            console.log(`Enterpreneurs token saved in DB`)
                                            res.json({
                                                success: true,
                                                token: 'JWT ' + token,
                                                user: collection
                                            })
                                        }).catch(err=>{
                                            console.log(`Error while saving Enterpreneurs token in DB - ${err}`)
                                        })
                                    })
                                })

                            } else {
                                res.json({
                                    success: false,
                                    message: 'Authentication failed. Passwords did not match'
                                })
                            }
                        })
                    } else {
                        res.json({success: false, message: 'User not found!'})
                    }
                })

            }

        })
    }
})

router.post('/logout/:id', (req,res)=>{
    const userId = req.params.id
    const token = req.headers.token

    if(!token) res.status(500).json({success: false, message: 'Invalid token'})

    models.investor
        .query((qb) => {
            qb
            .where({id: userId})
            .andWhere({signin_token: token})
        })
        .fetch()
        .then(investorUser => {
            if (investorUser) {
                investorUser
                    .save({signin_token: ``})
                    .then(collection => {
                        res.json({
                            success: true,
                            message: 'Logout successfully'

                        })
                    })
            }else{
                models.enterpreneur
                    .where({company_email: email})
                    .fetch()
                    .then(enterpreneurUser => {
                        if (enterpreneurUser) {
                            enterpreneurUser
                                .save({signin_token: ``})
                                .then(collection=>{
                                    res.json({
                                        success: true,
                                        message: 'Logout successfully'
                                    })
                                })
                        } else {
                            res.json({success: false, message: 'User not found!'})
                        }
                    })

            }

        })

})

//forgot password
router.post('/forgotpassword', (req,res)=>{
    const email = req.body.email

    if (!validation.validateEmail(email)) {
        res.json({success: false, message: 'Pls enter a valid email'})
    } else {
        models.investor
            .where({email: email})
            .fetch()
            .then(investorUser => {
                if (investorUser) {
                    //SEND EMAIL
                    crypto.randomBytes(20, (err, investorBuf)=>{
                        if(err){
                            return res.jsom({success: false, message: `Error while creating token - ${err}`})
                        }else{
                            const link = `<a>http://password-recovery/${investorBuf.toString('hex')}</a>`

                            transporter(res, email, `password_reset`, link)

                            models.investor
                            .forge({email: email})
                            .fetch({require: true})
                            .then(user=>{
                                user
                                .save({
                                    reset_pass_token: investorBuf.toString('hex'),
                                    reset_pass_expires: Date.now() + 3600000
                                })
                                .then(()=>{
                                    res.status(200).json({success: true, data: {token: investorBuf.toString('hex')}})
                                })
                            })

                        }
                    })
                } else {
                    models.enterpreneur
                    .where({company_email: email})
                    .fetch()
                    .then(enterpreneurUser => {
                        if (enterpreneurUser) {
                            //SEND EMAIL
                            crypto.randomBytes(20, (err, enterpreneurBuf)=>{
                                if(err){
                                    return res.jsom({success: false, message: `Error while creating token - ${err}`})
                                }else{
                                    const link = `<a>http://${req.headers.host}/reset/${enterpreneurBuf.toString('hex')}</a>`
                                    transporter(res, email, `password_reset`, link)

                                    models.enterpreneur
                                    .forge({company_email: email})
                                    .fetch({require: true})
                                    .then(user=>{
                                        user
                                        .save({
                                            reset_pass_token: enterpreneurBuf.toString('hex'),
                                            reset_pass_expires: Date.now() + 3600000
                                        })
                                        .then(()=>{
                                            res.status(200).json({success: true, data: {token: enterpreneurBuf.toString('hex')}})
                                        })

                                    })
                                }
                            })
                        } else {
                            res.status(404).json({success: false, message: '404. Not found!'})
                        }
                    })

                }

            }).catch(err=>{
            console.log(`Error while updating user ${err.message}`)
        })
    }
})

router.put('/reset/:token', (req,res)=>{
    const password = req.body.password
    const confirmPass = req.body.confPass
    const token = req.params.token

    console.log(password, "new password")
    console.log(confirmPass, "new conf password")
    console.log(token, "reset password token")

    if(!validation.validatePass(password)){
        return res.json({success: false, message: `Password validation failed.`})
    }

    if(password!=confirmPass){
        return res.json({success: false, message: `Passwords does not match.`})
    }

    models.enterpreneur
    .query((qb)=>{
        qb.where({reset_pass_token: token}).andWhere(`reset_pass_expires`, `>`,  Date.now())
    })
    .fetch()
    .then(enterpreneurUser => {
        if (!enterpreneurUser) {
            models.investor
            .query((qb)=>{
                qb.where({reset_pass_token: token}).andWhere(`reset_pass_expires`, `>`,  Date.now())
            })
            .fetch()
            .then(investorUser => {
                if (!investorUser) {
                    return res.json({success: false, message: `Password reset token is invalid or has expired.`})
                }else{
                    //bcrypting password
                    bcrypt.genSalt(10, (err,salt)=> {
                        if (err) {
                            console.log(err, 'while crypting password(gensalt)')
                        }
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                console.log(err, 'while crypting password')
                            } else {
                                models.investor
                                .forge({reset_pass_token: token})
                                .fetch({require: true})
                                .then(user=>{
                                    user
                                    .save({
                                        password: hash,
                                    })
                                    .then(()=>{
                                        res.status(200).json({success: true, message: 'Your password has been successfully updated'});
                                    })
                                })
                            }
                        })
                    })
                }
            }).catch(err=>{
                res.status(500).json({success: false, message: `Error while updating your password - ${err.message}`});
            })
        }else{
            //bcrypting password
            bcrypt.genSalt(10, (err,salt)=> {
                if (err) {
                    console.log(err, 'while crypting password(gensalt)')
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        console.log(err, 'while crypting password')
                    } else {
                        models.enterpreneur
                        .forge({reset_pass_token: token})
                        .fetch({require: true})
                        .then(user=>{
                            user
                            .save({
                                password: hash,
                            })
                            .then(()=>{
                                res.json({success: true, message: 'Your password has been successfully updated'});
                            })

                        })
                    }
                })
            })
        }

    }).catch(err=>{
        console.log(err, 'error')
        res.status(500).json({success: false, message: `Error while updating your password - ${err.message}`});
    })
})


module.exports = router