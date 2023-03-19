import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CartModalRow(value, removeItem) {
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <img src={value.imageURLFrontCover} height={200} width={200} />
            </TableCell>
            <TableCell component="th" scope="row" >{value.team}</TableCell>
            <TableCell component="th" scope="row">{value.description}</TableCell>
            <TableCell component="th" scope="row"> <button onClick={() => handleQuantityChange(value)} >-</button> {value.quantityChosen}<button onClick={() => handleQuantityChange(value)}>+</button></TableCell>
            <TableCell component="th" scope="row">£{value.price}</TableCell>
            <TableCell component="th" scope="row" align="right" ><DeleteIcon onClick={() => removeItem(value)} /></TableCell>
        </TableRow>
    )

}

export default CartModalRow;