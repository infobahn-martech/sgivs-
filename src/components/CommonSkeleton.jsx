import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

function CommonSkeleton({ height = 30 }) {
  return <Skeleton height={height} />;
}

export default CommonSkeleton;
