import { useState } from 'react';
import PropTypes from 'prop-types';
// import './NewTaskForm.css';

export default function NewTaskForm({ appAddTask }) {
  const [taskValues, setTaskValues] = useState({
    taskLabel: '',
    minLabel: '',
    secLabel: '',
  });

  const onLabelChange = (e) => {
    const inputName = e.target.name;

    setTaskValues((prevState) => ({ ...prevState, [inputName]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { taskLabel, minLabel, secLabel } = taskValues;
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
      appAddTask(taskLabel.trim(), Number(minLabel), Number(secLabel));

      setTaskValues({
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

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="Task"
          name="taskLabel"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={taskValues.taskLabel}
          onChange={onLabelChange}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          name="minLabel"
          value={taskValues.minLabel}
          onChange={onLabelChange}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          name="secLabel"
          value={taskValues.secLabel}
          onChange={onLabelChange}
        />
        <button type="submit" aria-label="submit button" tabIndex={-1} />
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  appAddTask: PropTypes.func.isRequired,
};
