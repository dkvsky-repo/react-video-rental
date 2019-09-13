import React, { Component } from 'react';

export default class TableBody extends Component {
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return column.path !== 'genre' ? item[column.path] : item[column.path].name;
  };
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(col => (
              <td key={this.createKey(item, col)}>
                {this.renderCell(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
