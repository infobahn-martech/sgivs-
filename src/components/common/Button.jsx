import React from 'react';
import { Spinner } from 'react-bootstrap';

const Button = ({ children = 'Submit', onClick, isLoading }) => {
  return (
    <button onClick={onClick} type="submit" className="btn submit">
      {isLoading ? (
        <Spinner
          size="sm"
          as="span"
          animation="border"
          variant="light"
          aria-hidden="true"
          className="custom-spinner"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
