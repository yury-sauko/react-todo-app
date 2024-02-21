import { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
    static propTypes = {
        appAddTask: PropTypes.func.isRequired,
    };

    state = {
        label: '',
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.label.trim().length) {
            this.props.appAddTask(this.state.label.trim());
        }
        this.setState({
            label: '',
        });
    };

    render() {
        return (
            <form className="header" onSubmit={this.onSubmit}>
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    name="newTaskInput"
                    value={this.state.label}
                    onChange={this.onLabelChange}
                />
            </form>
        );
    }
}
