import { useDispatch } from 'react-redux'
import React from 'react'
import { deleteSubTask } from '../redux/subtask/subTaskSlice'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../redux-store/store'
import './subtask.css'

const SubTask = ({ subtask, editSingleSubTask, completed }: any) => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="subtask__container">
        <div className="subtask__col">
          <h3>{subtask.name}</h3>
          <p>Short description: {subtask.description}</p>
        </div>
        <div className="subtask__col">
          {completed ? (
            <>
              <button className='btn-status-success' onClick={() => editSingleSubTask(subtask)}>COMPLETE</button>
            </>
          ) : (
            <>
              <button className={subtask.status === "IN PROGRESS" ? 'btn-status-info' : 'btn-status-success'} onClick={() => editSingleSubTask(subtask)}>{subtask.status}</button>
            </>
          )}
          
          <Link className='btn-status-edit' to={`../../subtasks/edit/${subtask._id}`} relative="path">Edit</Link>
          <button className='btn-delete' onClick={() => dispatch(deleteSubTask(subtask._id))}>Delete</button>
        </div>
    </div>
  )
}

export default SubTask