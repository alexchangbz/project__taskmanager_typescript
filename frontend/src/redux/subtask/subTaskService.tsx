import axios from 'axios';

const API_URL = '/api/subtasks'

// Get parent's sub tasks
const getParentSubTasks = async (id: any) => {
    const response = await axios.get(`${API_URL}/${id}`)
    // console.log(response.data, "GETPARENTSUBTASKS")
    return response.data
}

// Create a sub task
const createSubTask = async (subtaskData: any) => {
    const response = await axios.post(API_URL, subtaskData)
    return response.data
}

// Edit a sub task
const editSubTask = async (subtaskData: any) => {
    const response = await axios.put(`${API_URL}/${subtaskData._id}`, subtaskData)
    return response.data
}

// Delete a sub task
const deleteSubTask = async (id: any) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
}

const subTaskService = {
    getParentSubTasks,
    createSubTask,
    editSubTask,
    deleteSubTask
}

export default subTaskService