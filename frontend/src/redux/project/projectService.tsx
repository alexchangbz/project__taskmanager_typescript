import axios from 'axios';

const API_URL='/api/projects'

// Get projects
const getProjects = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Create new project
const createProject = async (projectData: any) => {
    const response = await axios.post(`${API_URL}/project`, projectData)
    return response.data
}

// Edit project
const editProject = async (projectData: any) => {
    const response = await axios.put(`${API_URL}/${projectData._id}`, projectData)
    return response.data
}

// Delete project
const deleteProject = async (projectID: any) => {
    const response = await axios.delete(`${API_URL}/${projectID}`)
    return response.data
}

const projectService = {
    getProjects,
    createProject,
    deleteProject,
    editProject
}

export default projectService