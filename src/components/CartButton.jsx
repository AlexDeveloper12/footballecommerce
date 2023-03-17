import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function CartButton({ toggleModal }) {
  return (
    <ShoppingCartIcon color="primary" onClick={toggleModal} />
  );
}

export default CartButton;
