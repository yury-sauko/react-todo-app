import PropTypes from 'prop-types';
import Task from '../Task/Task';
// import './TaskList.css';

function TaskList({
  taskProps,
  appEditTask,
  appDeleteTask,
  appToggleCompleteTask,
  appOnClickIconPlay,
  appOnClickIconPause,
}) {
  return (
    <ul className="todo-list">
      {taskProps.map((oneTaskProps) => (
        <Task
          key={oneTaskProps.taskId}
          oneTaskProps={oneTaskProps}
          editTask={(id, newTaskText) => appEditTask(id, newTaskText)}
          deleteTask={(id) => appDeleteTask(id)}
          toggleCompleteTask={(id) => appToggleCompleteTask(id)}
          onClickIconPlay={(id) => appOnClickIconPlay(id)}
          onClickIconPause={(id) => appOnClickIconPause(id)}
        />
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  taskProps: [],
};

TaskList.propTypes = {
  taskProps: PropTypes.arrayOf(PropTypes.object),
  appEditTask: PropTypes.func.isRequired,
  appDeleteTask: PropTypes.func.isRequired,
  appToggleCompleteTask: PropTypes.func.isRequired,
  appOnClickIconPlay: PropTypes.func.isRequired,
  appOnClickIconPause: PropTypes.func.isRequired,
};

export default TaskList;
