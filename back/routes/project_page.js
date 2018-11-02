const express = require('express')
const projectRouter = express.Router()
const Bookshelf = require('../config/database')
const models = require('../config/models')
const Project = Bookshelf.Model.extend({
    tableName: 'projects',
    project_statuses: function(){
        return this.belongsTo(project_status, 'status_id')
    },
})

//get all projects
projectRouter.get('/', (req,res)=>{
    models.projects.forge().fetch({withRelated: ['project_statuses']}).then(collection=>{
        res.json({success: true, data: collection})
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get project by id
projectRouter.get('/project/:id', (req,res)=>{
    models.project.forge({id: req.params.id}).fetch({withRelated: ['project_statuses']}).then(collection=>{
        res.json({success: true, data: collection})
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//create project
projectRouter.post('/', (req,res)=>{
    models.project
    .forge({
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        status_id: req.body.status_id,
        project_price_nis:req.body.project_price_nis, 
        raised_funds_nis: req.body.raised_funds_nis,
        video_url: req.body.video_url,
        project_finish_date: req.body.project_finish_date,
        min_total_price: req.body.min_total_price,
        min_units: req.body.min_units
    }).save().then(collection=>{
        res.json({success: true, data: {id: collection.get('id')}})
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//update project
projectRouter.put('/project/:id', (req,res)=>{
    models.project.forge({id: req.params.id})
    .fetch({require: true})
    .then(project=>{
        project.save({
            project_name: req.body.project_name || project.get('project_name'),
            project_description: req.body.project_description || project.get('project_description'),
            status_id: req.body.status_id || project.get('status_id'),
            project_price_nis:req.body.project_price_nis || project.get('project_price_nis'), 
            raised_funds_nis: req.body.raised_funds_nis || project.get('raised_funds_nis'),
            video_url: req.body.video_url || project.get('video_url'),
            project_finish_date: req.body.project_finish_date || project.get('project_finish_date'),
            min_total_price: req.body.min_total_price || project.get('min_total_price'),
            min_units: req.body.min_units || project.get('min_units')
        })
        .then(()=>{
            res.json({success: true, data: {message: 'User details updated'}});
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}});
        })
    })
})

//delete project
projectRouter.delete('/project/:id', (req,res)=>{
    models.project.forge({id: req.params.id})
    .fetch({require: true})
    .then(project=>{
        project.destroy()
        .then(()=>{
            res.json({success: true, data: {message: 'Project successfully deleted'}});
        })
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}});
    })
})

module.exports = projectRouter