import { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
// import './Task.css';

export default class Task extends Component {
  static defaultProps = {
    oneTaskProps: {},
  };

  static propTypes = {
    oneTaskProps: PropTypes.object,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleCompleteTask: PropTypes.func.isRequired,
    onClickIconPlay: PropTypes.func.isRequired,
    onClickIconPause: PropTypes.func.isRequired,
  };

  state = {
    label: '',
    isEditing: false,
  };

  // Останавливает запущенный таймер при переключении фильтров,
  // поэтому очистка выполняется в методе deleteTask на уровне App
  // componentWillUnmount() {
  //   clearTimeout(this.props.oneTaskProps.timerId);
  // }

  onBtnEditClick = () => {
    this.setState(({ isEditing }) => ({
      label: this.props.oneTaskProps.taskText,
      isEditing: !isEditing,
    }));
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { taskId } = this.props.oneTaskProps;
    const { editTask } = this.props;

    if (this.state.label.trim().length) {
      editTask(taskId, this.state.label.trim());
    }

    this.setState(({ isEditing }) => ({
      label: '',
      isEditing: !isEditing,
    }));
  };

  render() {
    const { taskText, min, sec, minLeft, secLeft, taskCreated, taskChecked, taskId } =
      this.props.oneTaskProps;
    const { deleteTask, toggleCompleteTask, onClickIconPlay, onClickIconPause } = this.props;

    const taskMinChoise = !minLeft && minLeft !== 0 ? min : minLeft;
    const taskSecChoise = !secLeft && secLeft !== 0 ? sec : secLeft;
    const taskMinutes = `${taskMinChoise}`.length === 1 ? `0${taskMinChoise}` : taskMinChoise;
    const taskSeconds = `${taskSecChoise}`.length === 1 ? `0${taskSecChoise}` : taskSecChoise;

    const formattedCreateTime = formatDistanceToNow(taskCreated, {
      includeSeconds: true,
      addSuffix: true,
    });

    return (
      <li className={taskChecked ? 'completed' : this.state.isEditing ? 'editing' : null}>
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
            onClick={this.onBtnEditClick}
          />
          <button
            className="icon icon-destroy"
            type="button"
            aria-label="icon-destroy"
            onClick={() => deleteTask(taskId)}
          />
        </div>
        {this.state.isEditing && (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              name="editingTaskInput"
              value={this.state.label}
              onChange={this.onLabelChange}
            />
          </form>
        )}
      </li>
    );
  }
}
