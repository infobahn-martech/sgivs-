import React from 'react';

const Button = ({ children = 'Submit', onClick, isLoading }) => {
  return (
    <button onClick={onClick} type="submit" className="btn submit">
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
