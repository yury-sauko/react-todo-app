import "./Task.css";

function Task({ taskProps }) {
  const tasksArr = taskProps.map((el) => {
    return (
      <li
        className={el.taskClass}
        key={window.btoa(
          encodeURIComponent(el.taskText + Math.random().toFixed(4))
        )}
      >
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{el.taskText}</span>
            <span className="created">{el.taskCreated}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        {el.taskClass === "editing" && (
          <input type="text" className="edit" value="Editing task" />
        )}
      </li>
    );
  });

  return tasksArr;
}

export default Task;
