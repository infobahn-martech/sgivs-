import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

function CommonSkeleton({ height = 30, borderRadius, width }) {
  return <Skeleton height={height} borderRadius={borderRadius} width={width}/>;
}

export default CommonSkeleton;
