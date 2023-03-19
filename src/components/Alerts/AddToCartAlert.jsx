import React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import AlertTitle from '@mui/material/AlertTitle';

function AddToCartAlert({toggleAlert}) {
    return (
        <div style={{margin:'20px'}}>
            <Alert severity="success">
                <AlertTitle>T-Shirt added</AlertTitle>
                You have successfully added this t-shirt to your cart
                <Button onClick={()=>toggleAlert("addcart")} >X</Button>
            </Alert>
        </div>
    );
}

export default AddToCartAlert;
