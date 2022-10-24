const express = require('express')
const router = express.Router()
const { getProjects, createProject, editProject, deleteProject, getProject } = require('../controllers/projectController')

router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/project', createProject)
router.put('/:id', editProject)
router.delete('/:id', deleteProject)

module.exports = router