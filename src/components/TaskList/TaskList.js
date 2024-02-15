import Task from "../Task/Task";
import "./TaskList.css";

function TaskList({ taskProps, appDeleteTask, appToggleCompleteTask }) {
  return (
    <ul className="todo-list">
      <Task
        taskProps={taskProps}
        deleteTask={(id) => appDeleteTask(id)}
        toggleCompleteTask={(id) => appToggleCompleteTask(id)}
      />
    </ul>
  );
}

export default TaskList;
