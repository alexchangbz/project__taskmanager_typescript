import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ProjectForm from './pages/ProjectForm';
import SubTaskForm from './pages/SubTaskForm';
import ProjectDetails from './pages/ProjectDetail';
import EditForm from './pages/EditForm';
import EditSubTask from './pages/EditSubTask';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/create' element={<ProjectForm />} />
          <Route path='/create/subtask/:projectID' element={<SubTaskForm />} />
          <Route path='projects/:projectID' element={<ProjectDetails />} />
          <Route path='edit/:projectID' element={<EditForm />} />
          <Route path='subtasks/edit/:subtaskID' element={<EditSubTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

