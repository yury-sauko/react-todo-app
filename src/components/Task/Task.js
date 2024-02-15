import "./Task.css";

function Task({ taskProps, deleteTask, toggleCompleteTask }) {
  const tasksArr = taskProps.map((el) => {
    return (
      <li className={el.taskClass} key={el.taskId}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={el.taskChecked}
            onClick={() => toggleCompleteTask(el.taskId)}
          />
          <label>
            <span className="description">{el.taskText}</span>
            <span className="created">{el.taskCreated}</span>
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

export default Task;
