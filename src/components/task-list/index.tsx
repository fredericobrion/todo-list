import { useState } from 'react';
import { Task } from '../../types';
import TaskIten from '../task-iten';
import styles from './task-list.module.css';

type TaskListProps = {
  darkMode: boolean;
  taskList: Task[];
  setTaskList: (arg1: Task[]) => void;
};

export default function TaskList({
  darkMode,
  taskList,
  setTaskList,
}: TaskListProps) {
  const [taskStatus, setTaskStatus] = useState<'all' | 'active' | 'completed'>(
    'all'
  );

  let tasksToShow = taskList;

  switch (taskStatus) {
    case 'active':
      tasksToShow = taskList.filter((task) => task.completed === false);
      break;
    case 'completed':
      tasksToShow = taskList.filter((task) => task.completed === true);
      break;
    default:
      tasksToShow = taskList;
  }

  const handleClearCompleted = () => {
    const notCompletedTasks = taskList.filter(
      (task) => task.completed === false
    );
    setTaskList([...notCompletedTasks]);
    localStorage.setItem("taskList", JSON.stringify([...notCompletedTasks]));
  };

  const containerClass = darkMode
    ? `${styles.container} ${styles.darkMode}`
    : `${styles.container} ${styles.lightMode}`;

  const setBtnClass = (status: 'all' | 'active' | 'completed') => {
    if (taskStatus === status) {
      return styles.btnSelected;
    }
    return darkMode ? styles.btnDarkMode : styles.btnLightMode;
  };

  const tasksLeft = taskList.filter((task) => !task.completed).length;

  return (
    <div className={containerClass}>
      <div className={styles.tasksContainer}>
        {tasksToShow.map((task) => {
          return (
            <div key={task.id}>
              <TaskIten
                name={task.name}
                completed={task.completed}
                darkMode={darkMode}
                id={task.id}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.footerContainer}>
        <p>{`${tasksLeft} itens left`}</p>
        <button
          className={setBtnClass('all')}
          onClick={() => setTaskStatus('all')}
        >
          All
        </button>
        <button
          className={setBtnClass('active')}
          onClick={() => setTaskStatus('active')}
        >
          Active
        </button>
        <button
          className={setBtnClass('completed')}
          onClick={() => setTaskStatus('completed')}
        >
          Completed
        </button>
        <button
          className={darkMode ? styles.btnDarkMode : styles.btnLightMode}
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}
