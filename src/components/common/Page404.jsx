import React from 'react';
import nodataImage from '../../assets/images/404.svg';

const Page404 = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3">
      <div className="mb-4">
        <img src={nodataImage} alt="Page Not Found" className="img-fluid" />
      </div>
      <h2 className="fw-bold mb-2">404 - PAGE NOT FOUND</h2>
      <p className="text-muted">
        The page you are looking for is temporarily unavailable.
      </p>
    </div>
  );
};

export default Page404;
