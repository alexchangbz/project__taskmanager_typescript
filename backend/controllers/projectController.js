const Project = require('../models/projectModel')
const SubTask = require('../models/subTaskModel')
const asyncHandler = require('express-async-handler')

// route POST /api/projects
const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    if(!name || !description) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const project = await Project.create({
        name,
        description,
    })

    if(project) {
        res.status(201).json({
            _id: project.id,
            name: project.name,
            description: project.description
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @route PUT /api/projects/:id
const editProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)
    if(!project) {
        res.status(400)
        throw new Error('Project not found')
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedProject)
})

// @route DELETE /api/projects/:id
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    const subtasks = await SubTask.find()
    
    const project_subtasks = subtasks.filter(subtask => subtask.projectID === req.params.id)

    if(project_subtasks.length !== 0) {
        res.status(400)
        throw new Error('Unable to delete project. Make sure the projects have no subtasks')
    }

    if(!project) {
        res.status(400)
        throw new Error('Project not found')
    }

    await project.remove()
    res.status(200).json({ message: 'Project successfully deleted', id: req.params.id })
})

// @route GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find()
    res.status(200).json(projects)
})

// @route GET /api/projects/:id
const getProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)
    if(!project) {
        res.status(400)
        throw new Error('Project not found')
    }
    res.status(200).json(project)
})

module.exports = {
    getProjects,
    createProject,
    editProject,
    deleteProject,
    getProject
}