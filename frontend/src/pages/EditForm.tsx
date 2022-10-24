import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editProject } from "../redux/project/projectSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { AppDispatch } from "../redux-store/store"
import './form.css'

const EditForm = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const { detail, isLoading } = useSelector(
        (state: any) => state.detail
    )
    
    const [updateProject, setUpdateProject] = useState(detail)

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setUpdateProject((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        dispatch(editProject(updateProject))
        navigate('/')
    }

    if(isLoading) return <Spinner />

    return (
        <>
            <h1>Edit Project</h1>
            <form onSubmit={onSubmit} className="form__container">
                <label htmlFor="name">Name: </label>
                <input 
                    type="text" 
                    name="name"
                    id="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Project Name"
                    value={updateProject.name}
                />
                <label htmlFor="description">Descriptions: </label>
                <input 
                    type="text" 
                    name="description"
                    id="description"
                    onChange={(e) => handleChange(e)}
                    placeholder="Project Description"
                    value={updateProject.description}
                />
                <button type="submit">
                    Edit Project
                </button>
            </form>
        </>
    )
}

export default EditForm