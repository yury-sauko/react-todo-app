import PropTypes from "prop-types";
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

TaskList.defaultProps = {
  taskProps: [],
};

TaskList.propTypes = {
  taskProps: PropTypes.arrayOf(PropTypes.object),
  appDeleteTask: PropTypes.func.isRequired,
  appToggleCompleteTask: PropTypes.func.isRequired,
};

export default TaskList;
