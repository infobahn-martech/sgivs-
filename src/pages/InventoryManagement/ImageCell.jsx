import React, { useState } from 'react';
import dummyImage from '../../assets/images/dummyIcon.svg';
import CommonSkeleton from '../../components/common/CommonSkeleton';

const ImageCell = ({ src }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <figure className="in-img">
      {loading && <CommonSkeleton height={40} />}

      <img
        src={error || !src ? dummyImage : src}
        alt="Item"
        className="img"
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: loading ? 'none' : 'block' }}
        crossOrigin="anonymous"
      />
    </figure>
  );
};
export default ImageCell;
