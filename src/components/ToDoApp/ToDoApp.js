import { useState } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import './ToDoApp.css'; // все стили, для таймера не разбивал по файлам

export default function ToDoApp() {
  const [taskProps, setTaskProps] = useState([]);
  const [filter, setFilter] = useState('All');

  const addTask = (taskText, min, sec) => {
    setTaskProps((prevTaskProps) => {
      const newTask = {
        taskClass: '',
        taskText,
        min,
        sec,
        isPlayActive: false,
        minLeft: null,
        secLeft: null,
        timerId: null,
        taskCreated: new Date(),
        taskChecked: false,
        taskId: `${taskProps.length}-${Math.random().toFixed(4)}`,
      };

      return [...prevTaskProps, newTask];
    });
  };

  const editTask = (id, newTaskText) => {
    setTaskProps((prevTaskProps) => {
      const idx = prevTaskProps.findIndex((el) => el.taskId === id);
      const editingTask = { ...prevTaskProps[idx] };
      clearTimeout(editingTask.timerId);
      editingTask.isPlayActive = false;
      editingTask.taskText = newTaskText;

      return prevTaskProps.with(idx, editingTask);
    });
  };

  const deleteTask = (id) => {
    setTaskProps((prevTaskProps) => {
      const idx = prevTaskProps.findIndex((el) => el.taskId === id);
      clearTimeout(prevTaskProps[idx].timerId);

      return [...prevTaskProps.slice(0, idx), ...prevTaskProps.slice(idx + 1)];
    });
  };

  const toggleCompleteTask = (id) => {
    setTaskProps((prevTaskProps) => {
      const idx = prevTaskProps.findIndex((el) => el.taskId === id);
      const task = { ...prevTaskProps[idx] };

      if (task.taskChecked) {
        task.taskClass = '';
      } else if (!task.taskChecked) {
        task.taskClass = 'completed';
        clearTimeout(prevTaskProps[idx].timerId);
        task.isPlayActive = false;
        task.minLeft = 0;
        task.secLeft = 0;
      }
      task.taskChecked = !task.taskChecked;

      return prevTaskProps.with(idx, task);
    });
  };

  const changeFilter = (filterName) => setFilter(filterName);

  const showFilteredTasks = (filterName) => {
    let filteredTasks;

    if (filterName === 'All') {
      filteredTasks = taskProps;
    } else if (filterName === 'Active') {
      filteredTasks = taskProps.filter((el) => el.taskClass === '');
    } else {
      filteredTasks = taskProps.filter((el) => el.taskClass === 'completed');
    }

    return filteredTasks;
  };

  const deleteCompletedTasks = () =>
    setTaskProps((prevTaskProps) => prevTaskProps.filter((el) => el.taskClass !== 'completed'));

  const countingTasksLeft = () => taskProps.filter((el) => el.taskClass !== 'completed').length;

  const onClickIconPlay = (id) => {
    let idx = taskProps.findIndex((el) => el.taskId === id);
    const task = { ...taskProps[idx] };

    const { min, sec, isPlayActive, minLeft, secLeft } = task;

    if (isPlayActive || (task.minLeft === 0 && task.secLeft === 0)) return;

    const startPlayTimerMs = Date.now();
    const minFact = minLeft === null ? min : minLeft;
    const secFact = secLeft === null ? sec : secLeft;
    const taskTimeMs = (minFact * 60 + secFact) * 1000;
    const tasksCount = taskProps.length; // +++++++++++++++++

    let timerId = setTimeout(function timer() {
      const timePassedMs = Date.now() - startPlayTimerMs;
      const timeLeftMs = taskTimeMs - timePassedMs;
      const minutesLeft = Math.floor(timeLeftMs / (1000 * 60));
      const secondsLeft = Math.floor(timeLeftMs / 1000 - minutesLeft * 60);

      timerId = setTimeout(timer, 1000);

      // Предотвращает вызов setState и обращение в нем к idx
      // уже несуществующей таски после ее удаления кнопкой,
      // так как после удаления остается крайний запланированный setTimeout
      if (!timerId) return;

      setTaskProps((prevTaskProps) => {
        task.isPlayActive = true;
        task.minLeft = minutesLeft;
        task.secLeft = secondsLeft;
        task.timerId = timerId;

        // Актуализирует индекс таски с запущенным таймером
        // в случае удаления другой таски в списке выше
        if (prevTaskProps.length !== tasksCount) {
          idx = prevTaskProps.findIndex((el) => el.taskId === task.taskId);
        }

        return prevTaskProps.with(idx, task);
      });

      if (minutesLeft === 0 && secondsLeft === 0) {
        clearTimeout(timerId);

        setTaskProps((prevTaskProps) => {
          task.taskClass = 'completed';
          task.taskChecked = true;
          task.isPlayActive = true;

          return prevTaskProps.with(idx, task);
        });
      }
    });
  };

  const onClickIconPause = (id) => {
    const idx = taskProps.findIndex((el) => el.taskId === id);
    const task = { ...taskProps[idx] };

    if (task.minLeft === 0 && task.secLeft === 0) return;

    clearTimeout(task.timerId);

    setTaskProps((prevTaskProps) => {
      task.isPlayActive = false;
      task.timerId = null;

      return prevTaskProps.with(idx, task);
    });
  };

  const filteredTasks = showFilteredTasks(filter);

  return (
    <section className="todoapp">
      <NewTaskForm appAddTask={addTask} />
      <section className="main">
        <TaskList
          taskProps={filteredTasks}
          appEditTask={editTask}
          appDeleteTask={deleteTask}
          appToggleCompleteTask={toggleCompleteTask}
          appOnClickIconPlay={onClickIconPlay}
          appOnClickIconPause={onClickIconPause}
        />
        <Footer
          filter={filter}
          appChangeFilter={changeFilter}
          appDeleteCompletedTasks={deleteCompletedTasks}
          appCountingTasksLeft={countingTasksLeft}
        />
      </section>
    </section>
  );
}
