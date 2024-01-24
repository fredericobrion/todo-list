import { useState } from 'react';
import { Task } from '../../types';
import { nanoid } from 'nanoid';
import styles from './new-task.module.css';

type NewTaskProps = {
  darkMode: boolean;
  taskList: Task[];
  setTaskList: (arg: Task[]) => void;
};

function NewTask({ darkMode, taskList, setTaskList }: NewTaskProps) {
  const [newTask, setNewTask] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask !== '') {
      setTaskList([
        ...taskList,
        {
          name: newTask,
          completed,
          id: nanoid(),
        },
      ]);
      setNewTask('');
      setCompleted(false);
    }
  };

  const containerClass = darkMode
    ? `${styles.container} ${styles.darkMode}`
    : `${styles.container} ${styles.lightMode}`;

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

  const setClassInput = () => {
    if (darkMode) {
      return completed
        ? `${styles.darkMode} ${styles.completedDark}`
        : `${styles.darkMode} ${styles.notCompletedDark}`;
    }
    return completed
      ? `${styles.lightMode} ${styles.completedLight}`
      : `${styles.lightMode} ${styles.notCompletedLight}`;
  };

  return (
    <div className={containerClass}>
      <div className={styles.btnContainer}>
        <button
          onClick={() => setCompleted(!completed)}
          className={setClassBtn()}
        >
          <span className={setClassChecked()}>&#10003;</span>
        </button>
      </div>
      <form className={styles.form} onSubmit={handleAddTask}>
        <input
          className={setClassInput()}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </form>
    </div>
  );
}

export default NewTask;
