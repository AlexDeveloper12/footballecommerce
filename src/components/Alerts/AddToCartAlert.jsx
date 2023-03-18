import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function AddToCartAlert() {
    return (
        <div style={{margin:'20px'}}>
            <Alert severity="success">
                <AlertTitle>T-Shirt added</AlertTitle>
                You have successfully added this t-shirt to your cart
            </Alert>
        </div>
    );
}

export default AddToCartAlert;
