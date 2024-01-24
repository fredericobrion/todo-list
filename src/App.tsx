import { useState } from 'react'
import './App.css'
import Header from './components/header'
import { Task } from './types';
import NewTask from './components/new-task';
import TaskList from './components/task-list';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const initialList = localStorage.getItem("taskList");

  const [taskList, setTaskList] = useState<Task[]>(initialList ? JSON.parse(initialList) : []);

  return (
    <div className={ darkMode
      ? 'container dark-mode' : 'container light-mode' }>
      <Header 
        darkMode={ darkMode }
        setDarkMode={ setDarkMode }
      />
      <NewTask
        darkMode={ darkMode }
        taskList={ taskList }
        setTaskList={ setTaskList }
      />
      <TaskList
        darkMode={ darkMode }
        taskList={ taskList }
        setTaskList={ setTaskList }
      />
    </div>
  )
}

export default App
