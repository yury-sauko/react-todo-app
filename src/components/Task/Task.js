import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
// import './Task.css';

export default function Task({
  oneTaskProps,
  editTask,
  deleteTask,
  toggleCompleteTask,
  onClickIconPlay,
  onClickIconPause,
}) {
  const [label, setLabel] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { taskText, min, sec, minLeft, secLeft, taskCreated, taskChecked, taskId } = oneTaskProps;

  const onBtnEditClick = () => {
    setLabel(taskText);
    setIsEditing(!isEditing);
  };

  const onLabelChange = (e) => setLabel(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (label.trim().length) editTask(taskId, label.trim());

    setLabel('');
    setIsEditing(!isEditing);
  };

  const taskMinChoise = !minLeft && minLeft !== 0 ? min : minLeft;
  const taskSecChoise = !secLeft && secLeft !== 0 ? sec : secLeft;
  const taskMinutes = `${taskMinChoise}`.length === 1 ? `0${taskMinChoise}` : taskMinChoise;
  const taskSeconds = `${taskSecChoise}`.length === 1 ? `0${taskSecChoise}` : taskSecChoise;

  const formattedCreateTime = formatDistanceToNow(taskCreated, {
    includeSeconds: true,
    addSuffix: true,
  });

  return (
    <li className={taskChecked ? 'completed' : isEditing ? 'editing' : null}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          name="taskCheckbox"
          id={taskId + taskText.length}
          checked={taskChecked}
          onChange={() => toggleCompleteTask(taskId)}
        />
        <label htmlFor={taskId + taskText.length}>
          <span className="title">{taskText}</span>
          <span className="description">
            <button
              className="icon icon-play"
              type="button"
              aria-label="icon-play"
              onClick={() => onClickIconPlay(taskId)}
            />
            <button
              className="icon icon-pause"
              type="button"
              aria-label="icon-pause"
              onClick={() => onClickIconPause(taskId)}
            />
            <span className="timer-text">{`${taskMinutes}:${taskSeconds}`}</span>
          </span>
          <span className="description">{`created ${formattedCreateTime}`}</span>
        </label>
        <button
          className="icon icon-edit"
          type="button"
          aria-label="icon-edit"
          onClick={onBtnEditClick}
        />
        <button
          className="icon icon-destroy"
          type="button"
          aria-label="icon-destroy"
          onClick={() => deleteTask(taskId)}
        />
      </div>
      {isEditing && (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="edit"
            name="editingTaskInput"
            value={label}
            onChange={onLabelChange}
          />
        </form>
      )}
    </li>
  );
}

Task.defaultProps = {
  oneTaskProps: {},
};

Task.propTypes = {
  oneTaskProps: PropTypes.object,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleCompleteTask: PropTypes.func.isRequired,
  onClickIconPlay: PropTypes.func.isRequired,
  onClickIconPause: PropTypes.func.isRequired,
};
