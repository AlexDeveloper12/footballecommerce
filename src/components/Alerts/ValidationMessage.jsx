import React from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';

function ValidationMessage({ headerText, text, toggleAlert }) {
  return (
    <Alert severity='warning'>
            <AlertTitle>
                {headerText}
            </AlertTitle>
            {text}
            <Button onClick={()=>toggleAlert("validation")} >X</Button>
    </Alert>
  );
}

export default ValidationMessage;
