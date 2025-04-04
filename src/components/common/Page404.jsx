import React from 'react';
import nodataImage from '../../assets/images/404.svg';

const Page404 = () => {
  return (
    <div className="no-data not-found">
      <div className="no-data-content">
      <div className="no-data-img">
          <img src={nodataImage} alt="Page Not Found" className="img-fluid" />
      </div>
      <div className="no-data-txt">
        <h2 className="">404 - PAGE NOT FOUND</h2>
        <p className="text-muted">
          The page you are looking for is temporarily unavailable.
        </p>
      </div>
      </div>
    </div>
  );
};

export default Page404;
