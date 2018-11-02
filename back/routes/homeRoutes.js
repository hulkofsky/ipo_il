const express = require('express')
const router = express.Router()
const constants = require('../utils/constants')
const models = require('../config/models')

//get HOMEPAGE
router.get('/', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token

    console.log(token, 'homepage / get route token')

    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'home'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
        models.project
        .forge()
        .fetchAll({columns: [
                `id`,
                `project_name`,
                `project_description`,
                `money_to_collect`,
                `money_collected`,
                `video_url`,
                `project_finish_date`,
                `status_id`
            ]
            , withRelated: ['project_statuses']
        })
        .then(projectsResult=>{
            models.trusted_by
                .forge()
                .fetchAll()
                .then(trusted_by=>{
                    if(token){
                        models.investor
                            .where({signin_token: token})
                            .fetch()
                            .then(investorResult=> {
                                if (investorResult) {
                                    res.status(200).json({success: true,
                                        data: {
                                            pageContent: pageContent,
                                            projects: projectsResult,
                                            trusted_by: trusted_by,
                                            investor: investorResult
                                        }
                                    })
                                } else {
                                    models.enterpreneur
                                        .where({signin_token: token})
                                        .fetch()
                                        .then(entResult=> {
                                            if (entResult) {
                                                res.status(200).json({success: true,
                                                    data: {
                                                        pageContent: pageContent,
                                                        projects: projectsResult,
                                                        trusted_by: trusted_by,
                                                        enterpreneur: entResult
                                                    }
                                                })
                                            }else{
                                                res.status(200).json({success: true,
                                                    data: {
                                                        pageContent: pageContent,
                                                        projects: projectsResult,
                                                        trusted_by: trusted_by
                                                    }
                                                })
                                            }
                                        })
                                }
                            })
                    }else{
                        res.status(200).json({success: true,
                            data: {
                                pageContent: pageContent,
                                projects: projectsResult,
                                trusted_by: trusted_by
                            }
                        })
                    }
                })

        })
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get HOW DOES IT WORK
router.get('/howdoesitwork', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token

    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'how_does_it_work'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
        if(token){
            models.investor
            .where({signin_token: token})
            .fetch()
            .then(investor=> {
                if (investor) {
                    res.status(200).json({success: true,
                        data: {
                            pageContent: pageContent,
                            investor: investor
                        }
                    })
                } else {
                    models.enterpreneur
                    .where({signin_token: token})
                    .fetch()
                    .then(ent=> {
                        if (ent) {
                            res.status(200).json({success: true,
                                data: {
                                    pageContent: pageContent,
                                    enterpreneur: ent
                                }
                            })
                        }else{
                            res.status(200).json({success: true,
                                data: {
                                    pageContent: pageContent,
                                }
                            })
                        }
                    })
                }
            })
        }else{
            res.status(200).json({success: true,
                data: {
                    pageContent: pageContent,
                }
            })
        }
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get ABOUT US
router.get('/aboutus', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token

    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'about_us'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
        models.our_team
        .forge()
        .fetchAll()
        .then(members=>{
            if(token){
                models.investor
                .where({signin_token: token})
                .fetch()
                .then(investor=> {
                    if (investor) {
                        res.status(200).json({success: true,
                            data: {
                                pageContent: pageContent,
                                team_members: members,
                                investor: investor
                            }
                        })
                    } else {
                        models.enterpreneur
                        .where({signin_token: token})
                        .fetch()
                        .then(ent=> {
                            if (ent) {
                                res.status(200).json({success: true,
                                    data: {
                                        pageContent: pageContent,
                                        team_members: members,
                                        enterpreneur: ent
                                    }
                                })
                            }else{
                                res.status(200).json({success: true,
                                    data: {
                                        pageContent: pageContent,
                                        team_members: members
                                    }
                                })
                            }
                        })
                    }
                })
            }else{
                res.status(200).json({success: true,
                    data: {
                        pageContent: pageContent,
                        team_members: members
                    }
                })
            }
        })
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get HOW WE R WORKING(ENTERPRENEUR SEEKING FUNDING)
router.get('/howweareworking', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token

    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'ent_seeking'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
        models.company_contact
            .forge()
            .fetchAll()
            .then(contacts=>{
                if(token){
                    models.investor
                        .where({signin_token: token})
                        .fetch()
                        .then(investor=> {
                            if (investor) {
                                res.status(200).json({success: true,
                                    data: {
                                        pageContent: pageContent,
                                        investor: investor,
                                        contacts: contacts
                                    }
                                })
                            } else {
                                models.enterpreneur
                                    .where({signin_token: token})
                                    .fetch()
                                    .then(ent=> {
                                        if (ent) {
                                            res.status(200).json({success: true,
                                                data: {
                                                    pageContent: pageContent,
                                                    enterpreneur: ent,
                                                    contacts: contacts
                                                }
                                            })
                                        }else{
                                            res.status(200).json({success: true,
                                                data: {
                                                    pageContent: pageContent,
                                                    contacts: contacts
                                                }
                                            })
                                        }
                                    })
                            }
                        })
                }else{
                    res.status(200).json({success: true,
                        data: {
                            pageContent: pageContent,
                            contacts: contacts
                        }
                    })
                }
            })
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get CONTACT US
router.get('/contactus', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token

    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'contact_us'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
        models.company_contact
        .forge()
        .fetchAll()
        .then(contacts=> {
            if (token) {
                models.investor
                    .where({signin_token: token})
                    .fetch()
                    .then(investor => {
                        if (investor) {
                            res.status(200).json({
                                success: true,
                                data: {
                                    pageContent: pageContent,
                                    contacts: contacts,
                                    investor: investor
                                }
                            })
                        } else {
                            models.enterpreneur
                                .where({signin_token: token})
                                .fetch()
                                .then(ent => {
                                    if (ent) {
                                        res.status(200).json({
                                            success: true,
                                            data: {
                                                pageContent: pageContent,
                                                contacts: contacts,
                                                enterpreneur: ent
                                            }
                                        })
                                    } else {
                                        res.status(200).json({
                                            success: true,
                                            data: {
                                                pageContent: pageContent,
                                                contacts: contacts
                                            }
                                        })
                                    }
                                })
                        }
                    })
            } else {
                res.status(200).json({
                    success: true,
                    data: {
                        pageContent: pageContent,
                        contacts: contacts
                    }
                })
            }
        })
    }).catch(err=>{
        console.log(err.message, 'error contact us')
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get LOG IN page
router.get('/login', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'log_in'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
        res.json({success: true,
            data: {
                pageContent: pageContent
            }
        })
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get SIGN UP page
router.get('/signup', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE

    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'sign_up'})
        .orWhere({page_name: 'countries'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
       models.bank
           .forge()
           .fetchAll({withRelated: `branches`})
           .then(banks=>{
               res.json({success: true,
                   data: {
                       pageContent: pageContent,
                       banks: banks
                   }
               })
           })

    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get project page by id
router.get('/projects/:id', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token

    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'project_page'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
        models.project
        .forge({id: req.params.id})
        .fetch({
            withRelated: ['enterpreneur','project_statuses']
        })
        .then(project=>{
            if(project) {
                console.log(project.enterpreneur.video_url)
                models.visit
                .forge({
                    project_id: req.params.id,
                    visit_date: new Date()
                })
                .save()
                .then(()=>{
                    if(token){
                        models.investor
                        .where({signin_token: token})
                        .fetch()
                        .then(investor=> {
                            if (investor) {
                                res.status(200).json({success: true,
                                    data: {
                                        pageContent: pageContent,
                                        investor: investor,
                                        project: project
                                    }
                                })
                            } else {
                                models.enterpreneur
                                .where({signin_token: token})
                                .fetch()
                                .then(ent=> {
                                    if (ent) {
                                        res.status(200).json({success: true,
                                            data: {
                                                pageContent: pageContent,
                                                enterpreneur: ent,
                                                project: project
                                            }
                                        })
                                    }else{
                                        res.status(200).json({success: true,
                                            data: {
                                                pageContent: pageContent,
                                                project: project
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }else{
                        res.status(200).json({success: true,
                            data: {
                                pageContent: pageContent,
                                project: project
                            }
                        })
                    }
                })
            }else{
                res.status(404).json({success: false, data: {message: `404. Not found.`}})
            }
        })

    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

module.exports = router