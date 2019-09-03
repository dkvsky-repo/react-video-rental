import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = props => {
  const { columns, sortColumn, onSort, movies, onLike, onDelete } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody movies={movies} onLike={onLike} onDelete={onDelete} />
    </table>
  );
};

export default Table;
