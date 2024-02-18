import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";

function Footer({
  filter,
  appChangeFilter,
  appDeleteCompletedTasks,
  appCountingTasksLeft,
}) {
  const itemsLeft = appCountingTasksLeft();

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter
        filter={filter}
        changeFilter={(filterName) => {
          appChangeFilter(filterName);
        }}
      />
      <button
        className="clear-completed"
        onClick={() => {
          appDeleteCompletedTasks();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filter: "All",
  itemsLeft: 0,
};

Footer.propTypes = {
  filter: PropTypes.string,
  itemsLeft: PropTypes.number,
  appChangeFilter: PropTypes.func.isRequired,
  appDeleteCompletedTasks: PropTypes.func.isRequired,
  appCountingTasksLeft: PropTypes.func.isRequired,
};

export default Footer;
