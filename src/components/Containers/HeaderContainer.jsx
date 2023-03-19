import React from 'react';
import { Grid, Typography } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CartButton from '../CartButton';

function HeaderContainer({ toggleCartModal }) {
    return (
        <>
            <Grid container justifyContent="flex-start">
                <Grid item>
                    <Typography variant="h6">
                        <span style={{ color: 'black' }}>Football T-Shirts</span>
                    </Typography>
                </Grid>
                <Grid item style={{ marginLeft: '20px' }}>
                    <SportsSoccerIcon fontSize="large" color="primary" />
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                    <CartButton
                        toggleModal={toggleCartModal}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default HeaderContainer;