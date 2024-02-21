import { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
    static defaultProps = {
        oneTaskProps: {},
    };

    static propTypes = {
        oneTaskProps: PropTypes.object,
        editTask: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
        toggleCompleteTask: PropTypes.func.isRequired,
    };

    state = {
        label: '',
        isEditing: false,
    };

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
        const { taskText, taskCreated, taskChecked, taskId } = this.props.oneTaskProps;
        const { deleteTask, toggleCompleteTask } = this.props;
        const formattedCreateTime = formatDistanceToNow(taskCreated, { includeSeconds: true, addSuffix: true });

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
                        <span className="description">{taskText}</span>
                        <span className="created">{`created ${formattedCreateTime}`}</span>
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
