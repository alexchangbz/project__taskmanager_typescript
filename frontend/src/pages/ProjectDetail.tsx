import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getProject } from "../redux/detail/detailSlice";
import { deleteProject } from "../redux/project/projectSlice";
import { getParentSubTasks, editSubTask } from "../redux/subtask/subTaskSlice";
import { AppDispatch } from "../redux-store/store";
import Spinner from "../components/Spinner";
import SubTask from "../components/SubTask";
import "./projectdetails.css"

const ProjectDetails = () => {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { detail, isLoading, isError, message } = useSelector(
        (state: any) => state.detail
    )
    const { subtasks } = useSelector((state: any) => state.subtask)
    const [filterTasks, setFilterTasks] = useState<any>(null)
    const [error, setError] = useState("")

    const callDeleteProject = (id: any) => {
        if(subtasks.length > 0) {
            setError("Please make sure all subtasks are deleted")
            setTimeout(() => {setError("")}, 5000)
        } else {
            dispatch(deleteProject(id))
            navigate('/')
        }
    }

    const filterTask = (input: any) => {
        if(input === "ALL") {
            setFilterTasks(null)
        } else {
            const data = subtasks.filter((subtask: any) => subtask.status === input)
            setFilterTasks(data)
        }
    }

    const editSingleSubTask = (subtask: any) => {
        if(subtask.status === "IN PROGRESS") {
            dispatch(editSubTask({...subtask, status: "DONE"}))
        } else {
            dispatch(editSubTask({...subtask, status: "IN PROGRESS"}))
        }
        dispatch(getParentSubTasks(params.projectID))
        window.location.reload()
    }

    useEffect(() => {
        setFilterTasks(null)
        if (isError) {
            console.log(message)
        }
        dispatch(getProject(params.projectID))
        dispatch(getParentSubTasks(params.projectID))
    }, [isError, dispatch, message, params.projectID])
    
    if(isLoading) return <Spinner />

    return (
        <div className='project__details-container'>
            <div className="project__info">
                <div className="project__info-text">
                    {((subtasks.filter((subtask: any) => subtask.status === "DONE")).length / subtasks.length) !== 1 ? (
                        <h3 className="incomplete">IN PROGRESS {(subtasks.filter((subtask: any) => subtask.status === "DONE")).length} / {subtasks.length}</h3>
                    ) : (
                        <h3 className="complete">COMPLETED </h3>
                    )}
                    <h2>Project Name: {detail.name}</h2>
                    <p className="project__info-id">Project ID: {params.projectID}</p>
                    <p className="project__info-description"><b>Description:</b> {detail.description}</p>
                    <Link to={`/create/subtask/${params.projectID}`}>Add Subtask</Link>
                </div>
                <div className="project__info-status">
                    <button className='btn-delete' onClick={() => callDeleteProject(detail._id)}>Delete Project</button>
                </div>
            </div>
            <div className="subtasks__container">
                {error !== "" && (<p>{error}</p>)}
                <h3>Filter By:</h3>
                <div className="filter__container">
                    <button className='btn-alert' onClick={() => filterTask("IN PROGRESS")}>InProgress - {(subtasks.filter((subtask: any) => subtask.status === "IN PROGRESS")).length}</button>
                    <button className='btn-alert' onClick={() => filterTask("DONE")}>Done - {(subtasks.filter((subtask: any) => subtask.status === "DONE")).length}</button>
                    <button className='btn-alert' onClick={() => filterTask("ALL")}>All - {subtasks.length}</button>
                </div>
                
                <h3>Subtasks</h3>
                    {subtasks.length > 0 ? (
                        <div>
                            {filterTasks ? (
                                <>
                                    {filterTasks.map((subtask: any, index: any) => (
                                        <div key={index}>
                                            {((subtasks.filter((subtask: any) => subtask.status === "DONE")).length / subtasks.length) !== 1 ? (
                                                <SubTask subtask={subtask} editSingleSubTask={editSingleSubTask} completed={false} />
                                            ): (
                                                <SubTask subtask={subtask} editSingleSubTask={editSingleSubTask} completed={true} />
                                            )}
                                        </div>
                                    ))}
                                </>
                            ): (
                                <>
                                    {subtasks.map((subtask: any, index: any) => (
                                        <div key={index}>
                                            {((subtasks.filter((subtask: any) => subtask.status === "DONE")).length / subtasks.length) !== 1 ? (
                                                <SubTask subtask={subtask} editSingleSubTask={editSingleSubTask} completed={false} />
                                            ): (
                                                <SubTask subtask={subtask} editSingleSubTask={editSingleSubTask} completed={true} />
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        ) :
                        (
                            <>
                                <p>You have no subtasks</p>
                            </>
                        )
                    }
            </div>
        </div>
    )
}

export default ProjectDetails