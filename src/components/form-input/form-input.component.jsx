import React from 'react';

import './form-input.style.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  //console.log('here', otherProps.value);
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;

// So it fires twice because you have two formInput components!
// one for email and one for password
// when the state changes in the parent component, it calls setState which re-renders all child components that are dependent on the state
// in our case both the password and the email formInput components are being passed the state
// some one is logging the latest email, the other is logging the latest password string
// which is why in your case it's empty, because you're not changing the password
// if you type a password
// you'll see the value is what takes the place of the second variable
