import Task from "../Task/Task";

import "./TaskList.css";

function TaskList({ taskProps }) {
  return (
    <ul className="todo-list">
      <Task taskProps={taskProps} />
    </ul>
  );
}

export default TaskList;
