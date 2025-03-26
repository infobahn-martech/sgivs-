import React from 'react'

const Button = ({ children = 'Submit', onClick }) => {
    return (
        <button onClick={onClick} type='submit' className="btn submit">
            {children}
        </button>
    )
}

export default Button