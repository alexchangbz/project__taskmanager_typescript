import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createSubTask } from "../redux/subtask/subTaskSlice"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { AppDispatch } from "../redux-store/store"
import './form.css'

const initial = {name: '', description: '', projectID: ''}

const SubTaskForm = () => {
    const params = useParams()
    const [newSubTask, setNewSubTask] = useState(initial)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setNewSubTask((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        dispatch(createSubTask({...newSubTask, projectID: params.projectID}))
        setNewSubTask(initial)
        navigate(`/projects/${params.projectID}`)
    }

    return (
        <div className="subtaskform__container">  
            <button className="back-btn" onClick={() => navigate(-1)}>--- Go Back ---</button>
            <h1>Create a New Sub Task</h1>
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
                    Add SubTask
                </button>
            </form>
        </div>
    )
}

export default SubTaskForm