import { getColorClass, getFirstLetters } from '../../config/config';

const logged = new Set(); // to prevent duplicate logs

const InitialsAvatar = ({
  name,
  className = '',
  uniqueKey,
  hideColor = false,
}) => {
  const initials = getFirstLetters(name);
  const key = `${uniqueKey ?? ''}-${name ?? ''}`;
  const finalColorClass = getColorClass(key);

  if (!logged.has(key)) {
    logged.add(key);
  }

  return (
    <figure
      className={`alphabet ${hideColor ? '' : finalColorClass} ${className}`}
    >
      <span className="txt">{initials}</span>
    </figure>
  );
};

export default InitialsAvatar;
