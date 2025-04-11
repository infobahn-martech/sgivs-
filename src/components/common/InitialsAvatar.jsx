import { getColorClass, getFirstLetters } from '../../config/config';

const InitialsAvatar = ({ name, className = '', uniqueKey }) => {
  const initials = getFirstLetters(name);
  const colorClass = getColorClass(uniqueKey || name);

  return (
    <figure
      className={`alphabet ${uniqueKey ? colorClass : ''} ${className || ''}`}
    >
      <span className="txt">{initials}</span>
    </figure>
  );
};

export default InitialsAvatar;
