import { Component } from "react";

import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

import "./ToDoApp.css";

export default class ToDoApp extends Component {
  state = {
    taskProps: [
      {
        taskClass: "",
        taskText: "First task",
        taskCreated: "created 30 minutes ago",
      },
      {
        taskClass: "",
        taskText: "Second task",
        taskCreated: "created 5 minutes ago",
      },
      {
        taskClass: "",
        taskText: "Third task",
        taskCreated: "created 10 seconds ago",
      },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ taskProps }) => {
      const idx = +id[0];
      const newTaskPropsArr = [
        ...taskProps.slice(0, idx),
        ...taskProps.slice(idx + 1),
      ];

      return { taskProps: newTaskPropsArr };
    });
  };

  completeTask = (id) => {
    this.setState(({ taskProps }) => {
      const idx = +id[0];
      const task = { ...taskProps[idx] };

      if (task.taskClass === "completed") {
        task.taskClass = "";
      } else if (task.taskClass !== "completed") {
        task.taskClass = "completed";
      }

      const newTaskPropsArr = [
        ...taskProps.slice(0, idx),
        task,
        ...taskProps.slice(idx + 1),
      ];

      return { taskProps: newTaskPropsArr };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList
            taskProps={this.state.taskProps}
            appOnDeleted={this.deleteTask}
            appOnCompleted={this.completeTask}
          />
          <Footer />
        </section>
      </section>
    );
  }
}
