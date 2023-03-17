import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// eslint-disable-next-line react/prop-types
function CartButton({ toggleModal }) {
  return (
    // 
    <>
      <ShoppingCartIcon color="primary" onClick={toggleModal} />
    </>
  );
}

export default CartButton;
