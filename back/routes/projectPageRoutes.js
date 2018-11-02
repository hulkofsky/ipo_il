const express = require('express')
const router = express.Router()
const constants = require('../utils/constants')
const models = require('../config/models')
const _ = require('lodash')
const Archiver = require('archiver')
const fs = require('fs')

router.get(`/:projectId/purchase`, (req,res)=>{
    const lang = req.get('language') || constants.DEFAULT_LANGUAGE
    const token = req.headers.token
    const investorId = req.get('investorId')
    const projectId = req.params.projectId

    console.log(projectId, 'projectId purchase')
    console.log(investorId, 'investorId purchase')
    console.log(token, 'token purchase')

    models.content
    .query((qb)=>{
        qb
        .where({page_name: 'header'})
        .orWhere({page_name: 'footer'})
        .orWhere({page_name: 'steps'})
    })
    .orderBy('page_name')
    .fetchAll({ columns: [lang, `media`] })
    .then(pageContent=>{
        models.bank
        .forge() //selecting BANKS
        .fetchAll({withRelated: `branches`})
        .then(banks=>{
            models.project
            .forge({id: projectId})
            .fetch({withRelated: ['project_statuses']})
            .then(project=>{
                if(project){
                    console.log('project exists')
                    if(token !== "null" && token != undefined && investorId !== "null" && investorId != undefined){
                        console.log('tojen id not empty')
                        models.investor
                        .query((qb) => {
                            qb
                            .where({id: investorId})
                            .andWhere({signin_token: token}) // token check here
                        })
                        .fetch({withRelated: ['banks']})
                        .then(investor=> {
                            if (investor) {
                                console.log('investor exists', investor)
                                models.branch
                                    .query((qb) => {
                                        qb
                                        .where({branch_code: investor.get('branch_code')})
                                        .andWhere({bank_code: investor.get('bank_id')})
                                    })
                                    .fetch()
                                    .then(branch=> {
                                        res.status(200).json({success: true,
                                            data: {
                                                pageContent: pageContent,
                                                user: investor,
                                                branch: branch,
                                                project: project,
                                                banks: banks
                                            }
                                        })
                                    })
                            } else {
                                models.enterpreneur
                                    .query((qb) => {
                                        qb
                                            .where({signin_token: token})
                                            .andWhere({id: investorId})
                                    })
                                    .fetch()
                                    .then(()=> {
                                        res.status(403).json({success: false, data: {message: `403. Restricted`}})
                                    })
                            }

                        })
                    }else{
                        res.status(200).json({success: true,
                            data: {
                                pageContent: pageContent,
                                project: project,
                                banks: banks
                            }
                        })
                    }
                }else{
                    res.status(404).json({success: false, data: {message: `404. Not found`}})
                }

            })
        })
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:projectId/downloadProjectFiles', (req,res)=>{
    const projectId = req.params.projectId

    models.project
    .forge({id: projectId})
    .fetch()
    .then(project=>{
        if(project){
            const old_archive = project.get('archive_name')
            console.log(old_archive, "old archive")
            if(old_archive){
                fs.access(`./uploads/${old_archive}`, fs.constants.F_OK, (err) => { // unlink here
                    console.log(`./uploads/${old_archive} ${err ? 'does not exist' : 'exists'}`)
                    fs.unlink(`./uploads/${old_archive}`, function(err){ //delete
                        if (err) throw err
                    })
                })
            }

            const archive = new Archiver('zip', {
                gzip: true,
                zlib: { level: 9 } // Sets the compression level.
            })
            console.log(project.get('tashkif_file'))

            const date = Date.now()
            const archiveName = `${date}${project.get('project_name').replace(/ /g, '_')}.zip`
            console.log(archiveName, 'first archivename')
            const linktoArchive = constants.FILE_PATH + archiveName
            const tashkifLink = project.get('tashkif_file')
            const tashkifFilename = tashkifLink.split('/')[tashkifLink.split('/').length - 1]
            const projectLinksAray = project.get('project_files')
            const output = fs.createWriteStream(`./uploads/${archiveName}`)
            let no_tashkif = false
            let no_files = false

            archive.on('error', function(err) {
                throw err
            })

            // pipe archive data to the output file
            archive.pipe(output)

            if(!_.isEmpty(tashkifLink)){
                console.log(tashkifLink, 'tashkif link')
                archive.append(fs.createReadStream(`./uploads/${tashkifFilename}`), {name: tashkifFilename})
            }else {
                no_tashkif = true
                console.log('no tashkif file')
            }

            if(!_.isEmpty(projectLinksAray)){
                projectLinksAray.forEach((item, i)=> {
                    let filename = item.split('/')[item.split('/').length - 1]
                    console.log(filename, 'filename')
                    archive.append(fs.createReadStream(`./uploads/${filename}`), {name: filename})
                })
            } else {
                no_files = true
                console.log('no project files')
            }

            if(no_tashkif && no_files){
                return res.status(404).json({success: false, data: {message: `404. No files found`}})
            }else{
                archive.finalize()

                project.save({
                    archive_name: archiveName,
                })
                .then(()=>{
                    res.status(200).json({success: true, data: {link: linktoArchive}})
                })
            }
        }else{
            return res.status(404).json({success: false, data: {message: `404. Not found`}})
        }
    })
    .catch(err => {
        console.log(err, 'error')
        return res.status(500).json({success: false, data: {message: err.message}})
    })
})

router.get('/:entId/downloadCompanyFiles', (req,res)=>{
    const entId = req.params.entId

    models.enterpreneur
        .forge({id: entId})
        .fetch()
        .then(ent=>{
            if(ent){
                const old_archive = ent.get('archive_name')
                if(old_archive){
                    fs.access(`./uploads/${old_archive}`, fs.constants.F_OK, (err) => { // unlink here
                        console.log(`./uploads/${old_archive} ${err ? 'does not exist' : 'exists'}`)
                        fs.unlink(`./uploads/${old_archive}`, function(err){ //delete
                            if (err) throw err
                        })
                    })
                }

                const archive = new Archiver('zip', {
                    gzip: true,
                    zlib: { level: 9 } // Sets the compression level.
                })
                console.log(ent.get('company_presentation'))
                console.log(ent.get('financial_report'))

                const date = Date.now()
                const archiveName = `${date}${ent.get('company_name').replace(/ /g, '_')}.zip`
                const linktoArchive = constants.FILE_PATH + archiveName
                const presentationLink = ent.get('company_presentation')
                const presentationName = presentationLink.split('/')[presentationLink.split('/').length - 1]
                const reportLink = ent.get('financial_report')
                const reportName = reportLink.split('/')[reportLink.split('/').length - 1]
                const output = fs.createWriteStream(`./uploads/${archiveName}`)
                let no_presentation = false
                let no_report = false

                archive.on('error', function(err) {
                    throw err
                })

                // pipe archive data to the output file
                archive.pipe(output)

                if(!_.isEmpty(presentationLink)){
                    console.log(presentationLink, 'presentationLink link')
                    archive.append(fs.createReadStream(`./uploads/${presentationName}`), {name: presentationName})
                }else {
                    no_presentation = true
                    console.log('no presentation file')
                }

                if(!_.isEmpty(reportLink)){
                    console.log(reportLink, 'reportLink link')
                    archive.append(fs.createReadStream(`./uploads/${reportName}`), {name: reportName})
                }else {
                    no_report = true
                    console.log('no report file')
                }

                if(no_presentation && no_report){
                    return res.status(404).json({success: false, data: {message: `404. No files found`}})
                }else{
                    archive.finalize()

                    ent.save({
                        archive_name: archiveName,
                    })
                    .then(()=>{
                        res.status(200).json({success: true, data: {link: linktoArchive}})
                    })
                }
            }else{
                return res.status(404).json({success: false, data: {message: `404. Not found`}})
            }
        })
        .catch(err => {
            console.log(err, 'error')
            return res.status(500).json({success: false, data: {message: err.message}})
        })
})

router.post('/subscribe/:projectId', (req,res)=>{
    const token = req.headers.token
    const investorId = req.params.investorId
    const projectId = req.params.projectId

    if(!investorId || !token || !projectId){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.investor
        .query((qb) => {
            qb
                .where({id: investorId})
                .andWhere({signin_token: token}) // token check here
        })
        .fetch()
        .then(user => {
            if(user){
                models.project
                    .forge({id: projectId})
                    .fetch()
                    .then(project=>{
                        if(project){
                            models.subscriber
                                .query((qb) => {
                                    qb
                                        .where({investor_id: investorId})
                                        .andWhere({project_id: projectId})
                                })
                                .fetch()
                                .then((subscriber)=>{
                                    if(subscriber){
                                        res.json({success: false, data: {message: `Already subscribed.`}})
                                    }else{
                                        models.subscriber
                                            .forge({
                                                investor_id: investorId,
                                                project_id: projectId,
                                                subscribe_date: new Date()
                                            })
                                            .save()
                                            .then(()=>{
                                                models.subscribers_projects
                                                    .forge({
                                                        investor_id: investorId,
                                                        project_id: projectId
                                                    })
                                                    .save()
                                                    .then(()=>{
                                                        res.status(200).json({success: true, data: {message: 'Successfully subscribed'}});
                                                    })
                                            })
                                    }
                                })
                        }else{
                            return res.status(404).json({success: false, data: {message: `404. Not found`}})
                        }
                    })
            }else{
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err => {
            return res.status(500).json({success: false, data: {message: err.message}})
        })
})

module.exports = router