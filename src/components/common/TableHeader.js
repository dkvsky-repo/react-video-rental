import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc')
      return <FontAwesomeIcon icon={['fas', 'sort-up']} />;
    return <FontAwesomeIcon icon={['fas', 'sort-down']} />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.label || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
