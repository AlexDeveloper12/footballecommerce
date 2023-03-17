import React from 'react';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function AddToCartButton({ shirt, addShirt }) {

  return (
    <Button variant="contained" fullWidth onClick={() => addShirt(shirt)}>
      Add to Cart
      <AddShoppingCartIcon />
    </Button>
  );
}

export default AddToCartButton;
