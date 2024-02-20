import { Component } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./ToDoApp.css";

export default class ToDoApp extends Component {
  state = {
    taskProps: [],
    filter: "All",
  };

  addTask = (taskText) => {
    this.setState(({ taskProps }) => {
      const newTask = {
        taskClass: "",
        taskText,
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
      editingTask.taskText = newTaskText;

      const newTaskPropsArr = taskProps.with(idx, editingTask);

      return { taskProps: newTaskPropsArr };
    });
  };

  deleteTask = (id) => {
    this.setState(({ taskProps }) => {
      const idx = taskProps.findIndex((el) => el.taskId === id);
      const newTaskPropsArr = [
        ...taskProps.slice(0, idx),
        ...taskProps.slice(idx + 1),
      ];

      return { taskProps: newTaskPropsArr };
    });
  };

  toggleCompleteTask = (id) => {
    this.setState(({ taskProps }) => {
      const idx = taskProps.findIndex((el) => el.taskId === id);
      const task = { ...taskProps[idx] };

      if (task.taskChecked) {
        task.taskClass = "";
      } else if (!task.taskChecked) {
        task.taskClass = "completed";
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

    if (filterName === "All") {
      filteredTasks = this.state.taskProps;
    } else if (filterName === "Active") {
      filteredTasks = this.state.taskProps.filter((el) => el.taskClass === "");
    } else {
      filteredTasks = this.state.taskProps.filter(
        (el) => el.taskClass === "completed"
      );
    }

    return filteredTasks;
  };

  deleteCompletedTasks = () => {
    this.setState(({ taskProps }) => {
      const newTaskPropsArr = taskProps.filter(
        (el) => el.taskClass !== "completed"
      );

      return { taskProps: newTaskPropsArr };
    });
  };

  countingTasksLeft = () => {
    const tasksLeft = this.state.taskProps.filter(
      (el) => el.taskClass !== "completed"
    ).length;

    return tasksLeft;
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
