const express = require('express')
const router = express.Router()
const Bookshelf = require('../config/database')
const Validation = require('../utils/validation')
const constants = require('../utils/constants')
const knex = require('knex')
const validation = new Validation
const models = require('../config/models')
const fs = require('fs')
const pdf = require('html-pdf')
const options = { format: 'Letter' }
const multer = require('multer')
const createTemplate = require('../utils/template')
const nodemailer = require('../config/nodemailer')

router.post('/firstcheck', (req,res)=>{
    const userData = req.body

    if(!validation.validateText(userData.first_name)){
        return res.json({success: false, message: 'First name validation failed'})
    }

    if(!validation.validateText(userData.last_name)){
        return res.json({success: false, message: 'Last name validation failed'})
    }

    if(!validation.validateEmail(userData.email)){
        return res.json({success: false, message: 'Email validation failed'})
    }

    if(!validation.validatePhone(userData.phone)){
        return res.json({success: false, message: 'Phone validation failed'})
    }

    models.investor
    .where({email: userData.email})
    .fetch()
    .then(investor=> {
        if (investor) {
            res.json({success: false, message: 'User with this email exists'})
        } else {
            models.enterpreneur
            .where({company_email: userData.email})
            .fetch()
            .then(ent=> {
                if (ent) {
                    res.json({success: false, message: 'User with this email exists'})
                } else {
                    res.status(200).json({success: true, message: 'Email is ok!'})
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({success: false, data: {message: err.message}})
    })

})

router.post('/secondcheck', (req,res)=>{
    const userData = req.body

    if(!validation.validateAccountNum(userData.account_number)){
        return res.json({success: false, message: 'Account number validation failed'})
    }

    if(!validation.validatePass(userData.password)){
        return res.json({success: false, message: 'Password validation failed'})
    }

    if(userData.password!=userData.confPass){
        return res.json({success: false, message: 'Passwords does not match'})
    }

    if(!userData.agree){
        return res.json({success: false, message: 'Pls accept terms of service'})
    }
    return res.json({success: true, message: 'Successfully validated'})
})

router.post('/:investorId/purchase/:projectId', (req,res)=>{
    const token = req.headers.token
    const investorId = req.params.investorId
    const projectId = req.params.projectId
    const purchaseInfo = req.body
    const mm = new Date().getMonth()+1
    const dd = new Date().getDate()

    console.log(purchaseInfo, 'purchaseInfo')

    const templateParams = {
        current_date: `${(dd>9 ? '' : '0')}${dd}-${(mm>9 ? '' : '0')}${mm}-${new Date().getFullYear()}`,//.split("").reverse().join(""),
        bank_name: purchaseInfo.bank_name,
        branch_name: purchaseInfo.branch_name,
        fax: constants.COMPANY_FAX,
        project_name: purchaseInfo.project_name,
        total_price1: purchaseInfo.total_price1,
        total_price2: purchaseInfo.total_price2,
        total_price3: purchaseInfo.total_price3,
        unit_price1: purchaseInfo.unit_price1,
        unit_price2: purchaseInfo.unit_price2,
        unit_price3: purchaseInfo.unit_price3,
        unit_count1: purchaseInfo.unit_count1,
        unit_count2: purchaseInfo.unit_count2,
        unit_count3: purchaseInfo.unit_count3,
        unit_name1: purchaseInfo.unit_name1,
        unit_name2: purchaseInfo.unit_name2,
        unit_name3: purchaseInfo.unit_name3,
        investor_name: `${purchaseInfo.first_name}_${purchaseInfo.last_name}`,
        bank_account_number: purchaseInfo.account_number,
        investor_phone_number: purchaseInfo.investor_phone_number,
        signature: purchaseInfo.signature
    }

    console.log(templateParams.investor_name, 'template Params')

    const filetemplate = createTemplate(templateParams)


    fs.writeFile('./uploads/index.html', filetemplate, err=>{
        if (err) {
            console.log(err, 'while writing html template')
            res.status(500).json({
                success: false,
                message: `error while editing html template`
            })
        }

        const pdfFilename = `${templateParams.investor_name}${Date.now()}.pdf`

        fs.readFile('./uploads/index.html', 'utf8', (err, data)=>{
            if (err) {
                console.log(err, 'while reading html template')
                res.status(500).json({
                    success: false,
                    message: `error while reading html template`
                })
            }

            pdf.create(data, options).toFile(`./uploads/${pdfFilename}`, function(err, filepath) {
                if (err) return console.log(err, 'error while creating pdf')

                models.project
                    .forge({id: projectId})
                    .fetch()
                    .then(project=>{
                        if(project){
                            models.investor
                                .query((qb) => {
                                    qb
                                        .where({id: investorId})
                                        .andWhere({signin_token: token}) //token check here
                                })
                                .fetch()
                                .then(investor => {
                                    if (investor) {
                                        console.log(constants.FILE_PATH + pdfFilename, 'FILE LINK PATH')
                                        models.purchase
                                            .forge()
                                            .save({
                                                investor_id: investorId,
                                                project_id: projectId,
                                                purchase_date: new Date(),
                                                // unit_count: purchaseInfo.unit_count1,
                                                // unit_price: project.get(`min_total_price1`),

                                                status_id: 1,
                                                po_doc: constants.FILE_PATH + pdfFilename, //PURCHASE PDF FILE LINK
                                            })
                                            .then((purchase)=>{
                                                models.purchases_projects
                                                    .query((qb) => {
                                                        qb
                                                            .where({investor_id: investorId})
                                                            .andWhere({project_id: projectId})
                                                    })
                                                    .fetch()
                                                    .then((purchase)=>{
                                                        if(purchase){
                                                            res.json({success: true, data: {message: `Already purchased.`, link: constants.FILE_PATH + pdfFilename}})
                                                        }else{
                                                            models.purchases_projects
                                                                .forge({
                                                                    investor_id: investorId,
                                                                    project_id: projectId
                                                                })
                                                                .save()
                                                                .then(()=>{
                                                                    return res.json({success: true, data: {message: 'Successfully purchased', link: constants.FILE_PATH + pdfFilename}})
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
                    .catch(err => {
                        console.log(err, 'error')
                        res.status(500).json({success: false, data: {message: err.message}})
                    })
            })
        })


    })
})

router.post('/:investorId/done/:projectId', (req,res)=>{
    const mailData = req.body
    const token = req.headers.token
    const investorId = req.params.investorId
    console.log(mailData, 'maildata')


    if(!investorId || !token || !mailData){
        console.log('investorId or token or mailData not found')
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.investor
        .query((qb) => {
            qb
            .where({id: investorId})
            .andWhere({signin_token: token}) //token check here
        })
        .fetch()
        .then(user => {
            if (user) {

                //const message = `U have purchased ${mailData.project_name}. Here is a link to your purchase document: ${mailData.link}`

                if(mailData.is_email){
                    nodemailer(res, mailData.email, `mail_purchase`, mailData)
                    return res.status(200).json({success: true, data: {message: `Email successfully sent.`}})
                }else{
                    //push notification here
                    return res.status(200).json({success: true, data: {message: `Push notification successfully sent.`}})
                }
            }else{
                console.log('user not found')
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
    }).catch(err=>{
        console.log(err, 'error')
        return res.status(500).json({success: false, data: {message: err.message}})
    })
})

module.exports = router
