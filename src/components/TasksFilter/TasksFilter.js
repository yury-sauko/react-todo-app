import { Component } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

export default class TasksFilter extends Component {
    static defaultProps = {
        filter: 'All',
    };

    static propTypes = {
        filter: PropTypes.string,
        changeFilter: PropTypes.func.isRequired,
    };

    onClick = (e) => {
        this.props.changeFilter(e.target.value);
    };

    render() {
        const { filter } = this.props;

        return (
            <ul className="filters">
                <li>
                    <button
                        value="All"
                        className={filter === 'All' ? 'selected' : ''}
                        type="button"
                        onClick={this.onClick}
                        // способ передачи объекта события внутри элемента
                        // onClick={(e) => {
                        //   this.props.changeFilter(e.target.value);
                        // }}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        value="Active"
                        className={filter === 'Active' ? 'selected' : ''}
                        type="button"
                        onClick={this.onClick}
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        value="Completed"
                        className={filter === 'Completed' ? 'selected' : ''}
                        type="button"
                        onClick={this.onClick}
                    >
                        Completed
                    </button>
                </li>
            </ul>
        );
    }
}
