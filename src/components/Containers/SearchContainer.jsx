import React from 'react';
import { Grid } from '@mui/material';
function SearchContainer({ children }) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item>
                {children}
            </Grid>
        </Grid>
    )

}

export default SearchContainer;
