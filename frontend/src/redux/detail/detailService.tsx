import axios from "axios";

const API_URL='/api/projects'

// Get projects
const getProject = async (projectID: any) => {
    const response = await axios.get(`${API_URL}/${projectID}`)
    return response.data
}

const detailService = {
    getProject
}

export default detailService