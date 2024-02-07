import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

import "./ToDoApp.css";

const taskProps = [
  {
    taskClass: "completed",
    taskText: "Completed task",
    taskCreated: "created 17 seconds ago",
  },
  {
    taskClass: "editing",
    taskText: "Editing task",
    taskCreated: "created 5 minutes ago",
  },
  {
    taskClass: "",
    taskText: "Active task",
    taskCreated: "created 5 minutes ago",
  },
];

function ToDoApp() {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList taskProps={taskProps} />
        <Footer />
      </section>
    </section>
  );
}

export default ToDoApp;
