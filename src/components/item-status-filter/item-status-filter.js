import React, { Component } from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter extends Component {
  getFilters() {
    return ['All', 'Active', 'Done'];
  }

  getClassNames(isActive) {
    return `btn ${(isActive) ? 'btn-info' : 'btn-outline-secondary'}`;
  }

  render() {
    const { onFilterChange, filter } = this.props;

    return (
      <div className="btn-group">
        { this.getFilters().map((elem) => {
            const isActive = elem === filter;

            return (
                <button
                    key={ elem }
                    className={ this.getClassNames(isActive) }
                    onClick={ () => onFilterChange(elem) }
                >
                    { elem }
                </button>
            );
            })
        }
      </div>
    );
  }
}
