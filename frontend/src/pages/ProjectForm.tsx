import { useState } from "react"
import { useDispatch } from "react-redux"
import { createProject } from "../redux/project/projectSlice"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "../redux-store/store"
import './form.css'

const initial = {name: '', description: ''}

const ProjectForm = () => {
    const [newProject, setNewProject] = useState(initial)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setNewProject((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        dispatch(createProject(newProject))
        setNewProject(initial)
        navigate('/')
    }

    return (
        <>
            <h1>Create a New Project</h1>
            <form onSubmit={onSubmit} className="form__container">
                <label htmlFor="name">Name: </label>
                <input 
                    type="text" 
                    name="name"
                    id="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Project Name"
                />
                <label htmlFor="description">Descriptions: </label>
                <input 
                    type="text" 
                    name="description"
                    id="description"
                    onChange={(e) => handleChange(e)}
                    placeholder="Project Description"
                />
                <button type="submit">
                    Add Project
                </button>
            </form>
        </>
    )
}

export default ProjectForm