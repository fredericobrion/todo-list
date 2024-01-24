import { Task } from '../../types';
import styles from './task-iten.module.css';

type TaskItenProps = {
  name: string;
  id: string;
  completed: boolean;
  darkMode: boolean;
  taskList: Task[];
  setTaskList: (arg: Task[]) => void;
};

function TaskIten({
  name,
  id,
  completed,
  darkMode,
  taskList,
  setTaskList,
}: TaskItenProps) {
  const taskListCopy = [...taskList];

  const selectedTaskIndex = taskList.findIndex((task) => task.id === id);

  const handleCompleteTask = () => {
    taskListCopy[selectedTaskIndex] = {
      id,
      name,
      completed: !completed,
    };
    setTaskList([...taskListCopy]);
    localStorage.setItem("taskList", JSON.stringify([...taskListCopy]));
  };

  const handleDelete = () => {
    taskListCopy.splice(selectedTaskIndex, 1);
    setTaskList([...taskListCopy]);
    localStorage.setItem("taskList", JSON.stringify([...taskListCopy]));
  };

  const setClassBtn = () => {
    if (darkMode) {
      return completed
        ? `${styles.darkMode} ${styles.completedBtn}`
        : styles.darkMode;
    }
    return completed
      ? `${styles.lightMode} ${styles.completedBtn}`
      : styles.lightMode;
  };

  const setClassChecked = () => {
    if (completed) {
      return styles.completedCheck;
    }
    return darkMode ? styles.darkMode : styles.lightMode;
  };

  const setClassTaskName = () => {
    if (darkMode) {
      return completed ? styles.taskCompletedDark : styles.taskNotCompletedDark;
    }
    return completed ? styles.taskCompletedLight : styles.taskNotCompletedLight;
  };

  const btnDeleteClass = darkMode
    ? `${styles.btnDelete} ${styles.btnDeleteDark}`
    : `${styles.btnDelete} ${styles.btnDeleteLight}`;

  const containerClass = darkMode
    ? `${styles.container} ${styles.containerDarkMode}`
    : `${styles.container} ${styles.containerLightMode}`;

  return (
    <div className={containerClass}>
      <div className={styles.btnContainer}>
        <button onClick={handleCompleteTask} className={setClassBtn()}>
          <span className={setClassChecked()}>&#10003;</span>
        </button>
      </div>
      <p className={setClassTaskName()}>{name}</p>
      <button onClick={handleDelete} className={btnDeleteClass}>
        X
      </button>
    </div>
  );
}

export default TaskIten;
