import React from 'react';

import './custom-button.style.scss';

<<<<<<< HEAD
const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
  console.log('hahaha', otherProps);
  return (
    <button
      className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
=======
const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);
>>>>>>> eae8fcdbb6b4e4317ec046e8972bc5427b0e33bd

export default CustomButton;
