import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Like = props => {
  let classes = ['fas', 'heart'];
  if (!props.liked) classes[0] = 'far';
  return (
    <FontAwesomeIcon
      onClick={props.onClick}
      icon={classes}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default Like;
