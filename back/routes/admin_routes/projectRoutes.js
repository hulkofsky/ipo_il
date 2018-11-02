const express = require('express')
const router = express.Router()
const models = require('../../config/models')
const Validation = require('../../utils/validation')
const validation = new Validation
const _ = require('lodash')//get all projects
const fs = require('fs')
const multer  = require('multer')
const storage = require('../../config/multerStorage')
const upload = multer({
    storage: storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
})
const constants = require('../../utils/constants')

router.get('/projects', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(admin => {
        if(admin){
            models.project
            .forge()
            .orderBy('id')
            .fetchAll()
            .then(projects=>{
                res.status(200).json({success: true, data: projects})
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }

    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get projects by id
router.get('/projects/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }
    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            models.project
            .forge({id: req.params.id})
            .fetch()
            .then(project=>{
                res.json({success: true, data: project})
            }).catch(err=>{
                res.status(500).json({success: false, data: {message: err.message}})
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
})

router.post('/projects', upload.fields([
    //admin and enterpreneur
    { name: 'enterpreneur_id', maxCount: 1 },
    { name: 'project_name', maxCount: 1 },
    { name: 'project_description', maxCount: 1 },
    { name: 'money_to_collect', maxCount: 1 },
    { name: 'video_url', maxCount: 1 },
    { name: 'project_finish_date', maxCount: 1 },
    { name: 'articles', maxCount: 1 },
    { name: 'project_team', maxCount: 1 },
    { name: 'tashkif_file', maxCount: 1 },
    { name: 'project_files', maxCount: 1 },
    //admin only
    { name: 'unit_name1', maxCount: 1 },
    { name: 'unit_name2', maxCount: 1 },
    { name: 'unit_name3', maxCount: 1 },
    { name: 'min_total_price1', maxCount: 1 },
    { name: 'max_total_price1', maxCount: 1 },
    { name: 'min_units1', maxCount: 1 },
    { name: 'min_total_price2', maxCount: 1 },
    { name: 'max_total_price2', maxCount: 1 },
    { name: 'min_units2', maxCount: 1 },
    { name: 'min_total_price3', maxCount: 1 },
    { name: 'max_total_price3', maxCount: 1 },
    { name: 'min_units3', maxCount: 1 },
    { name: 'is_talking_about_us', maxCount: 1 },
    { name: 'learn_more', maxCount: 1 },
    { name: 'max_total_price3', maxCount: 1 },
    { name: 'tashkif_file_link', maxCount: 1 }
]), (req,res)=> {
    const token = req.headers.token
    const projectData = req.body

    if(!token || !projectData){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    console.log(token, "create project adminpanel token")
    console.log(projectData, 'body')
    console.log(req.files, 'files')

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if (user) {
                console.log('user exists')
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

                if(req.files && req.files.tashkif_file) {
                    tashkifFilename = req.files.tashkif_file[0].filename
                    console.log(tashkifFilename, 'tashkifFilename')
                    tashkif_path = constants.FILE_PATH + tashkifFilename
                    console.log(tashkif_path, 'tashkif path')
                }else if(projectData.tashkif_file_link && projectData.tashkif_file_link != 'null' && typeof projectData.tashkif_file_link != 'object'){
                    console.log(projectData.tashkif_file_link, `tashkif link exists`)
                }else{
                    return res.status(500).json({success: false, data: {message: `Pls add a tashkif file`}})
                }

                if(req.files && req.files.project_files) {
                    for(i=0;i<req.files.project_files.length;i++){
                        project_files_path[i] = constants.FILE_PATH + req.files.project_files[i].filename
                        console.log(project_files_path[i], 'project_files_path')
                    }
                }

                console.log(tashkif_path, 'path going into DB')

                models.project
                    .forge({
                        enterpreneur_id: projectData.enterpreneur_id,
                        project_name: projectData.project_name,
                        project_field: projectData.project_field,
                        project_description: projectData.project_description,
                        status_id: projectData.status_id,
                        money_to_collect: projectData.money_to_collect,
                        money_collected: projectData.money_collected,
                        video_url: projectData.video_url,
                        project_finish_date: projectData.project_finish_date || new Date(),
                        project_start_date: new Date(),
                        project_team: projectTeam,   // [{first_name: , last_name: , position: , photo: , fb_link: , linkedin_link: }]
                        articles: articles,   //{logo: , link: }
                        tashkif_file: tashkif_path,
                        project_files: project_files_path,

                        //admin only
                        project_type: projectData.project_type || 'a',
                        unit_name1: projectData.unit_name1 || 'default_unit_name',
                        unit_name2: projectData.unit_name2 || 'default_unit_name',
                        unit_name3: projectData.unit_name3 || 'default_unit_name',
                        min_total_price1: projectData.min_total_price1 || 0,
                        max_total_price1: projectData.max_total_price1 || 0,
                        min_units1: projectData.min_units1 || 0,
                        min_total_price2: projectData.min_total_price2 || 0,
                        max_total_price2: projectData.max_total_price2 || 0,
                        min_units2: projectData.min_units2 || 0,
                        min_total_price3: projectData.min_total_price3 || 0,
                        max_total_price3: projectData.max_total_price3 || 0,
                        min_units3: projectData.min_units3 || 0,
                        is_talking_about_us: projectData.is_talking_about_us || false,
                        learn_more: projectData.learn_more || false
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

//update project
router.put('/projects/:projectId', upload.fields([
    //admin and enterpreneur
    { name: 'enterpreneur_id', maxCount: 1 },
    { name: 'project_name', maxCount: 1 },
    { name: 'project_description', maxCount: 1 },
    { name: 'money_to_collect', maxCount: 1 },
    { name: 'video_url', maxCount: 1 },
    { name: 'project_finish_date', maxCount: 1 },
    { name: 'articles', maxCount: 1 },
    { name: 'project_team', maxCount: 1 },
    { name: 'tashkif_file', maxCount: 1 },
    { name: 'project_files', maxCount: 1 },
    //admin only
    { name: 'unit_name1', maxCount: 1 },
    { name: 'unit_name2', maxCount: 1 },
    { name: 'unit_name3', maxCount: 1 },
    { name: 'min_total_price1', maxCount: 1 },
    { name: 'max_total_price1', maxCount: 1 },
    { name: 'min_units1', maxCount: 1 },
    { name: 'min_total_price2', maxCount: 1 },
    { name: 'max_total_price2', maxCount: 1 },
    { name: 'min_units2', maxCount: 1 },
    { name: 'min_total_price3', maxCount: 1 },
    { name: 'max_total_price3', maxCount: 1 },
    { name: 'min_units3', maxCount: 1 },
    { name: 'is_talking_about_us', maxCount: 1 },
    { name: 'learn_more', maxCount: 1 },
    { name: 'max_total_price3', maxCount: 1 },
    { name: 'tashkif_file_link', maxCount: 1 }
]), (req,res)=> {
    const token = req.headers.token
    const projectData = req.body
    const projectId = req.params.projectId

    if(!token || !projectData){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    console.log(token, "create project adminpanel token")
    console.log(projectData, 'body')
    console.log(req.files, 'files')
    console.log(typeof Number(projectData.min_total_price2), 'type of min_total_price2')

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if (user) {
                console.log('user exists')
                const validateCreateProject = validation.validateCreateProject(projectData)

                if(validateCreateProject.success == false) {
                    console.log(validateCreateProject.message, 'false')
                    return res.status(500).json({success: false, data: {message: validateCreateProject.message}});
                }

                let projectTeam = null
                let articles = null

                // if (!_.isEmpty(projectData.articles)) {
                //     articles = JSON.parse(projectData.articles)
                // }

                // if (!_.isEmpty(projectData.project_team)) {
                //     projectTeam = JSON.parse(projectData.project_team)
                // }

                models.project
                .forge({id: projectId})
                .fetch({require: true})
                .then(project=> {
                    let tashkif_path = ''
                    let project_files_path = []
                    let tashkifFilename = undefined

                    if(req.files && req.files.tashkif_file) {
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
                        tashkifFilename = req.files.tashkif_file[0].filename
                        console.log(tashkifFilename, 'tashkifFilename')
                        tashkif_path = constants.FILE_PATH + tashkifFilename
                        console.log(tashkif_path, 'tashkif path')
                    }else if(projectData.tashkif_file_link && projectData.tashkif_file_link != 'null' && typeof projectData.tashkif_file_link != 'object'){
                        console.log(projectData.tashkif_file_link, `tashkif link exists`)
                    }else{
                        return res.status(500).json({success: false, data: {message: `Pls add a tashkif file`}})
                    }

                    if(req.files && req.files.project_files) {
                        for(i=0;i<req.files.project_files.length;i++){
                            project_files_path[i] = constants.FILE_PATH + req.files.project_files[i].filename
                            console.log(project_files_path[i], 'project_files_path')
                        }
                    }

                    console.log(tashkif_path, 'path going into DB')

                    project
                        .save({
                            enterpreneur_id: projectData.enterpreneur_id,
                            project_name: projectData.project_name,
                            project_field: projectData.project_field,
                            project_description: projectData.project_description,
                            status_id: projectData.status_id,
                            money_to_collect: projectData.money_to_collect,
                            money_collected: projectData.money_collected,
                            video_url: projectData.video_url,
                            project_finish_date: projectData.project_finish_date || new Date(),
                            project_start_date: new Date(),
                            project_team: projectTeam,   // [{first_name: , last_name: , position: , photo: , fb_link: , linkedin_link: }]
                            articles: articles,   //{logo: , link: }
                            tashkif_file: tashkif_path || project.get('tashkif_file'),
                            project_files: project_files_path,

                            //admin only
                            project_type: projectData.project_type || 'a',
                            unit_name1: projectData.unit_name1 || 'default_unit_name',
                            unit_name2: projectData.unit_name2 || 'default_unit_name',
                            unit_name3: projectData.unit_name3 || 'default_unit_name',
                            min_total_price1: Number(projectData.min_total_price1) || 0,
                            max_total_price1: Number(projectData.max_total_price1) || 0,
                            min_units1: Number(projectData.min_units1) || 0,
                            min_total_price2: Number(projectData.min_total_price2) || 0,
                            max_total_price2: Number(projectData.max_total_price2) || 0,
                            min_units2: Number(projectData.min_units2) || 0,
                            min_total_price3: Number(projectData.min_total_price3) || 0,
                            max_total_price3: Number(projectData.max_total_price3) || 0,
                            min_units3: Number(projectData.min_units3) || 0,
                            is_talking_about_us: projectData.is_talking_about_us || false,
                            learn_more: projectData.learn_more || false
                        })
                        .then(collection => {
                            return res.status(200).json({
                                success: true,
                                data: {message: `Project succesfully created. Project id - ${collection.get('id')}`}
                            })
                        })
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


// //update project
// router.put('/projects/:projectId', (req,res)=>{
//     const token = req.headers.token
//     const projectData = req.body
//     const projectId = req.params.projectId
//
//     console.log(projectData, 'project update data')
//
//     if(!token){
//         return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
//     }
//
//     models.admin
//         .forge({signin_token: token}) //token check here
//         .fetch()
//         .then(user => {
//             if(user){
//                 models.enterpreneur
//                     .query((qb) => {
//                         qb
//                         .where({id: projectData.enterpreneur_id})
//                     })
//                     .fetch()
//                     .then(user => {
//                         if (user) {
//                             //console.log(projectData.project_team[0], typeof projectData.money_to_collect, 'projectdata')
//
//                             const validateCreateProject = validation.validateCreateProject(projectData)
//
//                             if(validateCreateProject.success == false) {
//                                 console.log(validateCreateProject.message, 'false')
//                                 return res.status(500).json({success: false, data: {message: validateCreateProject.message}});
//                             }
//
//                             let project_team = []
//                             let articles = []
//
//                             // if (!_.isEmpty(projectData.project_team)) {
//                             //     project_team = JSON.parse(projectData.project_team)
//                             // }
//                             //
//                             // if (!_.isEmpty(projectData.articles)) {
//                             //     articles = JSON.parse(projectData.articles)
//                             // }
//                             //
//
//                             if (!_.isEmpty(projectData.project_team)) {
//                                 project_team = projectData.project_team
//                             }
//
//                             if (!_.isEmpty(projectData.articles)) {
//                                 articles = projectData.articles
//                             }
//
//                             models.project
//                             .forge({id: projectId})
//                             .fetch({require: true})
//                             .then(project=>{
//                                 console.log(projectData.is_talking_about_us, 'is talking bout us')
//
//                                 project
//                                 .save({
//                                     enterpreneur_id: projectData.enterpreneur_id,
//                                     project_name: projectData.project_name,
//                                     project_field: projectData.project_field,
//                                     project_description: projectData.project_description,
//                                     status_id: projectData.status_id,
//                                     money_to_collect: projectData.money_to_collect,
//                                     money_collected: 0,
//                                     video_url: projectData.video_url,
//                                     project_start_date: new Date(),
//                                     project_finish_date: projectData.project_finish_date,
//
//                                     unit_name1: projectData.unit_name1,
//                                     unit_name2: projectData.unit_name2,
//                                     unit_name3: projectData.unit_name3,
//                                     min_total_price1: projectData.min_total_price1,
//                                     max_total_price1: projectData.max_total_price1,
//                                     min_units1: projectData.min_units1,
//                                     min_total_price2: projectData.min_total_price2,
//                                     max_total_price2: projectData.max_total_price2,
//                                     min_units2: projectData.min_units2,
//                                     min_total_price3: projectData.min_total_price3,
//                                     max_total_price3: projectData.max_total_price3,
//                                     min_units3: projectData.min_units3,
//
//                                     project_team: project_team,   // [{first_name: , last_name: , position: , photo: , fb_link: , linkedin_link: }]
//                                     articles: articles,
//                                     tashkif_file: '',
//                                     project_files: [],
//                                     is_talking_about_us: projectData.is_talking_about_us
//                                 })
//                                 .then(collection=>{
//                                     res.status(200).json({success: true, data: {message: `Project  ${collection.get('id')} succesfully updated.`}})
//                                 })
//                             })
//                         }else{
//                             res.status(404).json({success: false, data: {message: `404. Not found.`}})
//                         }
//                     })
//             }else{
//                 res.status(403).json({success: false, data: {message: `403. Restricted.`}})
//             }
//         })
//         .catch(err=>{
//             res.status(500).json({success: false, data: {message: err.message}})
//         })
// })

//delete projects
router.delete('/projects/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.project
                    .forge({id: req.params.id})
                    .fetch()
                    .then(project=>{
                        if(project){
                            const tashkif_path = project.get('tashkif_file')
                            const project_files_path = project.get('project_files')

                            console.log(tashkif_path, 'adminpanel tashkif delete path')
                            console.log(project_files_path, 'adminpanel tashkif delete path')

                            fs.unlink(tashkif_path, function(err){ //delete
                                if (err) throw err;
                            })

                            for(i=0;i<project_files_path.length;i++){
                                fs.unlink(project_files_path[i], function(err){ //delete
                                    if (err) throw err;
                                })
                            }

                            project
                            .destroy()
                            .then(()=>{
                                return res.status(200).json({success: true, data: {message: 'project successfully deleted'}});
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
router.delete('/projects', (req,res)=> {
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
                models.project
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