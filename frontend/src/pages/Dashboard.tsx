import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { getProjects } from '../redux/project/projectSlice';
import { useEffect } from 'react';
import Project from '../components/Project';
import Pagination from '../components/Pagination';
import { AppDispatch } from '../redux-store/store';
import './dashboard.css'

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch<AppDispatch>()
    const { projects, isLoading, isError, message } = useSelector(
        (state: any) => state.projects
    )
    const postsPerPage = 20

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = projects.slice(indexOfFirstPost, indexOfLastPost)

    // Change Page
  const paginate = (num: any) => {
    setCurrentPage(num)
  }

    useEffect(() => {
      if (isError) {
        console.log(message)
      }
      dispatch(getProjects())
    }, [isError, message, dispatch])

    return (
        <div>
            <div className='projects__container'>
                <div className="table">
                    <div className="summary">
                        <div className="summary__col">
                            <h3>Total Projects</h3>
                            <p>{projects.length.toString()}</p>
                        </div>
                    </div>
                    <div className="row">
                        <h2>List of Projects</h2>
                    </div>

                    {projects.length > postsPerPage && (<Pagination postsPerPage={postsPerPage} totalPosts={projects} paginate={paginate} currentPage={currentPage} />)}
                    {currentPosts.map((project: any, index: any) => (    
                        <Project project={project} subtasks={project.subTaskID} key={index}  />
                    ))}
                    {projects.length > postsPerPage && (<Pagination postsPerPage={postsPerPage} totalPosts={projects} paginate={paginate} currentPage={currentPage} />)}
                </div>
            </div>
        </div>
    )
}

export default Dashboard