import { lazy, Suspense } from 'react';

const loader = (
    importFunc,
    fallback = (
        <></>
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
