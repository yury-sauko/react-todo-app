import { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import './ToDoApp.css'; // все стили, для таймера не разбивал по файлам

export default class ToDoApp extends Component {
  state = {
    taskProps: [],
    filter: 'All',
  };

  addTask = (taskText, min, sec) => {
    this.setState(({ taskProps }) => {
      const newTask = {
        taskClass: '',
        taskText,
        min,
        sec,
        isPlayActive: false,
        minLeft: null,
        secLeft: null,
        timerId: null,
        // isTimerFull: true, // так и не использовал этот флаг
        taskCreated: new Date(),
        taskChecked: false,
        taskId: `${this.state.taskProps.length}-${Math.random().toFixed(4)}`,
      };

      return { taskProps: [...taskProps, newTask] };
    });
  };

  editTask = (id, newTaskText) => {
    this.setState(({ taskProps }) => {
      const idx = taskProps.findIndex((el) => el.taskId === id);
      const editingTask = { ...taskProps[idx] };
      clearTimeout(editingTask.timerId);
      editingTask.isPlayActive = false;
      editingTask.taskText = newTaskText;

      const newTaskPropsArr = taskProps.with(idx, editingTask);

      return { taskProps: newTaskPropsArr };
    });
  };

  deleteTask = (id) => {
    this.setState(({ taskProps }) => {
      const idx = taskProps.findIndex((el) => el.taskId === id);

      clearTimeout(taskProps[idx].timerId);

      const newTaskPropsArr = [...taskProps.slice(0, idx), ...taskProps.slice(idx + 1)];

      return { taskProps: newTaskPropsArr };
    });
  };

  toggleCompleteTask = (id) => {
    this.setState(({ taskProps }) => {
      const idx = taskProps.findIndex((el) => el.taskId === id);
      const task = { ...taskProps[idx] };

      if (task.taskChecked) {
        task.taskClass = '';
      } else if (!task.taskChecked) {
        task.taskClass = 'completed';
        clearTimeout(taskProps[idx].timerId);
        task.isPlayActive = false;
        task.minLeft = 0;
        task.secLeft = 0;
      }
      task.taskChecked = !task.taskChecked;

      const newTaskPropsArr = taskProps.with(idx, task);

      return { taskProps: newTaskPropsArr };
    });
  };

  changeFilter = (filterName) => {
    this.setState({ filter: filterName });
  };

  showFilteredTasks = (filterName) => {
    let filteredTasks;

    if (filterName === 'All') {
      filteredTasks = this.state.taskProps;
    } else if (filterName === 'Active') {
      filteredTasks = this.state.taskProps.filter((el) => el.taskClass === '');
    } else {
      filteredTasks = this.state.taskProps.filter((el) => el.taskClass === 'completed');
    }

    return filteredTasks;
  };

  deleteCompletedTasks = () => {
    this.setState(({ taskProps }) => {
      const newTaskPropsArr = taskProps.filter((el) => el.taskClass !== 'completed');

      return { taskProps: newTaskPropsArr };
    });
  };

  countingTasksLeft = () => {
    const tasksLeft = this.state.taskProps.filter((el) => el.taskClass !== 'completed').length;

    return tasksLeft;
  };

  onClickIconPlay = (id) => {
    let idx = this.state.taskProps.findIndex((el) => el.taskId === id);
    const task = { ...this.state.taskProps[idx] };

    const { min, sec, isPlayActive, minLeft, secLeft } = task;

    if (isPlayActive || (task.minLeft === 0 && task.secLeft === 0)) return;

    const startPlayTimerMs = Date.now();
    const minFact = minLeft === null ? min : minLeft;
    const secFact = secLeft === null ? sec : secLeft;
    const taskTimeMs = (minFact * 60 + secFact) * 1000;
    const appThis = this;
    const tasksCount = this.state.taskProps.length;

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

      // Актуализирует индекс таски с запущенным таймером
      // в случае удаления другой таски в списке выше
      if (appThis.state.taskProps.length !== tasksCount) {
        idx = appThis.state.taskProps.findIndex((el) => el.taskId === task.taskId);
      }

      appThis.setState(({ taskProps }) => {
        task.isPlayActive = true;
        task.minLeft = minutesLeft;
        task.secLeft = secondsLeft;
        task.timerId = timerId;

        const newTaskPropsArr = taskProps.with(idx, task);

        return { taskProps: newTaskPropsArr };
      });

      if (minutesLeft === 0 && secondsLeft === 0) {
        clearTimeout(timerId);

        appThis.setState(({ taskProps }) => {
          task.taskClass = 'completed';
          task.taskChecked = true;
          task.isPlayActive = true;

          const newTaskPropsArr = taskProps.with(idx, task);

          return { taskProps: newTaskPropsArr };
        });
      }
    });
  };

  onClickIconPause = (id) => {
    const idx = this.state.taskProps.findIndex((el) => el.taskId === id);
    const task = { ...this.state.taskProps[idx] };

    if (task.minLeft === 0 && task.secLeft === 0) return;

    clearTimeout(task.timerId);

    this.setState(({ taskProps }) => {
      task.isPlayActive = false;
      task.timerId = null;

      const newTaskPropsArr = taskProps.with(idx, task);

      return { taskProps: newTaskPropsArr };
    });
  };

  render() {
    const filteredTasks = this.showFilteredTasks(this.state.filter);

    return (
      <section className="todoapp">
        <NewTaskForm appAddTask={this.addTask} />
        <section className="main">
          <TaskList
            taskProps={filteredTasks}
            appEditTask={this.editTask}
            appDeleteTask={this.deleteTask}
            appToggleCompleteTask={this.toggleCompleteTask}
            appOnClickIconPlay={this.onClickIconPlay}
            appOnClickIconPause={this.onClickIconPause}
          />
          <Footer
            filter={this.state.filter}
            appChangeFilter={this.changeFilter}
            appDeleteCompletedTasks={this.deleteCompletedTasks}
            appCountingTasksLeft={this.countingTasksLeft}
          />
        </section>
      </section>
    );
  }
}
