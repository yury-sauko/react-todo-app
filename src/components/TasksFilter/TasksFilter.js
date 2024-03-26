import PropTypes from 'prop-types';
// import './TasksFilter.css';

export default function TasksFilter({ filter, changeFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          value="All"
          className={filter === 'All' ? 'selected' : ''}
          type="button"
          onClick={(e) => changeFilter(e.target.value)}
        >
          All
        </button>
      </li>
      <li>
        <button
          value="Active"
          className={filter === 'Active' ? 'selected' : ''}
          type="button"
          onClick={(e) => changeFilter(e.target.value)}
        >
          Active
        </button>
      </li>
      <li>
        <button
          value="Completed"
          className={filter === 'Completed' ? 'selected' : ''}
          type="button"
          onClick={(e) => changeFilter(e.target.value)}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: 'All',
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};
