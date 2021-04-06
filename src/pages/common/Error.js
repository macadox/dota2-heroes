import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className='error'>
      <h2 className='error__title'>Oops! Something went wrong!</h2>
      <p className='error__text'>
        The page you are looking for does not exist!
      </p>
      <Link to='/' className='btn error__home'>
        Back Home
      </Link>
    </div>
  );
};

export default Error;
