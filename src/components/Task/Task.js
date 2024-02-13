import "./Task.css";

function Task({ taskProps, onDeleted, onCompleted }) {
  const tasksArr = taskProps.map((el, idx) => {
    const id = `${idx}-${window.btoa(encodeURIComponent(el.taskText))}`;
    return (
      <li className={el.taskClass} key={id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={() => onCompleted(id)}
          />
          <label>
            <span className="description">{el.taskText}</span>
            <span className="created">{el.taskCreated}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={() => onDeleted(id)}
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
