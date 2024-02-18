import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";
import "./Task.css";

// Перенести обработку массива в TaskList ?
function Task({ taskProps, deleteTask, toggleCompleteTask }) {
  const tasksArr = taskProps.map((el, index) => {
    return (
      <li className={el.taskClass} key={el.taskId}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            name="taskCheckbox"
            id={el.taskId + index}
            checked={el.taskChecked}
            onChange={() => toggleCompleteTask(el.taskId)}
          />
          <label htmlFor={el.taskId + index}>
            <span className="description">{el.taskText}</span>
            <span className="created">
              {`created ${formatDistanceToNow(el.taskCreated, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={() => deleteTask(el.taskId)}
          ></button>
        </div>
        {el.taskClass === "editing" && (
          <input type="text" className="edit" value={el.taskText} />
        )}
      </li>
    );
  });

  return tasksArr;
}

Task.defaultProps = {
  taskProps: [],
};

Task.propTypes = {
  taskProps: PropTypes.arrayOf(PropTypes.object),
  deleteTask: PropTypes.func.isRequired,
  toggleCompleteTask: PropTypes.func.isRequired,
};

export default Task;
