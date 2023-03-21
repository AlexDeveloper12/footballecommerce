import React from 'react';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function AddToCartButton({ shirt, addShirt, disabledState }) {
  return (
    <Button variant="contained" fullWidth onClick={() => addShirt(shirt)} disabled={disabledState}>
      Add to Cart
      <AddShoppingCartIcon style={{ marginLeft: '20px' }} />
    </Button>
  );
}

export default AddToCartButton;
