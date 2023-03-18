import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function ValidationMessage({ headerText, text }) {
  return (
    <Alert severity='warning'>
            <AlertTitle>
                {headerText}
            </AlertTitle>
            {text}
    </Alert>
  );
}

export default ValidationMessage;
