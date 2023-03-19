import React from 'react';
import { Button } from '@mui/material';

function CloseButton({ toggle }) {
    return (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
            <Button variant="contained" onClick={toggle}>Close</Button>
        </div>
    );
}

export default CloseButton;
