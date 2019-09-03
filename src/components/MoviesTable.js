import React, { Component } from 'react';
import Table from './common/Table';

export default class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' }
  ];

  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        movies={movies}
        onDelete={onDelete}
        onLike={onLike}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}
