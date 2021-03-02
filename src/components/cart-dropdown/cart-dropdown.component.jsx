import React from 'react';

import CustomButton from '../button/custom-button.component';

import './cart-dropdown.style.scss';

const CartDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-itmes" />
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

export default CartDropdown;
