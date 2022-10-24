const express = require('express')
const { getSubTasks, createSubTask, editSubTask, deleteSubTask, getParentSubTasks } = require('../controllers/subTaskController')
const router = express.Router()

router.get('/', getSubTasks)
router.get('/:id', getParentSubTasks)
router.post('/', createSubTask)
router.put('/:id', editSubTask)
router.delete('/:id', deleteSubTask)

module.exports = router