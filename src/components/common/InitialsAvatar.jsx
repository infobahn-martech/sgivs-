import { getColorClass, getFirstLetters } from '../../config/config';

const InitialsAvatar = ({ name, className = '', uniqueKey, colorClass }) => {
  const initials = getFirstLetters(name);
  const finalColorClass = colorClass || getColorClass(uniqueKey || name);

  return (
    <figure className={`alphabet ${finalColorClass} ${className}`}>
      <span className="txt">{initials}</span>
    </figure>
  );
};

export default InitialsAvatar;
