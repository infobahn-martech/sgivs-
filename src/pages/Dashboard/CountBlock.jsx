import React from 'react';
import CommonSkeleton from '../../components/common/CommonSkeleton';

const CountBlock = ({ icon, label, count, className = '', isLoading }) => {
  if (isLoading) {
    return (
      <div className={`count-blk ${className}`}>
        <div className="dtl-blk">
          <CommonSkeleton height={40} />
        </div>
      </div>
    );
  }

  return (
    <div className={`count-blk ${className}`}>
      <div className="icon-blk">
        <img src={icon} alt="" />
      </div>
      <div className="dtl-blk">
        <div className="info">{label || '-'}</div>
        <span className="count">{count ?? '-'}</span>
      </div>
    </div>
  );
};

export default CountBlock;
