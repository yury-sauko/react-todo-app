import { Component } from 'react';
import PropTypes from 'prop-types';
// import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    appAddTask: PropTypes.func.isRequired,
  };

  state = {
    taskLabel: '',
    minLabel: '',
    secLabel: '',
  };

  onLabelChange = (e) => {
    const inputName = e.target.name;

    this.setState({
      [inputName]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { taskLabel, minLabel, secLabel } = this.state;
    const minLabelBool =
      minLabel.length > 0 &&
      Number(minLabel) >= 0 &&
      Number(minLabel) <= 60 &&
      Number.isInteger(Number(minLabel));
    const secLabelBool =
      secLabel.length > 0 &&
      Number(secLabel) >= 0 &&
      Number(secLabel) <= 60 &&
      Number.isInteger(Number(secLabel));

    if (taskLabel.trim().length && minLabelBool && secLabelBool) {
      this.props.appAddTask(taskLabel.trim(), Number(minLabel), Number(secLabel));

      this.setState({
        taskLabel: '',
        minLabel: '',
        secLabel: '',
      });
    } else {
      // eslint-disable-next-line no-alert
      alert(
        'Fill in all the fields and enter the correct values of minutes and seconds:' +
          ' these must be integer numbers from 0 to 60 inclusive',
      );
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="Task"
            name="taskLabel"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            value={this.state.taskLabel}
            onChange={this.onLabelChange}
          />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Min"
            name="minLabel"
            value={this.state.minLabel}
            onChange={this.onLabelChange}
          />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Sec"
            name="secLabel"
            value={this.state.secLabel}
            onChange={this.onLabelChange}
          />
          <button type="submit" aria-label="submit button" tabIndex={-1} />
        </form>
      </header>
    );
  }
}
