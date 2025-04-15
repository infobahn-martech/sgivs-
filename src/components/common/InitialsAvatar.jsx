import { getColorClass, getFirstLetters } from '../../config/config';

const logged = new Set(); // to prevent duplicate logs

const InitialsAvatar = ({ name, className = '', uniqueKey }) => {
  const initials = getFirstLetters(name);
  const key = `${uniqueKey ?? ''}-${name ?? ''}`;
  const finalColorClass = getColorClass(key);

  if (!logged.has(key)) {
    console.log('Assigned Color:', finalColorClass);
    logged.add(key);
  }

  return (
    <figure className={`alphabet ${finalColorClass} ${className}`}>
      <span className="txt">{initials}</span>
    </figure>
  );
};

export default InitialsAvatar;
