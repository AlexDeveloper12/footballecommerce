import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

function CartModalHeader() {
    return(
        <TableHead>
        <TableRow>
            <TableCell align="center">T-shirt (front)</TableCell>
            <TableCell align="center">Team</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Remove</TableCell>
        </TableRow>
    </TableHead>
    )
}

export default CartModalHeader;
