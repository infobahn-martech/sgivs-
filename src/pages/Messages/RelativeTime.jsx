import { useEffect, useState } from 'react';
import { getRelativeTime } from '../../config/config';

const useRelativeTime = (timestamp, interval = 60000) => {
  const [relativeTime, setRelativeTime] = useState(getRelativeTime(timestamp));

  useEffect(() => {
    const update = () => setRelativeTime(getRelativeTime(timestamp));
    const timer = setInterval(update, interval);

    update(); // Initial call
    return () => clearInterval(timer);
  }, [timestamp, interval]);

  return relativeTime;
};

export default useRelativeTime;
