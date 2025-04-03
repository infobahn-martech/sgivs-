import { lazy, Suspense } from 'react';

const loader = (
  importFunc,
  fallback = (
    <>
      <div className="min-vh-100 "></div>
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border " role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    </>
  )
) => {
  const LazyComponent = lazy(importFunc);

  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loader;
