import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProject } from '../redux/detail/detailSlice'
import { AppDispatch } from '../redux-store/store'
import { Link } from 'react-router-dom'
import './project.css'
import Spinner from './Spinner'

const Project = ({ project, subtasks }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const editAction = async (id: any) => {
    await dispatch(getProject(id))
    navigate(`/edit/${id}`)
  }

  if(!subtasks) return <Spinner />

  return (
      <div className="project__container">
        <div className="title">
          <h3>Title: {project.name}</h3>
          <p>description: {project.description}</p>
        </div>
        <div className="status">
          <p>Total subtasks: </p>
          <p>{subtasks.length.toString()}</p>
        </div>
        <div className="actions">
          <Link to={`/projects/${project._id}`}>View</Link>
          <button className='btn-edit' onClick={() => editAction(project._id)}>Edit</button>
        </div>
      </div>
  )
}

export default Project