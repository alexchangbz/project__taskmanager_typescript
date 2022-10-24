const SubTask = require('../models/subTaskModel')
const Project = require('../models/projectModel')
const asyncHandler = require('express-async-handler')

// route POST /api/subtasks
const createSubTask = asyncHandler(async (req, res) => {
    const { name, description, projectID } = req.body 
    const project = await Project.findById(projectID)

    if(!project) {
        res.status(400)
        throw new Error('Parent task not found')
    }

    if(!name || !description || !projectID ) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const subtask = await SubTask.create({
        name,
        description,
        status: "IN PROGRESS",
        projectID
    })
    
    project.subTaskID = [...project.subTaskID, subtask._id]
    await Project.findByIdAndUpdate(projectID, project, { new: true })

    if(subtask) {
        res.status(201).json({
            _id: subtask.id,
            name: subtask.name,
            description: subtask.description,
            status: subtask.status,
            projectID: subtask.projectID
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @route PUT /api/subtasks/:id
const editSubTask = asyncHandler(async (req, res) => {
    const subtask = await SubTask.findById(req.params.id)

    if(!subtask) {
        res.status(400)
        throw new Error('Sub Task not found')
    }

    const updatedSubTask = await SubTask.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedSubTask)
})

// @route DELETE /api/subtasks/:id
const deleteSubTask = asyncHandler(async (req, res) => {
    const { projectID } = req.body
    const subtask = await SubTask.findById(req.params.id)
    const project = await Project.findById(subtask.projectID)

    if(!subtask || !project) {
        res.status(400)
        throw new Error('Sub Task or project not found')
    }

    const filterSubTask = project.subTaskID.filter((item) => {
        return item.toString() !== req.params.id.toString()
    })

    project.subTaskID = filterSubTask

    await Project.findByIdAndUpdate(projectID, project, { new: true })

    await subtask.remove()

    res.status(200).json({ message: 'Sub Task successfully deleted', id: req.params.id })
})

// @route GET /api/subtasks
const getSubTasks = asyncHandler(async (req, res) => {
    const subtasks = await SubTask.find()
    res.status(200).json(subtasks)
})

// @route GET /api/subtasks/:id
const getParentSubTasks = asyncHandler(async (req, res) => {
    const subtasks = await SubTask.find()
    const parentSubTasks = subtasks.filter(subtask => subtask.projectID === req.params.id)
    res.status(200).json(parentSubTasks)
})

module.exports = {
    getSubTasks,
    createSubTask,
    editSubTask,
    deleteSubTask,
    getParentSubTasks
}