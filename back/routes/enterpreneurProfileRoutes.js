const express = require('express')
const router = express.Router()
const constants = require('../utils/constants')
const bcrypt = require('bcrypt')
const Validation = require('../utils/validation')
const validation = new Validation
const models = require('../config/models')
const _ = require('lodash')
const fs = require('fs')
const multer  = require('multer')
const storage = require('../config/multerStorage')
const upload = multer({
    storage: storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
})

//ENTERPRENEUR PROJECT DELETE
router.delete('/:entId/projects/:projectId', (req,res)=>{
    const token = req.headers.token
    const entId = req.params.entId
    const projectId = req.params.projectId

    if(!entId || !token|| !projectId){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
        .query((qb) => {
            qb
            .where({id: entId})
            .andWhere({signin_token: token}) //token check here
        })
        .fetch()
        .then(user => {
            if (user) {
                models.project
                    .query((qb) => {
                        qb
                        .where({id: projectId})
                        .andWhere({enterpreneur_id: entId})
                    })
                    .fetch()
                    .then((project)=>{
                        if(project) {

                            //unlinking files
                            const tashkif_path = project.get('tashkif_file')
                            const project_files_path = project.get('project_files')

                            project
                            .destroy()
                            .then(result => {

                                console.log(tashkif_path, 'adminpanel tashkif delete path')
                                console.log(project_files_path, 'adminpanel tashkif delete path')

                                if(!_.isEmpty(tashkif_path)){
                                    fs.unlink(`${constants.LINK_FOR_STATIC_FILES}/${tashkif_path.split('/')[tashkif_path.split('/').length-1]}`, err=>{ //delete
                                        if (err) {
                                            console.log(err, 'error')
                                            return res.status(500).json({success: false, data: {message: `Tashkif file delete error.`}})
                                        }
                                        console.log(`tashkif deleted.`)
                                    })
                                }
                                if(!_.isEmpty(project_files_path)){
                                    for(i=0;i<project_files_path.length;i++){
                                        fs.unlink(`${constants.LINK_FOR_STATIC_FILES}/${project_files_path[i].split('/')[project_files_path[i].split('/').length-1]}`, err=>{ //delete
                                            if (err) {
                                                console.log(err, 'error')
                                                return res.status(500).json({success: false, data: {message: `Tashkif files ${i} delete error.`}})
                                            }
                                        })
                                        console.log(`project_files ${i} deleted.`)
                                    }
                                }

                                return res.status(200).json({
                                    success: false,
                                    data: {message: `Successfully deleted.`}
                                })

                            })
                        }else{
                            return res.status(404).json({success: false, data: {message: `404. Not found.`}})
                        }
                    })
            }else{
                res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            return res.status(500).json({success: false, data: {message: err.message}})
        })
})

router.post('/:entId/createproject', upload.fields([
    { name: 'enterpreneur_id', maxCount: 1 },
    { name: 'project_name', maxCount: 1 },
    { name: 'project_description', maxCount: 1 },
    { name: 'money_to_collect', maxCount: 1 },
    { name: 'video_url', maxCount: 1 },
    { name: 'project_finish_date', maxCount: 1 },
    { name: 'articles', maxCount: 1 },
    { name: 'project_team', maxCount: 1 },
    { name: 'tashkif_file', maxCount: 1 },
    { name: 'project_files', maxCount: 10 }
]), (req,res)=> {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.entId
    const projectData = req.body

    if(!entId || !token || !projectData){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    console.log(projectData, 'body')
    console.log(req.files, 'files')

    models.enterpreneur
        .query((qb) => {
            qb
            .where({id: entId})
            .andWhere({signin_token: token}) //token check here
        })
        .fetch()
        .then(user => {
            if (user) {

                const validateCreateProject = validation.validateCreateProject(projectData)

                if(validateCreateProject.success == false) {
                    console.log(validateCreateProject.message, 'false')
                    return res.status(500).json({success: false, data: {message: validateCreateProject.message}});
                }

                let projectTeam = null
                let articles = null

                if (!_.isEmpty(projectData.articles)) {
                    articles = JSON.parse(projectData.articles)
                }

                if (!_.isEmpty(projectData.project_team)) {
                    projectTeam = JSON.parse(projectData.project_team)
                }

                let tashkif_path = ''
                let project_files_path = []
                let tashkifFilename = ''

                if(req.files.tashkif_file) {
                    tashkifFilename = req.files.tashkif_file[0].filename
                    tashkif_path = constants.FILE_PATH + tashkifFilename
                    console.log(tashkif_path, 'tashkif path')
                }
                if(req.files.project_files) {
                    for(i=0;i<req.files.project_files.length;i++){
                        project_files_path[i] = constants.FILE_PATH + req.files.project_files[i].filename
                        console.log(project_files_path[i], 'project_files_path')
                    }
                }

                models.project
                    .forge({
                        enterpreneur_id: entId,
                        project_name: projectData.project_name,
                        project_field: projectData.project_field,
                        project_description: projectData.project_description,
                        status_id: 1, // project status - "NEW"
                        money_to_collect: projectData.money_to_collect,
                        money_collected: 0,
                        video_url: projectData.video_url,
                        project_finish_date: projectData.project_finish_date,
                        project_start_date: new Date(),
                        project_team: projectTeam,   // [{first_name: , last_name: , position: , photo: , fb_link: , linkedin_link: }]
                        articles: articles,   //{logo: , link: }
                        is_talking_about_us: true,
                        learn_more: true,
                        tashkif_file: tashkif_path,
                        project_files: project_files_path,
                        project_type: 'a'
                    })
                    .save()
                    .then(collection=>{
                        return res.status(200).json({success: true, data: {message: `Project succesfully created. Project id - ${collection.get('id')}`}})
                    })
            }else{
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            console.log(err, 'error')
            return res.status(500).json({success: false, data: {message: err.message}})
    })

})

router.get('/myprofile/:id', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.id

    if(!entId || !token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({ columns: [
            `id`,
            `company_name`,
            `vat_number`,
            `ceo_name`,
            `country_of_registration`,
            `company_email`,
            `company_phone`,
            `funding_sum`,
            `last_year_sales`,
            `password`,
            `video_url`,
            `team_members`,
        ],
    })
    .then(user=>{
        if(user) {
            models.content
            .query((qb)=>{
                qb
                    .where({page_name: 'dashboard'})
                    .orWhere({page_name: 'ent_my_profile'})
                    .orWhere({page_name: 'countries'})
                    .orWhere({page_name: 'header'})
            })
            .orderBy('-page_name')
            .fetchAll({ columns: [lang, `media`] })
            .then(pageContent=>{
                res.status(200).json({success: true,
                    data: {
                        pageContent: pageContent,
                        profile: user
                    }
                })
            })
        }else{
            res.status(403).json({success: false,data: {message: `403. Restricted`}})
        }

    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.put('/:entId/myprofile', upload.fields([
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
    ]),(req,res)=>{
    const userData = req.body
    const token = req.headers.token
    const entId = req.params.entId

    console.log(userData, 'userData')
    console.log(userData.confPass, 'body')
    // console.log(req.files, 'files')
    // console.log(req.file, 'file')

    const validateCompany = validation.validateCompany(userData)

    if(!entId || !token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    if(validateCompany.success == false) {
        console.log(validateCompany.message, 'false')
        return res.status(500).json({success: false, data: {message: validateCompany.message}});
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
                .query((qb) => {
                    qb
                        .where({id: entId})
                        .andWhere({signin_token: token}) //token check here
                })
                .fetch({require: true})
                .then(ent=>{
                    if(ent){
                        let presentation_path = ''
                        let financial_path = ''

                        if(req.files.company_presentation) {
                            presentation_path = constants.FILE_PATH + req.files.company_presentation[0].filename + req.files.company_presentation[0].originalname
                        }
                        if(req.files.financial_report) {
                            financial_path = constants.FILE_PATH + req.files.financial_report[0].filename + req.files.financial_report[0].originalname
                        }

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
                                company_presentation: presentation_path,
                                financial_report: financial_path
                            })
                            .then(()=>{
                                res.status(200).json({success: true, data: {message: `Company details updated`}});
                            })

                    }else{
                        res.status(403).json({success: false,data: {message: `403. Restricted`}})
                    }

                }).catch(err=>{
                    console.log(err, 'error')
                    res.status(500).json({success: false, data: {message: err.message}});
                })

            }
        })
    })
})



router.get('/:entId/myprojects', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.entId

    console.log(token, 'enterpreneurs myprojects token')

    if(!entId || !token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({withRelated: ['projects.statuses']})
    .then(user => {
        if(user) {

            models.content
            .query((qb) => {
                qb
                .where({page_name: 'dashboard'})
                .orWhere({page_name: 'ent_my_projects'})
                .orWhere({page_name: 'header'})
            })
            .orderBy('page_name')
            .fetchAll({columns: [lang, `media`]})
            .then(pageContent => {
                res.status(200).json({
                    success: true,
                    data: {
                        pageContent: pageContent,
                        company_projects: user
                    }
                })

            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }


    }).catch(err => {
        console.log(err, 'error')
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:entId/project/:projectId', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.entId
    const projectId = req.params.projectId

    if(!entId || !token || !projectId){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if(user){
            models.project
            .query((qb) => {
                qb
                .where({enterpreneur_id: entId})
                .andWhere({id: projectId})
            })
            .fetch({withRelated: 'project_statuses'})
            .then(project => {
                if(project){
                    models.content
                    .query((qb) => {
                        qb
                        .where({page_name: 'dashboard'})
                        .orWhere({page_name: 'ent_project_page'})
                        .orWhere({page_name: 'header'})
                    })
                    .orderBy('page_name')
                    .fetchAll({columns: [lang, `media`]})
                    .then(pageContent => {
                        res.status(200).json({
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

router.put('/:entId/project/:projectId', upload.fields([
    { name: 'enterpreneur_id', maxCount: 1 },
    { name: 'project_name', maxCount: 1 },
    { name: 'project_description', maxCount: 1 },
    { name: 'money_to_collect', maxCount: 1 },
    { name: 'video_url', maxCount: 1 },
    { name: 'project_finish_date', maxCount: 1 },
    { name: 'project_team', maxCount: 1 },
    { name: 'tashkif_file', maxCount: 1 },
    { name: 'project_files', maxCount: 1 }
]),(req,res)=>{
    const token = req.headers.token
    const entId = req.params.entId
    const projectId = req.params.projectId
    const projectData = req.body

    if(!entId || !token|| !projectId || !projectData){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    console.log(projectData, 'projectData')
    console.log(req.file, 'projectData file')
    console.log(req.files, 'projectData files')
    console.log(projectData.project_description.length, 'description length')
    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if (user) {

            const validateCreateProject = validation.validateCreateProject(projectData, true)

            if(validateCreateProject.success == false) {
                console.log(validateCreateProject.message, 'false')
                return res.status(500).json({success: false, data: {message: validateCreateProject.message}});
            }

            let projectTeam = null

            if (!_.isEmpty(projectData.project_team)) {
                projectTeam = JSON.parse(projectData.project_team)
            }

            let tashkif_path = ''
            let project_files_path = []

            if(req.files && req.files.tashkif_file) {
                tashkif_path = constants.FILE_PATH + req.files.tashkif_file[0].filename
            }

            if(req.files && req.files.project_files) {
                for(i=0;i<req.files.project_files.length;i++){
                    project_files_path[i] = constants.FILE_PATH + req.files.project_files[i].filename
                }
            }

            models.project
            .query((qb) => {
                qb
                .where({enterpreneur_id: entId})
                .andWhere({id: projectId})
            })
            .fetch({require: true})
            .then(project=>{
                if(project) {

                    const old_tashkif = project.get('tashkif_file')
                    console.log(old_tashkif, "old_tashkif")

                    if(old_tashkif){
                        fs.unlink(`${constants.LINK_FOR_STATIC_FILES}${old_tashkif.split('/')[old_tashkif.split('/').length-1]}`, function(err){
                            if(err) {
                                return console.log(err, 'error while unlinking file')
                            }
                            console.log('file deleted successfully')
                        })
                    }

                    project.save({
                        project_name: projectData.project_name,
                        project_field: projectData.project_field,
                        project_description: projectData.project_description,
                        money_to_collect: projectData.money_to_collect || project.get('money_to_collect'),
                        video_url: projectData.video_url,
                        project_finish_date: projectData.project_finish_date || project.get('project_finish_date'),
                        project_team: projectTeam,   // [{first_name: , last_name: , position: , photo: , fb_link: , linkedin_link: }]

                        tashkif_file: tashkif_path,
                        project_files: project_files_path,
                    })
                    .then(()=>{
                        return res.status(200).json({success: true, data: {message: `Project ${project.get('project_name')} succesfully updated.`}})
                    })
                }else{
                    return res.status(404).json({success: false, data: {message: `404. Not found.`}})
                }
            })
        }else{
           return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    }).catch(err=>{
        console.log(err, 'error')
        return res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:entId/projects/:projectId/statistics', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.entId
    const projectId = req.params.projectId

    if(!entId || !token|| !projectId){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .orWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user => {
        if (user) {
            models.content
            .query((qb) => {
                qb
                .where({page_name: 'dashboard'})
                .orWhere({page_name: 'ent_stats'})
                .orWhere({page_name: 'header'})
            })
            .orderBy('page_name')
            .fetchAll({columns: [lang, `media`]})
            .then(pageContent => {
                models.project
                .query((qb) => {
                    qb
                    .where({id: projectId})
                    .andWhere({enterpreneur_id: entId})
                })
                .fetch({withRelated: ['project_statuses', 'visits', 'purchases', 'subscribers' ]})
                .then(project => {
                    if (project) {
                       return res.status(200).json({
                            success: true,
                            data: {
                                pageContent: pageContent,
                                project: project
                            }
                        })
                    }else{
                       return res.status(404).json({success: false, data: {message: `404. Not found.`}})
                    }
                })
            })
        }else{
            return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    }).catch(err => {
       return res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:entId/createproject', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.entId

    if(!entId || !token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
        .query((qb) => {
            qb
            .where({id: entId})
            .andWhere({signin_token: token}) //token check here
        })
        .fetch()
        .then(user => {
            if (user) {
                models.content
                .query((qb)=>{
                    qb
                    .where({page_name: 'dashboard'})
                    .orWhere({page_name: 'create_project'})
                    .orWhere({page_name: 'header'})
                })
                .orderBy('page_name')
                .fetchAll({ columns: [lang, `media`] })
                .then(pageContent=>{
                    return res.status(200).json({success: true,
                        data: {
                            pageContent: pageContent
                        }
                    })
                })
            }else{
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        }).catch(err=>{
        return res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.put('/:entId/teammember/:memberId/', (req,res)=>{
    const entId = req.params.entId
    const memberId = req.params.memberId
    const memberInfo = req.body
    const token = req.headers.token

    if(!entId || !token || !memberId || !memberInfo){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    const validateTeam = validation.validateTeam(memberInfo)

    if(validateTeam.success == false) {
        console.log(validateTeam.message, 'false')
        return res.status(500).json({success: false, data: {message: validateTeam.message}});
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({require: true})
    .then(members=>{

        let newMembers
        if(members.attributes){
            newMembers = members.attributes.team_members
        }

        if (!newMembers[memberId]){
            return res.status(404).json({success: false, data: {message: `Not Found`}})
        }else{
            newMembers[memberId] = memberInfo
            console.log(members)
            members
            .save({
                team_members: newMembers
            })
            .then(result => {
                return res.status(200).json({success: true, message: `Team member ${memberId} successfully updated.`})
            })
        }
    }).catch(err=>{
        console.log(err, 'error')
        return res.status(500).json({success: false, data: {message: err.message}})
    })

})

router.get('/:entId/team', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.entId

    if(!entId || !token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({columns: 'team_members'})
    .then(members=>{
        models.content
        .query((qb)=>{
            qb
            .where({page_name: 'dashboard'})
            .orWhere({page_name: 'all_team_edit'})
            .orWhere({page_name: 'header'})
        })
        .orderBy('page_name')
        .fetchAll({ columns: [lang, `media`] })
        .then(pageContent=>{
            res.json({success: true,
                data: {
                    pageContent: pageContent,
                    team: members.team_members
                }
            })
        })
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })


})

router.put('/:entId/team', upload.fields([{ name: 'user_data', maxCount: 1 }]), (req,res)=>{
    const userData = req.body.user_data

    const token = req.headers.token
    const entId = req.params.entId

    if(!entId || !token || !userData){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    console.log(userData, 'user data')

    const validateTeam = validation.validateTeam(userData)

    if(validateTeam.success == false) {
        console.log(validateTeam.message, 'false')
        return res.status(500).json({success: false, data: {message: validateTeam.message}});
    }

    console.log(validateTeam.message, 'true')
    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({require: true})
    .then(user=>{
        if(user){
            user
            .save({
                team_members: JSON.parse(userData)
            })
            .then(()=>{
                return res.status(200).json({success: true, data: {message: `Team members updated`}});
            })
        }else{
            return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        console.log(err, 'error')
        return res.status(500).json({success: false, data: {message: err.message}});
    })
})

router.get('/:entId/settings', (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.entId

    if(!entId || !token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({ columns: [
            `project_eval_notification`,
            `project_running_notification`,
            `project_subscription_notification`,
            `project_purchases_notification`,
            `project_deleted_notification`,
            `project_edited_notification`,
            `project_days_left_notification`
        ]
    })
    .then(user=>{
        if(user){
            models.content
            .query((qb)=>{
                qb
                .where({page_name: 'dashboard'})
                .orWhere({page_name: 'ent_settings'})
                .orWhere({page_name: 'header'})
            })
            .orderBy('page_name')
            .fetchAll({ columns: [lang, `media`] })
            .then(pageContent=>{
                res.status(200).json({success: true,
                    data: {
                        usersettings: user,
                        pageContent: pageContent
                    }
                })
            })
        }else{
            return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:entId/terms', (req,res)=> {
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const entId = req.params.entId

    if(!entId || !token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch()
    .then(user=>{
        if(user){
            models.content
            .query((qb)=>{
                qb
                .where({page_name: 'dashboard'})
                .orWhere({page_name: 'ent_terms'})
                .orWhere({page_name: 'header'})
            })
            .orderBy('page_name')
            .fetchAll({ columns: [lang, `media`] })
            .then(pageContent=>{
                res.json({success: true,
                    data: {
                        pageContent: pageContent
                    }
                })
            })
        }else{
            return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.post('/:entId/settings', (req,res)=>{
    const notification = req.body
    const token = req.headers.token
    const entId = req.params.entId

    if(!entId || !token || !notification){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.enterpreneur
    .query((qb) => {
        qb
        .where({id: entId})
        .andWhere({signin_token: token}) //token check here
    })
    .fetch({require: true})
    .then(ent=>{
        if(ent){
            switch (notification.type){
                case `evaluation`: {
                    ent
                        .save({
                            project_eval_notification: notification.value,
                        })
                        .then(()=>{
                            return res.json({success: true, data: {message: `Project evaluation notification details updated`}})
                        })
                    break
                }

                case `running`: {
                    ent
                        .save({
                            project_running_notification: notification.value,
                        })
                        .then(()=>{
                            return res.json({success: true, data: {message: `Project running notification details updated`}})
                        })
                    break
                }

                case `subscribtion`: {
                    ent
                        .save({
                            project_subscription_notification: notification.value,
                        })
                        .then(()=>{
                            return res.json({success: true, data: {message: 'Project subscription notification details updated'}})
                        })
                    break
                }

                case `purchase`: {
                    ent
                        .save({
                            project_purchases_notification: notification.value,
                        })
                        .then(()=>{
                            return res.json({success: true, data: {message: 'Project purchases notification details updated'}})
                        })
                    break
                }

                case `deleted`: {
                    ent
                        .save({
                            project_deleted_notification: notification.value,
                        })
                        .then(()=>{
                            return res.json({success: true, data: {message: 'Project deleted notification details updated'}})
                        })
                    break
                }

                case `edited`: {
                    ent
                        .save({
                            project_edited_notification: notification.value,
                        })
                        .then(()=>{
                            return res.json({success: true, data: {message: 'Project edited notification details updated'}})
                        })
                    break
                }

                case `days_left`: {
                    ent
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
            return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }



    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}});
    })
})

router.get('/help', (req,res)=>{
    //NO CONTENT YET
})


module.exports = router