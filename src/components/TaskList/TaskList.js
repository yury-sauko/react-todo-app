import Task from "../Task/Task";

import "./TaskList.css";

function TaskList({ taskProps, appOnDeleted, appOnCompleted }) {
  return (
    <ul className="todo-list">
      <Task
        taskProps={taskProps}
        onDeleted={(id) => appOnDeleted(id)}
        onCompleted={(id) => appOnCompleted(id)}
      />
    </ul>
  );
}

export default TaskList;
