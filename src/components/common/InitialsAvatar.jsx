import React from 'react';
import { getFirstLetters } from '../../config/config';

const InitialsAvatar = ({ name, className }) => {
  const initials = getFirstLetters(name);

  return (
    <figure className={`alphabet ${className}`}>
      <span className="txt">{initials}</span>
    </figure>
  );
};

export default InitialsAvatar;
