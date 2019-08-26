import React from 'react';

const ListGroup = props => {
  const {
    items,
    valueProperty,
    textProperty,
    onItemSelect,
    selectedItem
  } = props;
  return (
    <ul class="list-group">
      {/* <li class="list-group-item">All genres</li> */}
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
