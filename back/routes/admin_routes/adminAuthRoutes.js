const express = require('express')
const router = express.Router()
const keys = require('../../config/keys')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const constants = require('../../utils/constants')
const models = require('../../config/models')

//get LOG IN page
router.get('/login', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    models.contents
    .query((qb)=>{
        qb
        .where({page_name: 'header'}) //language content here
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'log_in'})
    })
    .fetch({ columns: [lang, `media`] })
    .then(pageContent=>{
        res.json({success: true,
            data: {
                pageContent: pageContent
            }
        })
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//LOGIN
router.post('/signin', (req,res)=> {
    const username = req.body.username
    const password = req.body.password

    console.log(username, password, `admin creds`)

    if (!username || !password) {
        res.json({success: false, message: 'Pls enter username and password to sign in'})
    } else {
        models.admin
        .where({username: username})
        .fetch()
        .then(admin => {
            if (admin) {
                bcrypt.compare(password, admin.attributes.password, (err, isMatch) => {
                    if (err) {
                        console.log(err)
                        return res.json({
                            success: false,
                            massage: `An error has been occured while comparing passwords ${err}`
                        })
                    }
                    if (isMatch) {
                        jwt.sign({email: admin.attributes.email}, keys.secret, {expiresIn: 10000},(err, token)=>{
                            models.admin
                            .forge({username: username})
                            .fetch({require: true})
                            .then(user=> {
                                user
                                .save({signin_token: `JWT ${token}`})
                                .then(collection=>{

                                    console.log(`Investors token saved in DB`)
                                    res.json({
                                        success: true,
                                        token: 'JWT ' + token,
                                    })
                                })
                            })
                        })
                    } else {
                        res.json({success: false, message: 'Authentication failed.'})
                    }
                })
            } else {
                res.status(404).json({success: false, message: 'User not found!'})
            }
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
    }
})


module.exports = router