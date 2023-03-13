import React from 'react';
import { Button } from '@mui/material';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function AddToCartButton(){
    return(
        <Button variant="contained" fullWidth >Add to Cart <AddShoppingCartIcon/> </Button>
    )

}

export default AddToCartButton;